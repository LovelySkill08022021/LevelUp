import React from 'react'
import Card from '@/Components/system/Card';
import ContentLayout from '@/Components/system/ContentLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { Class } from '@/types';
import Back from '@/Components/system/Back';
import Button from '@mui/material/Button';

interface Props {
    _class: Class;
    children: React.ReactNode;
    active_tab: string;
}

export default function Layout({_class, children, active_tab }: Props) {
  return (
    <>
        <Head title={`Activity`} />

        <ContentLayout>
            <Card>
                <div className='flex items-center mb-2'>
                    <Link href="/class" className='text-blue-500'>
                        <Back />
                    </Link>
                    <div className='ms-3 text-lg font-bold'>{_class.name}</div>
                </div>
                <div className='mb-5 border-b border-gray-300'>
                    <Link href={`/class/${_class.id}/open`}>
                        <button className={`px-4 py-2 hover:bg-slate-100 text-gray-700 font-semibold ${active_tab == 'activities' ? "border-b-2 border-blue-400" : ""}`}>
                            Activities
                        </button>
                    </Link>
                    <Link href={`/class/${_class.id}/open/students`}>
                        <button className={`px-4 py-2 hover:bg-slate-100 text-gray-700 font-semibold ${active_tab == 'students' ? "border-b-2 border-blue-400" : ""}`}>
                            Students
                        </button>
                    </Link>
                    <a href={`/class/${_class.id}/open/gradesheet`} target='_blank'>
                        <button className={`px-4 py-2 hover:bg-slate-100 text-gray-700 font-semibold ${active_tab == 'gradesheet' ? "border-b-2 border-blue-400" : ""}`}>
                            Grade Sheet
                        </button>
                    </a>
                </div>
                <div>
                    {children}
                </div>
            </Card>
        </ContentLayout>
    </>
  )
}
