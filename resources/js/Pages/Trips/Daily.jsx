import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Daily({ trip, groupedReservations }) {
    const availableDates = Object.keys(groupedReservations).sort();
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);

    return (
        <AuthenticatedLayout>
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white shadow-sm sm:rounded-lg text-gray-900">
                <div className="p-4 sm:p-6">
                    <Head title={`Daily View - ${trip.name}`} />
                    <h1 className="text-2xl font-bold mb-4">Daily View for {trip.name}</h1>

                    {/* Date Dropdown */}
                    <div className="mb-6">
                        <label className="block font-medium mb-1">Select Date:</label>
                        <select
                            className="border rounded p-2"
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
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {new Date(selectedDate + "T00:00:00").toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </h2>

                        <ul className="space-y-2">
                        {groupedReservations[selectedDate]?.length ? (
                            groupedReservations[selectedDate].map((res) => (
                                <li key={res.id} className="p-4 bg-gray-100 rounded">
                                    <strong>{res.attraction?.name}</strong> at {res.time}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No reservations set for this day.</p>
                        )}

                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
