import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="content-wrapper">
                You're logged in!
            </div>
        </AuthenticatedLayout>
    );
}
