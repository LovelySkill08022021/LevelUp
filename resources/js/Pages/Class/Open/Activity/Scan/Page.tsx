
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { PageProps, Class, Activity, User } from '@/types';
import Layout from '../../Layout';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import QrcodeScanner from '@/Components/system/QrcodeScanner';
import { useState } from 'react';
import axios from 'axios';
import FormDialogAutomatic from '@/Components/system/FormDialogAutomatic';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

// import Speech from '@/Components/system/Speech';

interface Props extends PageProps {
    _class: Class;
    activity: Activity;
    students: User[];
}


export default function ActivityPage({ _class, activity, students, auth }: Props) {

    const [open_form, setOpenForm] = useState<boolean>(false);
    const [student, setStudent] = useState<User>();
    const [qr_code_value, setQrCodeValue] = useState<string>("");
    const [score_warning, setScoreWarning] = useState<string>("");
    
    function findStudent(std_no: string){
        const data = {
            std_no: std_no,
            activity_id: activity.id,
            class_id: _class.id
        }
        axios.post(route('class.activity.scan.find_student'), data)
        .then((response) => {
            if(response.data == "no_student"){
                enqueueSnackbar(`No student found. It is possible that the student with a ${qr_code_value} student number is not yet registered`, {variant: "warning"});

                return;
            }

            if(response.data == "not_a_class_member"){
                enqueueSnackbar(`Not a class member.`, {variant: "error"});

                return;
            }
            
            if(response.data == "student_has_score"){
                enqueueSnackbar(`The student already have a score in the activity ${activity.name}.`, {variant: "warning"});
                
                return;
            }

            setStudent(response.data);
            setOpenForm(false);
            setTimeout(() => {
                setOpenForm(true);
                completeForm(response.data);
            }, 300);
        
            
        });
    }

    function getValue(code: string){

        setQrCodeValue(code);
        findStudent(code);
    }

    function completeForm(std: User){
        setData('student_number', std.student_number);
    }

    function initSetScore(score: any){
        if(score <= activity.max_score){
            // setScoreWarning("The score you have entered has exceeded the maximum score for this activity.");
            setScoreWarning("");
            setData('score', score);
        }
    }

    const {data, setData, reset} = useForm({
        student_number: "",
        score: "",
        activity_id: activity.id,
        class_id: _class.id

    });

    function saveStudentScore(){
        // if(score_warning){
        //     alert("Please check the score you have entered!");
        //     setOpenForm(false);
        //     setTimeout(() => {
        //         setOpenForm(true);
        //     }, 300);
        // } else {
            axios.post(route('class.activity.scan.save_score'), data)
            .then((response) => {
                console.log(response.data);
                
                if(response.data == 'success'){
                    reset('student_number', 'score')

                    return;
                }


                // alert(response.data);
                enqueueSnackbar(response.data.message, {variant: response.data.severity});
                setOpenForm(false);
                setTimeout(() => {
                    setOpenForm(true);
                }, 300);
            });
        // }
        
        
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Layout _class={_class} active_tab={'activities'}>
                <>  
                    <SnackbarProvider maxSnack={3} autoHideDuration={6000} />
                    <div className='font-bold text-lg'>Scan QR Code</div>
                    <div className="text-gray-500 text-md mb-3">{activity.name}</div>
                    <div className='flex flex-col items-center gap-5 lg:flex-row lg:items-start'>
                        <div className="sm:w-3/4 md:w-1/2 lg:w-1/4 overflow-hidden rounded-xl">
                            <div>
                                <QrcodeScanner getValue={getValue} />
                            </div>
                        </div>                    
                        <div className='mt-10 text-center lg:mt-0'>
                            <FormDialogAutomatic
                                isopen={open_form}
                                title={
                                    <>
                                        <span className="text-blue-600">{activity.name}</span>
                                        (<small>{_class.name}</small>)
                                    </>
                                }
                                description={
                                    <span className='block mb-4'>
                                        {!student && "Manual recording of score requires student number."}
                                        {student && (
                                            <>
                                                Add activity score for <b>{student.first_name} {student.middle_name} {student.last_name}</b> <b>({student.student_number})</b>
                                            </>
                                        )}

                                    </span>
                                }
                                dialog_button={
                                    <Button variant='contained'>Add Score Manually</Button>
                                }
                                submit_label="save"
                                onSubmitFunction={saveStudentScore}
                            >
                                <div className="mb-3">
                                    <label htmlFor="student_number">Student Number</label>
                                    <input required value={data.student_number} onChange={(e) => setData('student_number', e.target.value)} type="text" name='student_number' className='w-full' placeholder='Student Number' list='class_student' />
                                    <datalist id='class_student'>
                                        {students.map((student) => {
                                            return <option value={student.student_number}>{student.last_name}, {student.first_name}</option>
                                        })}
                                    </datalist>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="score">Score <small>(max: {activity.max_score})</small></label>
                                    <input required value={data.score} autoFocus onChange={(e) => initSetScore(e.target.value)} type="number" name='score' className='w-full' placeholder='Score' />
                                    {score_warning && 
                                        <Alert severity='warning'>{score_warning}</Alert>
                                    }
                                </div>
                            </FormDialogAutomatic>
                            {student && 
                                <>
                                    <div>
                                        {student.first_name} {student.middle_name} {student.last_name}
                                    </div>
                                    <div>
                                        {student.student_number}
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                </>
            </Layout>
        </AuthenticatedLayout>
    )
}
