
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
// import Speech from '@/Components/system/Speech';

interface Props extends PageProps {
    _class: Class;
    activity: Activity;
}


export default function ActivityPage({ _class, activity, auth }: Props) {

    const [open_form, setOpenForm] = useState<boolean>(false);
    const [student, setStudent] = useState<User>();
    const [student_has_found, setStudentHasFound] = useState<boolean>(true);
    const [student_has_score, setStudentHasScore] = useState<boolean>(false);
    const [qr_code_value, setQrCodeValue] = useState<string>("");
    const [score_warning, setScoreWarning] = useState<string>("");
    
    function findStudent(std_no: string){
        const data = {
            std_no: std_no,
            activity_id: activity.id
        }
        axios.post(route('class.activity.scan.find_student'), data)
        .then((response) => {
            if(response.data == "no_student"){
                
                setStudentHasFound(false);
                setTimeout(() => {
                    setStudentHasFound(true);
                }, 10000);
                return;
            }
            
            if(response.data == "student_has_score"){
                setStudentHasScore(true);
                setTimeout(() => {
                    setStudentHasScore(false);
                }, 6000);
                return;
            }


                // alert(open_form)
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

    function initSetScore(score: number){
        if(score <= activity.max_score){
            // setScoreWarning("The score you have entered has exceeded the maximum score for this activity.");
            setScoreWarning("");
            setData('score', score);
        }
    }

    const {data, setData, reset} = useForm({
        student_number: "",
        score: 0,
        activity_id: activity.id
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

                alert(response.data);
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
                    <div className='flex gap-5'>
                        <div className="w-1/4 overflow-hidden">
                            <QrcodeScanner getValue={getValue} />
                        </div>                    
                        <div>
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
                                    <input required value={data.student_number} onChange={(e) => setData('student_number', e.target.value)} type="text" name='student_number' className='w-full' placeholder='Student Number' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="score">Score <small>(max: {activity.max_score})</small></label>
                                    <input required value={data.score} autoFocus onChange={(e) => initSetScore(Number(e.target.value))} type="text" name='score' className='w-full' placeholder='Score' />
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
                            {!student_has_found && 
                                <Alert severity='warning'>
                                    No student found. It is possible that the student with a <b>{qr_code_value}</b> student number is not yet registered.
                                </Alert>
                            }
                            {student_has_score && 
                                <Alert severity='warning'>
                                    The student already have score in the activity <b>{activity.name}</b>.
                                </Alert>
                            }
                        </div>

                    </div>
                </>
            </Layout>
        </AuthenticatedLayout>
    )
}
