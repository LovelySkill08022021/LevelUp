import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@mui/material';
import Card from '@/Components/system/Card';
import ContentLayout from '@/Components/system/ContentLayout';
import ClassBlock from './page-component/ClassBlock'
import type { Class } from '@/types'
import StudentClass from './page-component/StudentClass';

interface Props extends PageProps {
    classes: Class[];
}

export default function ClassPage({ auth, classes } : Props) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Class" />

            <ContentLayout>
                    <Card>
                        {auth.user.user_type == 'faculty' && 
                            <div className="mb-8">
                                <Link href={`/class/${0}`}>
                                    <Button disableElevation variant='contained'>New</Button>
                                </Link> 
                            </div>
                        }
                        <div>
                            {classes.map((_class: Class) => (
                                <div key={_class.id}>
                                    {auth.user.user_type == 'student' ? 
                                        <StudentClass _class={_class} />
                                        :
                                        <ClassBlock _class={_class} />
                                    }
                                </div>
                            ))}
                        </div>
                    </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
