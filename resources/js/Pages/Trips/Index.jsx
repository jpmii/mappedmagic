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
                        {trips.map(trip => {
                            const formattedStartDate = new Date(trip.start_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            });
                            const formattedEndDate = new Date(trip.end_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            });
                            // Get unique hotel names for this trip
                            const hotelNames = (trip.hotel_stays || [])
                                .map(stay => stay.hotel?.name)
                                .filter(Boolean);
                            return (
                                <li key={trip.id} className='mb-4'>
                                    <Link href={route('trips.show', trip.id)}>{trip.name}</Link>
                                    <div className="text-sm text-magicgold">
                                        {formattedStartDate} - {formattedEndDate}
                                    </div>
                                    {hotelNames.length > 0 && (
                                        <div className="text-xs text-gray-400">
                                            Hotels: {hotelNames.join(', ')}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
