import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import DeleteReservationButton from '@/Components/DeleteReservationButton';
import AttractionTypeIcon from '@/Components/AttractionTypeIcon';
import AttractionStatusIcon from '@/Components/AttractionStatusIcon';
import { Pencil } from 'lucide-react';
import axios from 'axios';

function useWaitTimes(parkIds, setWaitTimes) {
    useEffect(() => {
        const fetchWaitTimes = async () => {
            console.log('Fetching wait times for park IDs:', parkIds);
            const { data } = await axios.get('/api/wait-times', {
                params: { park_ids: parkIds }
            });
            console.log('Received wait times data:', data);
            setWaitTimes(data);
        };
        fetchWaitTimes();
        const interval = setInterval(fetchWaitTimes, 30000); // every 30 seconds
        return () => clearInterval(interval);
    }, [parkIds, setWaitTimes]);
}

// Helper function to find entity data by attraction ID
function findEntityData(waitTimes, attractionId) {
    for (const parkData of Object.values(waitTimes)) {
        if (parkData?.entities) {
            const entity = parkData.entities.find(e => e.id === attractionId);
            if (entity) return entity;
        }
    }
    return null;
}

// Helper function to get wait time from queue data
function getWaitTime(entity, queueType = 'STANDBY') {
    if (!entity?.queue?.[queueType]) return null;
    return entity.queue[queueType].waitTime;
}

// Helper function to filter entities by type
function filterEntitiesByType(waitTimes, entityType) {
    console.log('Filtering entities by type:', entityType, 'from waitTimes:', waitTimes);
    const filteredEntities = [];
    for (const parkData of Object.values(waitTimes)) {
        if (parkData?.entities) {
            const entities = parkData.entities.filter(e => e.entityType === entityType);
            filteredEntities.push(...entities);
        }
    }
    console.log('Filtered entities for', entityType, ':', filteredEntities.length, 'entities');
    return filteredEntities;
}

