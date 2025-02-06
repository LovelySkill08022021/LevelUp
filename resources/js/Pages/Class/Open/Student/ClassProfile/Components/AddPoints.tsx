import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ColorProvider from '@/Components/system/ColorProvider';
import FormDialogAutomatic from '@/Components/system/FormDialogAutomatic';
import { enqueueSnackbar } from 'notistack';
import { useForm } from '@inertiajs/react';

interface Props {
    class_id: number;
    student_id: number;
    points: number;
    setPoints: (new_points: number) => void;
    setError: (error: boolean) => void;
}

export default function AddPoints(props: Props) {
    const [selected_point, setSelectedPoint] = useState(1);
    const [select_point_form_open, setSelectPointFormOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        class_id: props.class_id,
        student_id: props.student_id,
        points: selected_point,
        message: ""
    });

    function initSelectedPoint(points: number) {
        setSelectedPoint(points)
        setData('points', points);
    }

    function addCreditScore() {
        const prev_points = props.points;
        props.setPoints(props.points + selected_point);
        setSelectPointFormOpen(false);

        post('/class/students/profile/add_credit_score', {
            onSuccess: () => {
                enqueueSnackbar("Points added.", { variant: "success" });
                props.setError(false);
            },
            onError: () => {
                enqueueSnackbar(errors.message, { variant: "error" });
                props.setError(true);
                setTimeout(() => {
                    props.setPoints(prev_points);
                }, 2000);
            }
        });
    }

    return (
        <FormDialogAutomatic
            title={'Select Point'}
            isopen={select_point_form_open}
            size={'xs'}
            dialog_button={
                <Button
                    size='small'
                    sx={{
                        textTransform: 'none',
                        color: "black",
                        fontFamily: 'inherit'
                    }}
                    startIcon={
                        <ColorProvider color="#0a0">
                            <AddIcon color='primary' />
                        </ColorProvider>
                    }
                    onClick={() => setSelectPointFormOpen(true)}
                >
                    Add
                </Button>
            }
        >
            <>
                <div className='mb-5'>
                    <div className='flex justify-evenly'>
                        <Button variant={(selected_point == 1) ? 'contained' : 'text'} onClick={() => initSelectedPoint(1)}>1</Button>
                        <Button variant={(selected_point == 2) ? 'contained' : 'text'} onClick={() => initSelectedPoint(2)}>2</Button>
                        <Button variant={(selected_point == 3) ? 'contained' : 'text'} onClick={() => initSelectedPoint(3)}>3</Button>
                    </div>
                    <div className='flex justify-evenly'>
                        <Button variant={(selected_point == 4) ? 'contained' : 'text'} onClick={() => initSelectedPoint(4)}>4</Button>
                        <Button variant={(selected_point == 5) ? 'contained' : 'text'} onClick={() => initSelectedPoint(5)}>5</Button>
                        <Button variant={(selected_point == 6) ? 'contained' : 'text'} onClick={() => initSelectedPoint(6)}>6</Button>
                    </div>
                    <div className="flex justify-evenly">
                        <Button variant={(selected_point == 7) ? 'contained' : 'text'} onClick={() => initSelectedPoint(7)}>7</Button>
                        <Button variant={(selected_point == 8) ? 'contained' : 'text'} onClick={() => initSelectedPoint(8)}>8</Button>
                        <Button variant={(selected_point == 9) ? 'contained' : 'text'} onClick={() => initSelectedPoint(9)}>9</Button>
                    </div>
                    <div className="flex justify-center">
                        <Button variant={(selected_point == 10) ? 'contained' : 'text'} onClick={() => initSelectedPoint(10)}>10</Button>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Button className='w-full' onClick={() => setSelectPointFormOpen(false)}>Cancel</Button>
                    <Button onClick={addCreditScore} className='w-full' variant='contained' disableElevation>Confirm</Button>
                </div>
            </>
        </FormDialogAutomatic>
    )
}
