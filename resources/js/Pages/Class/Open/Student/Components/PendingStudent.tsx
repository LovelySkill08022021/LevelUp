import { User } from '@/types';
import Course from '@/Components/system/Course';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Alert } from '@mui/material';

interface ExtUser extends User {
    cm_id: number;
    date: string;
    time: string;
}

interface Props { 
    student: ExtUser;
    index: number;
    callback: () => void;
}

interface ProcessType {
    status: boolean; 
    type: 'a' | 'r';
}

interface RespondStatusType {
    status: 'error' | 'success' | 'idle'; 
    message: string;
}

export default function PendingStudent({ student, index, callback }: Props) {

    

    const [processing, setProcessing] = useState<ProcessType>();
    const [join_respond_status, setJoinRespondStatus] = useState<RespondStatusType>({
        status: 'idle',
        message: ""
    });

    function joinClassRespond(type: 'a' | 'r'){
        setProcessing({
            status: true,
            type: type
        });
        
        const data = {
            type: type,
            student: student
        }

        axios.post(route('class.student.join.respond'), data).then((response) => {
            console.log(response.data.status);
            if(response.data.status == 'success'){
                callback();
            }
            
            setJoinRespondStatus({
                status: response.data.status,
                message: response.data.message
            });
            
            setProcessing({
                status: false,
                type: type
            });

            setTimeout(() => {
                setJoinRespondStatus({
                    ...join_respond_status,
                    status: 'idle'
                });
            }, 3000);
        });

    }

    return (
        <div>
            <div className="flex justify-evenly">
                <div className='w-full'>
                    {index + 1}
                </div>
                <div className='w-full'>
                    {student.student_number}
                </div>
                <div className='w-full'>
                    {student.first_name}
                </div>
                <div className='w-full'>
                    {student.middle_name}
                </div>
                <div className='w-full'>
                    {student.last_name}
                </div>
                <div className='w-full'>
                    <Course course={student.course} />
                </div>
                <div className='w-full'>
                    {student.date} {student.time}
                </div>
                <div className='w-full flex gap-1'>
                    <div>
                        <Button disabled={processing?.status} onClick={() => joinClassRespond('a')} size='small' variant='contained' color='success'>
                            {processing?.status ? (processing?.type == 'a' ? 'Accepting' : 'Accept') : 'Accept'}
                        </Button>
                    </div>
                    <div>
                        <Button disabled={processing?.status} onClick={() => joinClassRespond('r')} size='small' variant='contained' color='error'>
                            {processing?.status ? (processing?.type == 'r' ? 'Rejecting' : 'Reject') : 'Reject'}
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {join_respond_status?.status == 'error' && <Alert severity='error'>{join_respond_status?.message}</Alert>}
                {join_respond_status?.status == 'success' && <Alert severity='success'>{join_respond_status?.message}</Alert>}
            </div>
        </div>
    )
}
