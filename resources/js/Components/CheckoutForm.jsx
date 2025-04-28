import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ clientSecret, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (stripeError) {
            setError(stripeError.message);
            setProcessing(false);
            return;
        }

        onSuccess(paymentMethod);
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {processing ? 'Processing...' : 'Subscribe Now'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
    );
} 