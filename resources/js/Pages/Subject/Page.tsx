import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@mui/material';
import Card from '@/Components/system/Card';
import ContentLayout from '@/Components/system/ContentLayout';
import SubjectBlock from './page-component/SubjectBlock'
import type { Subject } from '@/types'
import { useEffect } from 'react';
import axios from 'axios';

interface Props extends PageProps {
    subjects: Subject[]
}

export default function SubjectPage({ auth, subjects }: Props) {

    function alertMessage(){
        alert("helo");
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Subject" />

            <ContentLayout>
                    <Card>
                        <Link href={`/subject/${0}`}>
                            <Button disableElevation variant='contained'>New</Button>
                        </Link>
                        <div className='mt-8'>
                            {subjects.map((subject: Subject) => (
                                <SubjectBlock key={subject.id} subject={subject} />
                            ))}
                        </div>
                    </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
