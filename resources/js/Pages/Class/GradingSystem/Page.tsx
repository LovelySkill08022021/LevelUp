import Card from '@/Components/system/Card';
import ContentLayout from '@/Components/system/ContentLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { PageProps, Class, ClassGradingSystem, GradingSystem } from '@/types';
import { grading_system_component } from '@/lib/data'

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import GradingSystemEditor from '@/Components/system/GradingSystemEditor';
import ClassGradingSystemEditor from '@/Components/system/ClassGradingSystemEditor';
import axios from 'axios';

interface Props extends PageProps {
    _class: Class;
    current_class_grading_systems: ClassGradingSystem[];
}


export default function ClassGradingSystemPage({ _class, current_class_grading_systems, auth }: Props) {

    const [initial_grading_systems, setInitGraSys] = useState<ClassGradingSystem[]>(current_class_grading_systems);

    const {data, setData, patch, reset, processing} = useForm({
        grading_systems: [{id: 0, class: _class, component: "", weight: 0}]
    });

    
    function getGradingSystem(grading_systems: ClassGradingSystem[]){
        
        
        setData("grading_systems", grading_systems);
    }

    function useSubjectGradingSystem(){
        console.log(_class.subject.id);
        const form_data = {
            "class_id": _class.id,
            "subject_id": _class.subject.id
        }
        axios.post(route('class.useSubjectGradingSystem'), form_data).then((response) => {
            const s_g_y = response.data;
            setInitGraSys(s_g_y);
            
        });
    }

    function saveGradingSystem(){
        
        let total_percentage: number = 0;
        
        for(let grading_system of data.grading_systems){
            
            total_percentage += Number(grading_system.weight);
        }

        console.log(total_percentage);
        if(total_percentage == 100){
            patch(`/class/${_class.id}/gradingsystem/patch`, {
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
            <Head title={`${_class.name} Grading System`} />

            <ContentLayout>
                <Card>
                    <Link href="/class" className='underline text-blue-500'>Back</Link>
                    {/* <Link href={`/subject/${0}`}>
                        <Button disableElevation variant='contained'>New</Button>
                    </Link> */}
                    <div className='mt-8'>
                        <div className="text-lg font-semibold mb-5">{_class.name}</div>
                        <div className='mb-3'>
                            <Button variant='contained' onClick={useSubjectGradingSystem}>Use Subject Grading</Button>
                        </div>
                        <ClassGradingSystemEditor _class={_class} initial_grading_systems={initial_grading_systems} getGradingSystem={getGradingSystem} />
                        
                        <div className='text-right'>
                            <Button variant='contained' color='primary' onClick={saveGradingSystem}>Save</Button>
                        </div>

                    </div>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    )
}
