
import { Class, PageProps, User } from '@/types'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import { Suspense, useEffect, useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'

interface Props {
    _class: any;
}

export default function StudentClassJoinButton({_class }: Props) {
    
    const [joined, setJoined] = useState<string>("joined");
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
    
    function checkMembership(){
        const data = {
            class_id: _class.id
        };

        axios.post(route('class.student.check_membership'), data)
        .then((response) => {
            setJoined(response.data);
        })

    }

    useEffect(() => {
        checkMembership();
    },[]);

    useEffect(() => {
        if(wasSuccessful){
            setJoinResponseStatus(wasSuccessful); 
        }
    },[wasSuccessful]);

    return (
        <>
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
            {!join_response_status && 
                <Suspense fallback={
                    <Button disabled>Loading...</Button>
                }>
                    <>
                        {!joined && 
                            <Button onClick={joinClass} disabled={processing} variant='contained' color='success'>
                                {processing ? "Joining..." : "Join"}
                            </Button>
                        }
                    </>
                </Suspense>
            }
            <div>
                {errors.status == 'error' && <Alert severity="error">{errors.message}</Alert>}
                {wasSuccessful && <Alert severity="success">Congratulations! You have joined <b>{_class.name}</b> class.</Alert>}
            </div>
        </>
    )
}
