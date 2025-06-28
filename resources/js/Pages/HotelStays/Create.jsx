import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ trip, hotels }) {
    const { data, setData, post, processing, errors } = useForm({
        hotel_id: '',
        description: '',
        confirmation_number: '',
        price_per_night: '',
        number_of_nights: 1,
        number_of_rooms: 1,
        room_type: '',
        check_in_date: '',
        check_out_date: '',
        check_in_time: '',
        check_out_time: '',
        notes: '',
        is_booked: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hotel-stays.store', trip.id));
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-2xl font-bold mb-4">Add Hotel Stay</h2>
                        <h3 className="text-lg mb-4">Trip: {trip.name}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hotel *
                                    </label>
                                    <select
                                        value={data.hotel_id}
                                        onChange={(e) => setData('hotel_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Select a hotel</option>
                                        {hotels.map((hotel) => (
                                            <option key={hotel.id} value={hotel.id}>
                                                {hotel.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.hotel_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.hotel_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Room Type
                                    </label>
                                    <input
                                        type="text"
                                        value={data.room_type}
                                        onChange={(e) => setData('room_type', e.target.value)}
                                        placeholder="e.g., Standard Double, Suite"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Check-in Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={data.check_in_date}
                                        onChange={(e) => setData('check_in_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.check_in_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.check_in_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Check-out Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={data.check_out_date}
                                        onChange={(e) => setData('check_out_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.check_out_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.check_out_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Number of Nights *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.number_of_nights}
                                        onChange={(e) => setData('number_of_nights', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.number_of_nights && (
                                        <p className="text-red-500 text-sm mt-1">{errors.number_of_nights}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Number of Rooms *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.number_of_rooms}
                                        onChange={(e) => setData('number_of_rooms', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.number_of_rooms && (
                                        <p className="text-red-500 text-sm mt-1">{errors.number_of_rooms}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price per Night
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price_per_night}
                                        onChange={(e) => setData('price_per_night', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirmation Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.confirmation_number}
                                        onChange={(e) => setData('confirmation_number', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Check-in Time
                                    </label>
                                    <input
                                        type="time"
                                        value={data.check_in_time}
                                        onChange={(e) => setData('check_in_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Check-out Time
                                    </label>
                                    <input
                                        type="time"
                                        value={data.check_out_time}
                                        onChange={(e) => setData('check_out_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Notes
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_booked"
                                    checked={data.is_booked}
                                    onChange={(e) => setData('is_booked', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_booked" className="ml-2 block text-sm text-gray-900">
                                    Already Booked
                                </label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <a
                                    href={route('trips.show', trip.id)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {processing ? 'Adding...' : 'Add Hotel Stay'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 