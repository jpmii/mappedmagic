// resources/js/Components/DeleteReservationButton.jsx
import { useForm } from '@inertiajs/react';

export default function DeleteReservationButton({ tripId, reservationId }) {
  const form = useForm();

  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this reservation?')) {
      form.delete(
        route('reservations.destroy', {
          trip: tripId,
          reservation: reservationId,
        })
      );
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="text-red-600 hover:underline disabled:opacity-50"
        disabled={form.processing}
      >
        {form.processing ? 'Deleting...' : 'Delete'}
      </button>
    </form>
  );
}
