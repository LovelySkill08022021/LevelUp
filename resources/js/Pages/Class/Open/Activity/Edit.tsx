
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { PageProps, Class, Activity } from '@/types';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import InputError from '@/Components/InputError';
import { grading_system_component } from '@/lib/data';

interface Props extends PageProps {
    _class: Class;
    activity_id: number;
    activity: Activity;
    grading_systems: string[];
}


export default function ActivityPage({ _class, activity, grading_systems, activity_id, auth }: Props) {

    const { data, setData, post, reset, processing, errors } = useForm({
        id: activity_id,
        class: _class.id,
        name: activity?.name || "",
        max_score: activity?.max_score || "",
        type: activity?.type || ""
    });

    function createActivity(){
        console.log(data);
        post(route('class.activity.update'), {
            onSuccess: () => {
                console.log('created');
                
            }
        })
        
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Layout _class={_class} active_tab={'activities'}>
                <>
                    <div className='mb-2'>
                        <label className='' htmlFor="name">Activity Name</label>
                        <input id="name" className='block w-1/2' type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                        <InputError message={errors.name} />
                    </div>
                    <div className='mb-2'>
                        <label className='' htmlFor="max_score">Max Score</label>
                        <input id="max_score" className='block w-1/2' type="number" value={data.max_score} onChange={(e) => setData('max_score', e.target.value)}/>
                        <InputError message={errors.max_score} />
                    </div>
                    <div className='mb-5'>
                        <label className='' htmlFor="type">Activity Type</label>
                        <select className='block w-1/2' name="type" id="type" value={data.type} onChange={(e) => setData('type', e.target.value)}>
                            <option defaultValue={""} selected>--select type--</option>
                            {grading_system_component.map((component) => {
                                
                                if(grading_systems.includes(component.value)){
                                    return <option value={component.value}>{component.label}</option>
                                }
                                
                                // return <option value={component.value}>{component.label} {grading_systems.includes(component.value) ? "1" : "0"}</option>
                            })}
                        </select>
                        <InputError message={errors.type} />
                    </div>
                    <div className='mb-2'>
                        <Button variant='contained' onClick={createActivity}>Create</Button>
                    </div>

                </>
            </Layout>
        </AuthenticatedLayout>
    )
}
