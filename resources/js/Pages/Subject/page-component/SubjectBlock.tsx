import React from 'react'
import type { Subject } from '@/types'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Link, useForm } from '@inertiajs/react'
import Menu from '@/Components/system/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function SubjectBlock({ subject }: { subject: Subject }) {


    const { post, processing } = useForm({
        subject_id: subject.id
    });

    function deleteSubject(){
        let confirmation = confirm(`Are you sure you want to delete ${subject.code} - ${subject.title}?`);
        
        if(confirmation){
            post(route('subject.delete'));
        }
    }

    return (
        <div className='flex justify-start w-full mb-1 py-2 px-3 hover:bg-gray-200 rounded'>
            <div className='w-full'>
                {subject.code}
            </div>
            <div className='w-full'>
                {subject.title}
            </div>
            <div className='w-full'>
                <Menu
                    buttonlabel={
                        <IconButton aria-label="Example">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    menuitems={[
                        {label: "Edit", link: `/subject/${subject.id}`},
                        {label: "Grading System", link: `/subject/${subject.id}/gradingsystem`},
                        {label: "Delete", action: deleteSubject},
                    ]}
                />
                {/* <span className="inline-block me-2">
                    <Link href={`/subject/${subject.id}`}>
                        <Button size='small' variant='contained' color='warning' disableElevation>Edit</Button>
                    </Link>
                </span>
                <Button disabled={processing} size='small' variant='contained' color='error' disableElevation onClick={deleteSubject}>
                    
                    {processing ? "Deleting..." : "Delete"}
                </Button> */}
            </div>
        </div>
    )
}
