import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <GuestLayout header={<h2 className="text-xl font-semibold leading-tight text-magicwhite">Terms and Conditions</h2>}>
            <Head title="Terms of Service" />
            <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
                <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
                <p><strong>Effective Date:</strong> June 30, 2025</p>

                <h2>1. Account Use</h2>
                <p>You are responsible for keeping your login credentials safe and agree not to share your account.</p>

                <h2>2. Acceptable Use</h2>
                <p>You agree not to use the service to:</p>
                <ul>
                    <li>Break any laws</li>
                    <li>Attack, hack, or disrupt the app</li>
                    <li>Upload harmful or malicious content</li>
                </ul>

                <h2>3. Availability</h2>
                <p>We aim for high uptime, but cannot guarantee availability or uninterrupted access. Features may change over time.</p>

                <h2>4. Data Ownership</h2>
                <p>You retain ownership of your trip data. When you delete your account, your data is permanently removed.</p>

                <h2>5. Changes to Terms</h2>
                <p>We may revise these terms at any time. Major changes will be communicated via email or within the app.</p>

                <h2>6. Contact</h2>
                <p>For questions, <a href="/contact">contact us</a>.</p>

            </div>
        </GuestLayout>
    );
}