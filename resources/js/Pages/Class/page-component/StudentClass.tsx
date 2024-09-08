import { Class, PageProps, User } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import Button from '@mui/material/Button'
import { Suspense, useEffect, useState } from 'react'
import { getUser } from '@/lib/data'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import StudentClassJoinButton from './StudentClassJoinButton'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'

export default function StudentClass({ _class }: { _class: Class }) {
    const user = usePage<PageProps>().props.auth.user;
    const [join_response_status, setJoinResponseStatus] = useState<boolean>(false);
    
    const { data, setData, post, processing, errors, reset, recentlySuccessful, wasSuccessful, cancel } = useForm({
        student_id: user.id,
        class_id: _class.id,
        status: "",
        message: ""
    });

    function joinClass(){
        post(route('class.student.join'), {
            onSuccess: (response) => {
                console.log(response);
            }
        })
        
    }

    function cancelJoin(){
        cancel();
    }

    useEffect(() => {
        if(wasSuccessful){
            setJoinResponseStatus(wasSuccessful); 
        }
    },[wasSuccessful])

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={processing}
                onClick={cancelJoin}
            >   
                <div className='text-center'>
                    <div className='d-inline'>
                        <CircularProgress color="inherit" />
                    </div>
                    <div className='d-inline'>Click to cancel</div>
                </div>
            </Backdrop>
            <div className='flex mb-2 items-center gap-5'>
                <div>
                    {_class.name}
                </div>
                <div>
                    {_class.subject.title}
                    {data.student_id}
                </div>
                <div>
                    {_class.subject.title}
                    
                </div>
                <div>
                    {!join_response_status && 
                        <Suspense fallback={
                            <Button disabled>Loading...</Button>
                        }>
                            <StudentClassJoinButton disabled={processing} _class={_class} onClick={joinClass}  />
                        </Suspense>
                    }
                </div>
            </div>
            <div>
                {errors.status == 'error' && <Alert severity="error">{errors.message}</Alert>}
                {wasSuccessful && <Alert severity="success">Congratulations! You have joined <b>{_class.name}</b> class.</Alert>}
            </div>
        </div>
    )
}
