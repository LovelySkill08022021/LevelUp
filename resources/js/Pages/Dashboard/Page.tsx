import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Chart from './page-component/Chart';
import ContentLayout from '@/Components/system/ContentLayout';
import Card from '@/Components/system/Card';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard" />

            <ContentLayout>
                <Card>
                    <div className="p-6 text-gray-900">You're logged in!</div>
                    <div>
                        <Chart />
                    </div>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
