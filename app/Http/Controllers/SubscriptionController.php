<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function show()
    {
        return Inertia::render('Subscription/Show', [
            'subscription' => auth()->user()->subscriptions()->first(),
            'intent' => auth()->user()->createSetupIntent(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'payment_method' => 'required',
        ]);

        $user = $request->user();

        $user->createOrGetStripeCustomer();
        $user->updateDefaultPaymentMethod($request->payment_method);

        $subscription = $user->newSubscription('default', config('services.stripe.price_id'))
            ->create($request->payment_method);

        return redirect()->route('subscription.show')
            ->with('success', 'Your subscription has been created!');
    }

    public function cancel(Request $request)
    {
        $subscription = $request->user()->subscriptions()->first();

        if ($subscription) {
            $subscription->cancel();
        }

        return redirect()->route('subscription.show')
            ->with('success', 'Your subscription has been canceled.');
    }

    public function resume(Request $request)
    {
        $subscription = $request->user()->subscriptions()->first();

        if ($subscription && $subscription->onGracePeriod()) {
            $subscription->resume();
        }

        return redirect()->route('subscription.show')
            ->with('success', 'Your subscription has been resumed.');
    }
}
