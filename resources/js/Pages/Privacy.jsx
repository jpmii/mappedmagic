import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <GuestLayout header={<h2 className="text-xl font-semibold leading-tight text-magicwhite">Privacy Policy</h2>}>
            <Head title="Privacy Policy" />
            <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
                <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                <p><strong>Effective Date:</strong> June 30, 2025</p>

                <p>Thank you for using our vacation planner! We care deeply about your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect and how we use it.</p>

                <h2>1. Information We Collect</h2>
                <ul>
                    <li><strong>Account Information:</strong> We store your email and a securely hashed password when you sign up.</li>
                    <li><strong>Trip Data:</strong> You may add parks, rides, dining reservations, and itinerary details. This is stored securely and only visible to you when logged in.</li>
                </ul>
                <p>We do <strong>not</strong> collect sensitive personal information like your real name, address, or payment information.</p>

                <h2>2. Analytics</h2>
                <p>We use a <strong>self-hosted instance of Matomo Analytics</strong> to understand how users interact with the site. This setup does <strong>not</strong> collect personally identifiable information (PII). All analytics data is anonymized.</p>

                <h2>3. Cookies</h2>
                <p>We use essential cookies for:</p>
                <ul>
                    <li>Login sessions</li>
                    <li>User preferences</li>
                    <li>Anonymous analytics (via Matomo)</li>
                </ul>

                <h2>4. Data Sharing</h2>
                <p>We do <strong>not</strong> sell, rent, or share your personal data with third parties.</p>

                <h2>5. Data Security</h2>
                <p>Your data is protected with industry-standard security, including encrypted connections and hashed passwords.</p>

                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access your data</li>
                    <li>Delete your account and all stored information</li>
                    <li>Contact us with any concerns</li>
                </ul>

                <h2>7. Contact</h2>
                <p>If you have any questions, please <a href="/contact">contact us</a>.</p>
            </div>
        </GuestLayout>
    );
}