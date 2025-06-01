import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { PlaneTakeoff } from 'lucide-react';


export default function Index({ trips }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                    My Trips
                </h2>
            }
        >
            <Head title="My Trips" />

            <div className="content-wrapper">
                <div>
                    <div className="link-list-sub-navigation">
                        <Link href={route('trips.create')} className="btn-primary"><PlaneTakeoff className="w-4 h-4 mr-2" /> Create New Trip</Link>
                    </div>
                    <ul>
                        {trips.map(trip => (
                            <li key={trip.id}>
                                <Link href={route('trips.show', trip.id)}>{trip.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
