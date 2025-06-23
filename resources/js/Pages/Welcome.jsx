import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Home({ user }) {
    const Layout = user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                user && (
                    <h2 className="text-xl font-semibold leading-tight text-magicwhite">
                        Dashboard
                    </h2>
                )
            }
        >
            <Head title="Mapped Magic" />
            <div className="relative w-full overflow-hidden border-b border-magicgold">
                <img
                    src="/images/hero.jpg"
                    alt="Magical Park"
                    className="w-full h-600 object-cover brightness-75 opacity-50"
                    style={{ maxHeight: 650 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold text-magicwhite drop-shadow-lg mb-4">
                        Welcome to Mapped Magic
                    </h1>
                    <p className="text-lg text-magicgold mb-6 drop-shadow">
                        Plan your magical adventure with ease!
                    </p>
                    <a
                        href={user ? '/trips' : '/register'}
                        className="bg-magicgold text-magicblack font-semibold px-6 py-3 rounded shadow hover:bg-yellow-400 transition"
                    >
                        {user ? 'View My Trips' : 'Get Started'}
                    </a>
                </div>
            </div>
        </Layout>
    );
}