import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import DeleteReservationButton from '@/Components/DeleteReservationButton';
import AttractionTypeIcon from '@/Components/AttractionTypeIcon';
import AttractionStatusIcon from '@/Components/AttractionStatusIcon';
import { Pencil } from 'lucide-react';
import axios from 'axios';

function useWaitTimes(attractionIds, setWaitTimes) {
    useEffect(() => {
        const fetchWaitTimes = async () => {
            const { data } = await axios.get('/api/wait-times', {
                params: { attraction_ids: attractionIds }
            });
            setWaitTimes(data);
        };
        fetchWaitTimes();
        const interval = setInterval(fetchWaitTimes, 30000); // every 30 seconds
        return () => clearInterval(interval);
    }, [attractionIds, setWaitTimes]);
}

export default function Daily({ trip, groupedReservations, parks, waitTimes }) {
    const availableDates = Object.keys(groupedReservations).sort();
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);
    const uniqueParkIds = new Set();
    groupedReservations[selectedDate]?.forEach(res => {
        if (res.park_id) uniqueParkIds.add(res.park_id);
    });

    useWaitTimes(Array.from(uniqueParkIds), waitTimes);

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
                            groupedReservations[selectedDate].map((res) => {
                                const wait = waitTimes[res.attraction_id];
                                return (
                                    <li key={res.id} className="p-4 bg-magicblack-600 rounded">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <AttractionStatusIcon status={wait?.data?.status} />
                                                <AttractionTypeIcon type={res.type} />
                                                <strong>{res.attraction?.name}</strong> at {new Date(`1970-01-01T${res.time}`).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                })}
                                            </div>
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
                                        <div className="flex items-center mt-2">
                                            {wait && wait.data.status === 'OPERATING' && res.type === 'ATTRACTION' && wait.data.standby_wait && (
                                                <div
                                                    className={`text-magicblack ml-2 p-2 rounded text-center ${wait.data.standby_wait < 30
                                                        ? 'bg-green-400'
                                                        : wait.data.standby_wait < 60
                                                            ? 'bg-yellow-400'
                                                            : 'bg-red-400'
                                                        }`}
                                                >
                                                    <span className="block">Standby</span>
                                                    {wait.data.standby_wait}
                                                </div>
                                            )}
                                            {wait && wait.data.status === 'OPERATING' && res.type === 'ATTRACTION' && wait.data.paid_standby && (
                                                <div
                                                    className={
                                                        `ml-2 text-xs px-2 py-1 rounded text-magicblack ` +
                                                        (wait.data.paid_standby < 30
                                                            ? 'bg-green-400'
                                                            : wait.data.paid_standby < 60
                                                                ? 'bg-yellow-400'
                                                                : 'bg-red-400')
                                                    }
                                                >
                                                    <span className="block">Paid Standby</span>
                                                    {wait.data.paid_standby}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <p className="text-gray-600">No reservations set for this day.</p>
                        )}
                    </ul>

                    {Array.from(uniqueParkIds).map(parkId => {
                        const park = parks.find(p => p.id === parkId);
                        if (!park) return null;

                        return (
                            <div key={parkId}>
                                <h2 className="text-xl font-semibold text-magicwhite mb-2">
                                    All {park.name} Attractions
                                </h2>
                                <ul className="mb-4">
                                    {park.attractions.map(attraction => {
                                        const wait = waitTimes[attraction.id];
                                        let ageMinutes = null;
                                        if (wait?.cached_at) {
                                            ageMinutes = Math.floor((Date.now() - new Date(wait.cached_at).getTime()) / 60000);
                                        }
                                        return (
                                            <li key={attraction.id} className="flex items-center gap-2 text-magicwhite">
                                                <span>{attraction.name}</span>
                                                {wait?.data?.standby_wait !== undefined && wait?.data?.standby_wait > 0 && (
                                                    <span
                                                        className={
                                                            `ml-2 text-xs px-2 py-1 rounded text-magicblack ` +
                                                            (wait.data.standby_wait < 30
                                                                ? 'bg-green-400'
                                                                : wait.data.standby_wait < 60
                                                                    ? 'bg-yellow-400'
                                                                    : 'bg-red-400')
                                                        }
                                                    >
                                                        Standby: {wait.data.standby_wait} min
                                                        {ageMinutes > 10 ? '⚠️' : ''}
                                                    </span>
                                                )}
                                                {wait?.data?.paid_standby !== undefined && wait?.data?.paid_standby > 0 && (
                                                    <span
                                                        className={
                                                            `ml-2 text-xs px-2 py-1 rounded text-magicblack ` +
                                                            (wait.data.paid_standby < 30
                                                                ? 'bg-green-400'
                                                                : wait.data.paid_standby < 60
                                                                    ? 'bg-yellow-400'
                                                                    : 'bg-red-400')
                                                        }
                                                    >
                                                        Paid Standby: {wait.data.paid_standby} min
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
