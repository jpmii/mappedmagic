import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import DeleteReservationButton from '@/Components/DeleteReservationButton';
import AttractionTypeIcon from '@/Components/AttractionTypeIcon';
import { formatTime } from '@/utils';
import { Plus, Pencil, Calendar1 } from 'lucide-react';

export default function Show({ trip }) {
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

    const groupByDate = (reservations) => {
        return reservations.reduce((groups, reservation) => {
            const date = new Date(reservation.date + "T00:00:00").toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });

            // If the date doesn't exist in the groups, create it
            if (!groups[date]) {
                groups[date] = [];
            }

            groups[date].push(reservation);
            return groups;
        }, {});
    };


    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {trip.name}
                    </h2>
                    <div className="text-sm">
                        {formattedStartDate} - {formattedEndDate}
                    </div>
                </div>
            }
        >
            <Head title={trip.name} />

            <div className="content-wrapper">
                <div className="link-list-sub-navigation">
                    <Link href={route('trips.daily', trip.id)} className="btn-primary"><Calendar1 className="w-4 h-4 mr-2" />Daily View</Link>
                    <Link href={route('trips.edit', trip.id)} className="btn-primary"><Pencil className="w-4 h-4 mr-2" />Edit This Trip</Link>
                    <Link href={route('reservations.create', { trip: trip.id })} className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Reservation</Link>
                </div>
                {trip.reservations.length ? (
                    Object.keys(groupByDate(trip.reservations)).map((date) => (
                        <div key={date} className="my-6">
                            <h3 className="text-lg font-semibold">{date}</h3>
                            <ul className="space-y-2">
                                {groupByDate(trip.reservations)[date]
                                    .sort((a, b) => {
                                        const timeA = new Date(`1970-01-01T${a.time}Z`).getTime();
                                        const timeB = new Date(`1970-01-01T${b.time}Z`).getTime();
                                        return timeA - timeB; // Sorts by time ascending
                                    })
                                    .map((reservation) => (
                                        <li key={reservation.id} className="p-4 bg-gray-100 rounded flex justify-between items-center">
                                            <div>
                                                <div className="font-medium flex items-center gap-1">
                                                    <AttractionTypeIcon type={reservation.type} />
                                                    {reservation.attraction?.name ?? 'Unknown'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {new Date(reservation.date + "T00:00:00").toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })} at {formatTime(reservation.time)}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('reservations.edit', { trip: trip.id, reservation: reservation.id })}
                                                    className="text-blue-600 hover:underline"
                                                    aria-label="Edit reservation" title="Edit reservation"
                                                >
                                                    <Pencil className="w-4 h-4 text-blue-600" />

                                                </Link>
                                                <DeleteReservationButton
                                                    tripId={trip.id}
                                                    reservationId={reservation.id}
                                                    aria-label="Delete reservation"
                                                    title="Delete reservation"
                                                />
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No reservations yet.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}