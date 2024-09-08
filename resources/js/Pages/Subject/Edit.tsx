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

export default function EditSubject({ auth, subject_id, subject } : Props ) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        id: subject_id,
        code: subject?.code || '',
        title: subject?.title || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch('/subject/update', {
            onSuccess: () => {
                reset();
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
