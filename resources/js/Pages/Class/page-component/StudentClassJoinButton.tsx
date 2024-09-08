import { Class } from '@/types';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react'

interface Props {
    onClick: () => void;
    _class: Class;
    disabled: boolean;
}

export default function StudentClassJoinButton({ onClick, _class, disabled }: Props) {
    
    const [joined, setJoined] = useState<string>("joined");

    
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

    return (
        <>
            {!joined && 
                <Button onClick={onClick} disabled={disabled} variant='contained' color='success'>
                    {disabled ? "Joining..." : "Join"}
                </Button>
            }
        </>
    )
}
