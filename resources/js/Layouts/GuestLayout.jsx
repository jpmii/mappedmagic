import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ header, children }) {
    const isActive = (names) => names.some((name) => route().current(name));

    return (
        <div className="min-h-screen" id="guest-layout">
            <nav className="border-b border-magicgold bg-magicpurple text-magicwhite">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={isActive(['dashboard'])}
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    href={route('register')}
                                    active={isActive(['register'])}
                                >
                                    Register
                                </NavLink>
                                <NavLink
                                    href={route('login')}
                                    active={isActive(['login'])}
                                >
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-magicpurple-700 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <footer className="bg-magicpurple-700 text-magicwhite m-10 rounded-lg shadow-sm">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; {new Date().getFullYear()} <a href="https://${import.meta.env.VITE_APP_DOMAIN || 'localhost'}" className="hover:underline">MappedMagic</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="/login" className="hover:underline me-4 md:me-6">Login</a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:underline me-4 md:me-6">Terms and Conditions</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
