import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Class, Subject, User } from '@/types';
import { PageProps } from '@/types';
import ContentLayout from '@/Components/system/ContentLayout';
import Card from '@/Components/system/Card';
import Button from '@mui/material/Button';
import { FormEventHandler } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import { courses } from '@/lib/data';

interface Props extends PageProps {
    class_id: number;
    _class: Class;
    subjects: Subject[];
}

export default function EditClass({ auth, class_id, _class, subjects } : Props ) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        id: class_id,
        name: _class?.name || "",
        semester: _class?.semester || "",
        school_year: _class?.school_year || "",
        course: _class?.course || "",
        year_level: _class?.year_level || "",
        section: _class?.section || "",
        subject: _class?.subject?.id
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch('/class/update', {
            onSuccess: () => {
                reset();
            }
        });
    }
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Class" />

            <ContentLayout>
                <Card>
                    <Link href="/class" className='underline text-blue-500'>Back</Link>
                    <div className='font-semibold text-lg text-gray-800 mb-6 mt-3'>
                        {(class_id === 0 ? "Create new class" : "Edit class")}
                    </div>
                    <div>
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" id='name' name='name' className='block w-1/2' />
                                <InputError message={errors.name} />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="semester">Semester</label>
                                <select name="semester" id="semester" value={data.semester} onChange={(e) => setData('semester', Number(e.target.value))} className='block w-1/2'>
                                    <option selected hidden>-- select semester --</option>
                                    <option value={1}>1st Semester</option>
                                    <option value={2}>2nd Semester</option>
                                    <option value={3}>Mid year</option>
                                </select>
                                <InputError message={errors.semester} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="school_year">School Year</label>
                                <input value={data.school_year} onChange={(e) => setData('school_year', e.target.value)} type="text" id='school_year' name='school_year' className='block w-1/2' />
                                <InputError message={errors.school_year} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="course">Course</label>
                                {/* <input value={data.course} onChange={(e) => setData('course', e.target.value)} type="text" id='course' name='course' className='block w-1/2' /> */}

                                <select name="subject" id="subject" value={data.course} onChange={(e) => setData('course', e.target.value)} className='block w-1/2'>
                                    <option selected hidden>-- select course --</option>
                                    {courses.map((course) => (
                                        <option key={course.value} value={course.value}>{course.label}</option>
                                    ))}
                                </select>
                                <InputError message={errors.course} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="year_level">Year Level</label>
                                <select name="year_level" id="year_level" value={data.year_level} onChange={(e) => setData('year_level', Number(e.target.value))} className='block w-1/2'>
                                    <option selected hidden>-- select year level --</option>
                                    <option value={1}>1st year</option>
                                    <option value={2}>2nd year</option>
                                    <option value={3}>3rd year</option>
                                    <option value={4}>4th year</option>
                                    <option value={5}>5th year</option>
                                    <option value={6}>6th year</option>
                                </select>
                                <InputError message={errors.year_level} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="section">Section</label>
                                {/* {data.section} */}
                                <select name="section" id="section" value={data.section} onChange={(e) => setData('section', e.target.value)} className='block w-1/2'>
                                    <option selected hidden>-- select section --</option>
                                    <option value={'A'}>A</option>
                                    <option value={'B'}>B</option>
                                    <option value={'C'}>C</option>
                                    <option value={'D'}>D</option>
                                    <option value={'E'}>E</option>
                                    <option value={'F'}>F</option>
                                </select>
                                <InputError message={errors.section} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subject">Subject</label>
                                <select name="subject" id="subject" value={data.subject} onChange={(e) => setData('subject', Number(e.target.value))} className='block w-1/2'>
                                    <option selected hidden>-- select subject --</option>
                                    {subjects.map((subject: Subject) => (
                                        <option key={subject.id} value={subject.id}>{subject.code} - {subject.title}</option>
                                    ))}
                                </select>

                                <InputError message={errors.subject} />
                            </div>
                            <div className='mb-3'>
                                <Button type='submit' disabled={processing} variant='contained'>{(class_id === 0 ? "Save" : "Update")}</Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
