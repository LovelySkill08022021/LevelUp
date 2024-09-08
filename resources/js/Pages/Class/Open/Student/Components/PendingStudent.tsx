import { User } from '@/types';
import Course from '@/Components/system/Course';
import Button from '@mui/material/Button';

interface ExtUser extends User {
    cm_id: number;
    date: string;
    time: string;
}

export default function PendingStudent({ student }: { student: ExtUser}) {

    function accept(){
        alert("Accepted")
    }
    
    function reject(){
        alert("Rejected")

    }

    return (
        <div className="flex justify-evenly">
            <div className='w-full'>
                {student.cm_id}
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
                    <Button onClick={accept} size='small' variant='contained' color='success'>Accept</Button>
                </div>
                <div>
                    <Button onClick={reject} size='small' variant='contained' color='error'>Reject</Button>
                </div>
            </div>
        </div>
    )
}
