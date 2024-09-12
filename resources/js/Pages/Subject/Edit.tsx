import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Subject, User } from '@/types';
import { PageProps } from '@/types';
import ContentLayout from '@/Components/system/ContentLayout';
import Card from '@/Components/system/Card';
import Button from '@mui/material/Button';
import { FormEventHandler } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';

interface Props extends PageProps {
    subject_id: number;
    subject: Subject;
}

interface ModSubject {
    id: number;
    code: string;
    title: string;
    units_lec: string | number;
    units_lab: string | number;
}

export default function EditSubject({ auth, subject_id, subject } : Props ) {
    const { data, setData, patch, processing, errors, reset } = useForm<ModSubject>({
        id: subject_id,
        code: subject?.code || '',
        title: subject?.title || '',
        units_lec: subject?.units_lec >= 0 ? subject?.units_lec : '',
        units_lab: subject?.units_lab >= 0 ? subject?.units_lab : ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch('/subject/update', {
            onSuccess: () => {
                reset('code', 'title', 'units_lab', 'units_lec');
            }
        });
    }
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Subject" />

            <ContentLayout>
                <Card>
                    <Link href="/subject" className='underline text-blue-500'>Back</Link>
                    <div className='font-semibold text-lg text-gray-800 mb-6 mt-3'>
                        {(subject_id === 0 ? "Create new subject" : "Edit Subject")}
                    </div>
                    <div>
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label htmlFor="code">Code</label>
                                <input value={data.code} onChange={(e) => setData('code', e.target.value)} type="text" id='code' name='code' className='block w-1/2' />
                                <InputError message={errors.code} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title">Title</label>
                                <input value={data.title} onChange={(e) => setData('title', e.target.value)} type="text" id='title' name='title' className='block w-1/2' />
                                <InputError message={errors.title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="units_lec">Units (Lecture)</label>
                                <input value={data.units_lec} onChange={(e) => setData('units_lec', e.target.value)} type="text" id='units_lec' name='units_lec' className='block w-1/2' />
                                <InputError message={errors.units_lec} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="units_lab">Units (Laboratory)</label>
                                <input value={data.units_lab} onChange={(e) => setData('units_lab', e.target.value)} type="text" id='units_lab' name='units_lab' className='block w-1/2' />
                                <InputError message={errors.units_lab} />
                            </div>
                            <div className='mb-3'>
                                <Button type='submit' disabled={processing} variant='contained'>{(subject_id === 0 ? "Save" : "Update")}</Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
