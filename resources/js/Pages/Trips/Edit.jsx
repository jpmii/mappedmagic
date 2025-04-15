import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ trip, destinations }) {
    const { data, setData, put, processing, errors } = useForm({
        name: trip.name,
        start_date: trip.start_date,
        end_date: trip.end_date,
        destination_id: trip.destination_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('trips.update', trip.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Trip" />

            <div className="max-w-2xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
                    {/* Trip Name */}
                    <div className="mb-4">
                        <label className="block font-medium">Trip Name</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    {/* Destination Dropdown */}
                    <div className="mb-4">
                        <label className="block font-medium">Destination</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={data.destination_id}
                            onChange={(e) => setData('destination_id', e.target.value)}
                        >
                            <option value="">Select a Destination</option>
                            {destinations.map(dest => (
                                <option key={dest.id} value={dest.id}>
                                    {dest.name}
                                </option>
                            ))}
                        </select>
                        {errors.destination_id && <p className="text-red-500">{errors.destination_id}</p>}
                    </div>

                    {/* Start Date */}
                    <div className="mb-4">
                        <label className="block font-medium">Start Date</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                        {errors.start_date && <p className="text-red-500">{errors.start_date}</p>}
                    </div>

                    {/* End Date */}
                    <div className="mb-4">
                        <label className="block font-medium">End Date</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                        {errors.end_date && <p className="text-red-500">{errors.end_date}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save Trip'}
                    </button>
                </form>
            </div>
            
        </AuthenticatedLayout>
    );
}
