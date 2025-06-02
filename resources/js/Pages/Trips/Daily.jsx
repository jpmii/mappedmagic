import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import DeleteReservationButton from '@/Components/DeleteReservationButton';
import AttractionTypeIcon from '@/Components/AttractionTypeIcon';
import AttractionStatusIcon from '@/Components/AttractionStatusIcon';
import { Pencil } from 'lucide-react';


export default function Daily({ trip, groupedReservations }) {
    const availableDates = Object.keys(groupedReservations).sort();
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                        Daily View for {trip.name}
                    </h2>
                </div>
            }
        >
            <div className="content-wrapper">
                <Head title={`Daily View - ${trip.name}`} />
                {/* Date Dropdown */}
                <div className="mb-6">
                    <label className="block font-medium mb-1">Select Date:</label>
                    <select
                        className="border rounded p-2 text-magicblack"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        {availableDates.map((date) => (
                            <option key={date} value={date}>
                                {new Date(date + "T00:00:00").toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Daily Reservations */}
                <div>
                    <h2 className="text-xl font-semibold text-magicwhite mb-2">
                        {new Date(selectedDate + "T00:00:00").toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h2>

                    <ul className="space-y-2">
                        {groupedReservations[selectedDate]?.length ? (
                            groupedReservations[selectedDate].map((res) => (
                                <li key={res.id} className="p-4 bg-magicblack-600 rounded">
                                    <div className="flex justify-between items-center">
                                        <div><AttractionStatusIcon status={res.live_data.status} /><AttractionTypeIcon type={res.type} /> <strong>{res.attraction?.name}</strong> at {new Date(`1970-01-01T${res.time}`).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        })}</div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('reservations.edit', { trip: trip.id, reservation: res.id })}
                                                className="text-blue-600 hover:underline"
                                                aria-label="Edit reservation" title="Edit reservation"
                                            >
                                                <Pencil className="w-4 h-4 text-blue-600" />

                                            </Link>
                                            <DeleteReservationButton
                                                tripId={trip.id}
                                                reservationId={res.id}
                                            />
                                        </div>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <pre className="text-xs text-gray-400">{JSON.stringify(res.live_data, null, 2)}</pre>
                                        {res.live_data?.status === 'OPERATING' && res.type === 'ATTRACTION' && res.live_data.standby_wait && (
                                            <div
                                                className={`ml-2 ${
                                                    res.live_data.standby_wait < 30
                                                        ? 'bg-green-400'
                                                        : res.live_data.standby_wait < 60
                                                        ? 'bg-yellow-400'
                                                        : 'bg-red-400'
                                                }`}
                                            >
                                                {res.live_data.standby_wait}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No reservations set for this day.</p>
                        )}

                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
