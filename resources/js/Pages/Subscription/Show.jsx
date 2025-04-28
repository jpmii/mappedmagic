import { useForm } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import CheckoutForm from '@/Components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Show({ subscription, intent }) {
    const [error, setError] = useState(null);

    const handleSubscription = async (paymentMethod) => {
        try {
            const response = await fetch('/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ payment_method: paymentMethod.id }),
            });

            if (!response.ok) {
                throw new Error('Subscription failed');
            }

            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-2xl font-bold mb-4">Subscription</h2>
                        
                        {subscription ? (
                            <div>
                                <p>Status: {subscription.stripe_status}</p>
                                {subscription.ends_at && (
                                    <p>Ends at: {new Date(subscription.ends_at).toLocaleDateString()}</p>
                                )}
                                {!subscription.ends_at && (
                                    <form method="POST" action={route('subscription.cancel')}>
                                        <button
                                            type="submit"
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel Subscription
                                        </button>
                                    </form>
                                )}
                                {subscription.ends_at && subscription.ends_at > new Date() && (
                                    <form method="POST" action={route('subscription.resume')}>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Resume Subscription
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p className="mb-4">Subscribe to access premium features!</p>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        clientSecret={intent.client_secret}
                                        onSuccess={handleSubscription}
                                    />
                                </Elements>
                                {error && (
                                    <p className="text-red-500 mt-4">{error}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 