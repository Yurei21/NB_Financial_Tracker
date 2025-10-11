import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeSwitch from '@/Components/ThemeSwitch';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-stone-900 dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <ApplicationLogo/>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <>
                                        <ThemeSwitch/>
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <ThemeSwitch/>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                        <main className="mt-6 px-6 lg:px-16 bg-gray-900 min-h-screen text-white">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center min-h-screen">
                                
                                <div className="space-y-6">
                                <h1 className="text-4xl font-bold text-white">
                                    Welcome to N&B Ultrasound Clinic
                                </h1>
                                <p className="text-lg text-gray-300">
                                    Streamline your finances effortlessly with our advanced financial tracker.
                                    Keep your clinic’s revenue, expenses, and invoices organized—all in one place.
                                </p>
                                    <Link
                                        href={route('register')}
                                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition"
                                    >
                                        Get started
                                    </Link>
                                </div>

                                <div className="flex justify-center lg:justify-end">
                                <img
                                    src="/welcome.png" 
                                    alt="Financial tracker illustration"
                                    className="w-full max-w-md"
                                />
                                </div>

                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                           
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