// Component for displaying a single entity item
function EntityItem({ entity, showWaitTimes = true }) {
    const standbyWait = getWaitTime(entity, 'STANDBY');
    const paidStandbyWait = getWaitTime(entity, 'PAID_STANDBY');
    
    return (
        <li className="p-3 bg-magicblack-600 rounded mb-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <AttractionStatusIcon status={entity?.status} />
                    <span className="font-medium text-magicwhite">{entity?.name}</span>
                </div>
                {entity?.status === 'OPERATING' && showWaitTimes && (
                    <div className="flex gap-1">
                        {standbyWait !== null && standbyWait > 0 && (
                            <span
                                className={`text-xs px-2 py-1 rounded text-magicblack ${
                                    standbyWait < 30
                                        ? 'bg-green-400'
                                        : standbyWait < 60
                                            ? 'bg-yellow-400'
                                            : 'bg-red-400'
                                }`}
                            >
                                {standbyWait}m
                            </span>
                        )}
                        {paidStandbyWait !== null && paidStandbyWait > 0 && (
                            <span
                                className={`text-xs px-2 py-1 rounded text-magicblack ${
                                    paidStandbyWait < 30
                                        ? 'bg-green-400'
                                        : paidStandbyWait < 60
                                            ? 'bg-yellow-400'
                                            : 'bg-red-400'
                                }`}
                            >
                                ${paidStandbyWait}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </li>
    );
}

// Component for displaying a column of entities
function EntityColumn({ title, entities, showWaitTimes = true, emptyMessage = "None available" }) {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-magicwhite mb-3">{title}</h3>
            <ul className="space-y-1">
                {entities.length > 0 ? (
                    entities.map((entity) => (
                        <EntityItem key={entity.id} entity={entity} showWaitTimes={showWaitTimes} />
                    ))
                ) : (
                    <li className="text-gray-500 text-sm italic">{emptyMessage}</li>
                )}
            </ul>
        </div>
    );
}

export default function Daily({ trip, groupedReservations, parks, waitTimes }) {
    const availableDates = Object.keys(groupedReservations).sort();
    const [selectedDate, setSelectedDate] = useState(availableDates[0]);
    const uniqueParkIds = new Set();
    groupedReservations[selectedDate]?.forEach(res => {
        if (res.park_id) uniqueParkIds.add(res.park_id);
    });

    useWaitTimes(Array.from(uniqueParkIds), waitTimes);

    // Filter entities by type
    // const attractions = filterEntitiesByType(waitTimes, 'ATTRACTION');
    // const shows = filterEntitiesByType(waitTimes, 'SHOW');
    // const restaurants = filterEntitiesByType(waitTimes, 'RESTAURANT');

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
                    <label className="block font-medium mb-1 text-magicwhite">Select Date:</label>
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
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-magicwhite mb-4">
                        {new Date(selectedDate + "T00:00:00").toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })} - Your Reservations
                    </h2>

                    <ul className="space-y-2">
                        {groupedReservations[selectedDate]?.length ? (
                            groupedReservations[selectedDate].map((res) => {
                                const entity = findEntityData(waitTimes, res.attraction_id);
                                const standbyWait = getWaitTime(entity, 'STANDBY');
                                const paidStandbyWait = getWaitTime(entity, 'PAID_STANDBY');
                                
                                return (
                                    <li key={res.id} className="p-4 bg-magicblack-600 rounded">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <AttractionStatusIcon status={entity?.status} />
                                                <AttractionTypeIcon type={res.type} />
                                                <strong className="text-magicwhite">{res.attraction?.name}</strong>
                                                <span className="text-gray-400">at {new Date(`1970-01-01T${res.time}`).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                })}</span>
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
                                            {entity?.status === 'OPERATING' && res.type === 'ATTRACTION' && standbyWait && (
                                                <div
                                                    className={`text-magicblack ml-2 p-2 rounded text-center ${standbyWait < 30
                                                        ? 'bg-green-400'
                                                        : standbyWait < 60
                                                            ? 'bg-yellow-400'
                                                            : 'bg-red-400'
                                                        }`}
                                                >
                                                    <span className="block">Standby</span>
                                                    {standbyWait}
                                                </div>
                                            )}
                                            {entity?.status === 'OPERATING' && res.type === 'ATTRACTION' && paidStandbyWait && (
                                                <div
                                                    className={
                                                        `ml-2 text-xs px-2 py-1 rounded text-magicblack ` +
                                                        (paidStandbyWait < 30
                                                            ? 'bg-green-400'
                                                            : paidStandbyWait < 60
                                                                ? 'bg-yellow-400'
                                                                : 'bg-red-400')
                                                    }
                                                >
                                                    <span className="block">Paid Standby</span>
                                                    {paidStandbyWait}
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
                </div>

                {/* Park Overview - Three Column Layout */}
                {Array.from(uniqueParkIds).map(parkId => {
                    const park = parks.find(p => p.id === parkId);
                    if (!park) return null;

                    // Get entities for this park only
                    const parkWaitTimes = waitTimes[park.api_id] || {};
                    const parkEntities = parkWaitTimes.entities || [];

                    const attractions = parkEntities.filter(e => e.entityType === 'ATTRACTION');
                    const shows = parkEntities.filter(e => e.entityType === 'SHOW');
                    const restaurants = parkEntities.filter(e => e.entityType === 'RESTAURANT');

                    return (
                        <div key={parkId} className="mb-8">
                            <h2 className="text-xl font-semibold text-magicwhite mb-4">
                                {park.name} - Live Status
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <EntityColumn 
                                    title="Attractions" 
                                    entities={attractions}
                                    showWaitTimes={true}
                                    emptyMessage="No attractions available"
                                />
                                <EntityColumn 
                                    title="Shows" 
                                    entities={shows}
                                    showWaitTimes={false}
                                    emptyMessage="No shows available"
                                />
                                <EntityColumn 
                                    title="Restaurants" 
                                    entities={restaurants}
                                    showWaitTimes={false}
                                    emptyMessage="No restaurants available"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
