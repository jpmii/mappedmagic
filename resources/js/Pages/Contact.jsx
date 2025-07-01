import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Contact({ errors, success }) {
    const { data, setData, post, processing, reset, errors: formErrors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => reset('message'),
        });
    };

    return (
        <GuestLayout header={<h2 className="text-xl font-semibold leading-tight text-magicwhite">Contact Us</h2>}>
            <Head title="Contact" />
            <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
                {success && (
                    <div className="mb-4 text-green-600 font-semibold">{success}</div>
                )}
                {formErrors.message && (
                    <div className="mb-4 text-red-600 font-semibold">{formErrors.message}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={e => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={formErrors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={e => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={formErrors.email} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="message" value="Message" />
                        <textarea
                            id="message"
                            name="message"
                            value={data.message}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                            onChange={e => setData('message', e.target.value)}
                            required
                            rows={6}
                        />
                        <InputError message={formErrors.message} className="mt-2" />
                    </div>
                    <PrimaryButton className="w-full" disabled={processing}>
                        Send Message
                    </PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
} 