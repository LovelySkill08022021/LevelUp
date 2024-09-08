import Card from '@/Components/system/Card';
import ContentLayout from '@/Components/system/ContentLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Subject, GradingSystem } from '@/types';
import { grading_system_component } from '@/lib/data'

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import GradingSystemEditor from '@/Components/system/GradingSystemEditor';

interface Props extends PageProps {
    subject: Subject;
    current_grading_systems: GradingSystem[];
}


export default function GradingSystemPage({ subject, current_grading_systems, auth }: Props) {

    const {data, setData, patch, reset, processing} = useForm({
        grading_systems: [{id: 0, subject: subject, component: "", weight: 0}]
    });

    
    function getGradingSystem(grading_systems: GradingSystem[]){
        
        
        setData("grading_systems", grading_systems);
    }

    function saveGradingSystem(){
        let total_percentage: number = 0;
        
        for(let grading_system of data.grading_systems){
            
            total_percentage += Number(grading_system.weight);
        }

        console.log(total_percentage);
        if(total_percentage == 100){
            patch(`/subject/${subject.id}/gradingsystem/patch`, {
                onFinish: () => {
                    console.log("Patched!");
                    
                }
            })
        } else {
            alert("Invalid grading system weight total.");
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={`${subject.code} Grading System`} />

            <ContentLayout>
                <Card>
                    <Link href="/subject" className='underline text-blue-500'>Back</Link>
                    {/* <Link href={`/subject/${0}`}>
                        <Button disableElevation variant='contained'>New</Button>
                    </Link> */}
                    <div className='mt-8'>
                        <div className="text-lg font-semibold mb-5">{subject.code} - {subject.title}</div>
                        
                        <GradingSystemEditor subject={subject} initial_grading_systems={current_grading_systems} getGradingSystem={getGradingSystem} />
                        
                        <div className='text-right'>
                            <Button variant='contained' color='primary' onClick={saveGradingSystem}>Save</Button>
                        </div>

                    </div>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    )
}
