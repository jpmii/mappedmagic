import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create({ destinations }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_date: '',
        end_date: '',
        destination_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('trips.store'));
    };

    return (
        <AuthenticatedLayout header={
                <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                    Create a New Trip
                </h2>
            }>
            <div className="content-wrapper">
                <form onSubmit={handleSubmit} className="bg-magicblack p-6 shadow rounded">
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
