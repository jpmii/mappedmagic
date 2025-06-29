import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteReservationButton from '@/Components/DeleteReservationButton';
import DeleteHotelButton from '@/Components/DeleteHotelButton';
import AttractionTypeIcon from '@/Components/AttractionTypeIcon';
import { formatTime } from '@/utils';
import { Plus, Pencil, Calendar1, Hotel } from 'lucide-react';

export default function Show({ trip, hotelStays }) {
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                        {trip.name}
                    </h2>
                    <div className="text-sm text-magicgold">
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
                    <Link href={route('hotel-stays.create', { trip: trip.id })} className="btn-primary"><Hotel className="w-4 h-4 mr-2" /> Add Hotel Stay</Link>
                </div>

                {/* Hotel Stays Section */}
                {hotelStays && hotelStays.length > 0 && (
                    <div className="my-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Hotel className="w-5 h-5" />
                            Hotel Stays
                        </h3>
                        <div className="space-y-3">
                            {hotelStays
                                .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date))
                                .map((hotelStay) => (
                                    <div key={hotelStay.id} className="p-4 bg-magicblack-600 rounded">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="font-medium text-lg">{hotelStay.hotel?.name || 'Unknown Hotel'}</div>
                                                <div className="text-sm text-gray-400">
                                                    {formatDate(hotelStay.check_in_date)} - {formatDate(hotelStay.check_out_date)}
                                                    {hotelStay.number_of_nights > 1 && ` (${hotelStay.number_of_nights} nights)`}
                                                </div>
                                                {hotelStay.room_type && (
                                                    <div className="text-sm text-gray-400">Room: {hotelStay.room_type}</div>
                                                )}
                                                {hotelStay.hotel?.transportation && (
                                                    <div className="text-sm text-gray-400">Transportation: {hotelStay.hotel.transportation}</div>
                                                )}
                                                {hotelStay.price_per_night && (
                                                    <div className="text-sm text-green-400">
                                                        ${hotelStay.price_per_night}/night
                                                        {hotelStay.number_of_rooms > 1 && ` (${hotelStay.number_of_rooms} rooms)`}
                                                    </div>
                                                )}
                                                {hotelStay.confirmation_number && (
                                                    <div className="text-sm text-blue-400">
                                                        Confirmation: {hotelStay.confirmation_number}
                                                    </div>
                                                )}
                                                {hotelStay.is_booked && (
                                                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-1">
                                                        Booked
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Link
                                                    href={route('hotel-stays.edit', { trip: trip.id, hotelStay: hotelStay.id })}
                                                    className="text-blue-600 hover:underline"
                                                    aria-label="Edit hotel stay"
                                                    title="Edit hotel stay"
                                                >
                                                    <Pencil className="w-4 h-4 text-blue-600" />
                                                </Link>
                                                <DeleteHotelButton
                                                        tripId={trip.id}
                                                        hotelStayId={hotelStay.id}
                                                        aria-label="Delete Hotel Stay"
                                                        title="Delete Hotel Stay"
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Reservations Section */}
                <div className="my-6">
                    <h3 className="text-lg font-semibold mb-4">Reservations</h3>
                    {trip.reservations.length ? (
                        Object.keys(groupByDate(trip.reservations)).map((date) => (
                            <div key={date} className="my-6">
                                <h4 className="text-md font-semibold">{date}</h4>
                                <ul className="space-y-2">
                                    {groupByDate(trip.reservations)[date]
                                        .sort((a, b) => {
                                            const timeA = new Date(`1970-01-01T${a.time}Z`).getTime();
                                            const timeB = new Date(`1970-01-01T${b.time}Z`).getTime();
                                            return timeA - timeB; // Sorts by time ascending
                                        })
                                        .map((reservation) => (
                                            <li key={reservation.id} className="p-4 bg-magicblack-600 rounded flex justify-between items-center">
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
                                                        aria-label="Edit reservation"
                                                        title="Edit reservation"
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
            </div>
        </AuthenticatedLayout>
    );
}