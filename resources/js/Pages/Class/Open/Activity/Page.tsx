
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { PageProps, Class, Activity } from '@/types';
import Layout from '../Layout';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

interface ExActivity extends Activity {
    date: string;
    time: string;
}

interface Props extends PageProps {
    _class: Class;
    activities: ExActivity[];
}


export default function ActivityPage({ _class, activities, auth }: Props) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Layout _class={_class} active_tab='activities'>
                <>
                    <div className='mb-4'>
                        <Link href={`/class/${_class.id}/open/activity/0`}>
                            <Button variant='contained'>Create</Button>
                        </Link>
                    </div>
                    <table className='table-auto'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Max Score</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity) => (
                                <tr key={activity.id}>
                                    <td className='border'>{activity.name}</td>
                                    <td className='border'>{activity.max_score}</td>
                                    <td className='border'>{activity.type}</td>
                                    <td className='border'>{activity.date} {activity.time}</td>
                                    <td className='border'>
                                        <Link className='block' href={`/class/${_class.id}/open/activity/${activity.id}`}>
                                            <Button variant='contained' color="error">Edit</Button>
                                        </Link>
                                        <Link className='block' href={`/class/${_class.id}/open/activity/${activity.id}/scan`}>
                                            <Button variant='contained' color="error">Start Recording</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>

                    </div>
                    {activities.length <= 0 && (
                        <Alert severity='warning'>No activities were found.</Alert>
                    )}
                </>
            </Layout>
        </AuthenticatedLayout>
    )
}
