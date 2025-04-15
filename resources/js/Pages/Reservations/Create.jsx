import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create({ trip, parks, attractions }) {
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        time: '',
        park_id: '',
        attraction_id: '',
    });

    const [filteredAttractions, setFilteredAttractions] = useState([]);

    useEffect(() => {
        if (data.park_id) {
            const results = attractions.filter(a => a.park_id == data.park_id);
            setFilteredAttractions(results);
        } else {
            setFilteredAttractions([]);
        }
    }, [data.park_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservations.store', { trip: trip.id }));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Add Reservation for {trip.name}</h2>}>
            <Head title="New Reservation" />
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">

                {/* Park Dropdown */}
                <div className="mb-4">
                    <label className="block font-medium">Park</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={data.park_id}
                        onChange={(e) => setData('park_id', e.target.value)}
                    >
                        <option value="">Select a park</option>
                        {parks.map(park => (
                            <option key={park.id} value={park.id}>{park.name}</option>
                        ))}
                    </select>
                </div>

                {/* Dependent Dropdown (Attraction/Restaurant) */}
                <div className="mb-4">
                    <label className="block font-medium">Attraction</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={data.attraction_id}
                        onChange={(e) => setData('attraction_id', e.target.value)}
                        disabled={!filteredAttractions.length}
                    >
                        <option value="">Select an attraction</option>
                        {filteredAttractions.map(attraction => (
                            <option key={attraction.id} value={attraction.id}>[{attraction.type}] {attraction.name}</option>
                        ))}
                    </select>
                </div>

                {/* Date / Time */}
                <div className="mb-4">
                    <label className="block font-medium">Date</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Time</label>
                    <input
                        type="time"
                        className="w-full border p-2 rounded"
                        value={data.time}
                        onChange={(e) => setData('time', e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Create Reservation'}
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
