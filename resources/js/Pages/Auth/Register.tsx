import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { courses } from '@/lib/data';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_number: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        user_type: '',
        email: '',
        course: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="student_number" value="Student Number" />

                    <TextInput
                        id="student_number"
                        name="student_number"
                        value={data.student_number}
                        className="mt-1 block w-full"
                        autoComplete="student_number"
                        isFocused={true}
                        onChange={(e) => setData('student_number', e.target.value)}
                        required
                    />

                    <InputError message={errors.student_number} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="middle_name" value="Middle Name" />

                    <TextInput
                        id="middle_name"
                        type="text"
                        name="middle_name"
                        value={data.middle_name}
                        className="mt-1 block w-full"
                        autoComplete="middle_name"
                        onChange={(e) => setData('middle_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.middle_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="course" value="Course" />
                    <select
                        id="course"
                        name="course"
                        value={data.course}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                        onChange={(e) => setData('course', e.target.value)}
                        required
                    >
                        <option selected hidden>-- Select Course --</option>
                        {courses.map((course) => (
                            <option value={course.value}>{course.label}</option>
                        ))}
                    </select>

                    <InputError message={errors.course} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="user_type" value="User Type" />

                    {/* <TextInput
                        id="user_type"
                        type="text"
                        name="user_type"
                        value={data.user_type}
                        className="mt-1 block w-full"
                        autoComplete="user_type"
                        onChange={(e) => setData('user_type', e.target.value)}
                        required
                    /> */}
                    <select
                        id="user_type"
                        name="user_type"
                        value={data.user_type}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                        onChange={(e) => setData('user_type', e.target.value)}
                        required
                    >
                        <option selected hidden>-- Select Type --</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>

                    <InputError message={errors.user_type} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
                <div className='text-center mt-10'>
                    Already have an account? 
                    <Link className="ms-2 underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href='/login'>
                        Sign In
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
