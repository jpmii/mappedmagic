import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Index({ trips }) {
    return (
        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            My Trips
                        </h2>
                    }
                >
        <Head title="My Trips" />

        <div>
            <Link href={route('trips.create')} className="btn">Create New Trip</Link>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <Link href={route('trips.show', trip.id)}>{trip.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
        </AuthenticatedLayout>
    );
}
