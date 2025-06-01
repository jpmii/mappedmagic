import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ reservation, parks, attractions }) {
    const { data, setData, put, processing, errors } = useForm({
        date: reservation.date || '',
        time: reservation.time || '',
        park_id: reservation.park_id || '',
        attraction_id: reservation.attraction_id || '',
        confirmation_number: reservation.confirmation_number || '',
        party_size: reservation.party_size || '',
        status: reservation.status || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('reservations.update', reservation.id));
    };

    return (
        <AuthenticatedLayout header={
                <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                    Edit Reservation
                </h2>
            }>
            <Head title="Edit Reservation" />

            <div className="content-wrapper">

                <form onSubmit={handleSubmit} className="bg-magicblack p-6 rounded shadow">
                    {/* Date */}
                    <div className="mb-4">
                        <label className="block font-medium">Date</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div className="mb-4">
                        <label className="block font-medium">Time</label>
                        <input
                            type="time"
                            className="w-full border p-2 rounded"
                            value={data.time}
                            onChange={(e) => setData('time', e.target.value)}
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                    </div>

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
                                <option key={park.id} value={park.id}>
                                    {park.name}
                                </option>
                            ))}
                        </select>
                        {errors.park_id && <p className="text-red-500 text-sm">{errors.park_id}</p>}
                    </div>

                    {/* Attraction Dropdown */}
                    <div className="mb-4">
                        <label className="block font-medium">Attraction</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={data.attraction_id}
                            onChange={(e) => setData('attraction_id', e.target.value)}
                        >
                            <option value="">Select an attraction</option>
                            {attractions
                                .filter(a => a.park_id == data.park_id)
                                .map(attraction => (
                                    <option key={attraction.id} value={attraction.id}>
                                        {attraction.name}
                                    </option>
                                ))}
                        </select>
                        {errors.attraction_id && <p className="text-red-500 text-sm">{errors.attraction_id}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Update Reservation'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
