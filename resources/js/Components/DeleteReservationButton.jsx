// resources/js/Components/DeleteReservationButton.jsx
import { useForm } from '@inertiajs/react';
import { Trash, Loader2 } from 'lucide-react';

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
        aria-label="Delete reservation"
        title="Delete reservation"
      >
        {form.processing ? (
          <Loader2 className="w-4 h-4 animate-spin" /> // Spinner icon when processing
        ) : (
          <Trash className="w-4 h-4" /> // Trash icon when idle
        )}
      </button>
    </form>
  );
}
