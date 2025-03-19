import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FetchMe, UpdateUserProfile } from '@/config/Axiosconfig/AxiosHandle/user';
import User from '.';
import { Loader2, Link as LinkIcon } from 'lucide-react';

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const res = await FetchMe();
                setCurrentUser(res.data.user);
            } catch (error) {
                console.log('User not logged In');
            }
        };
        fetchLoggedInUser();
    }, []);

    const validationSchema = Yup.object({
        firstname: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .max(30, 'First name cannot exceed 30 characters'),
        lastname: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .max(30, 'Last name cannot exceed 30 characters'),
        username: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .max(30, 'Username cannot exceed 30 characters'),
        location: Yup.string(),
        latitude: Yup.number()
            .nullable()
            .typeError('Latitude must be a number'),
        longitude: Yup.number()
            .nullable()
            .typeError('Longitude must be a number'),
        gender: Yup.string()
            .oneOf(['male', 'female', 'other'], 'Please select a valid gender'),
        account_type: Yup.string()
            .oneOf(['student', 'mentor'], 'Please select a valid account type'),
        phone_number: Yup.object().shape({
            prefix: Yup.string(),
            suffix: Yup.string()
                .matches(/^\d+$/, 'Phone number must contain only digits')
        }),
        social_links: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Platform name is required'),
                link: Yup.string().url('Must be a valid URL').required('URL is required')
            })
        )
    });

    const formik = useFormik({
        initialValues: {
            firstname: currentUser?.firstname || '',
            lastname: currentUser?.lastname || '',
            username: currentUser?.username || '',
            location: currentUser?.location || '',
            latitude: currentUser?.latitude || '',
            longitude: currentUser?.longitude || '',
            gender: currentUser?.gender || '',
            account_type: currentUser?.account_type || 'student',
            phone_number: {
                prefix: currentUser?.phone_number?.prefix || '',
                suffix: currentUser?.phone_number?.suffix || ''
            },
            social_links: currentUser?.social_links || []
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setFeedbackMessage({ type: '', message: '' });

            try {
                const response = await UpdateUserProfile(values);
                setCurrentUser(response.data.user);
                setFeedbackMessage({
                    type: 'success',
                    message: 'Profile updated successfully!'
                });
            } catch (error) {
                setFeedbackMessage({
                    type: 'error',
                    message: error.response?.data?.message || 'Failed to update profile'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const InputField = ({ name, placeholder, type = 'text' }) => (
        <div className="relative">
            <div className="relative group">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    {...formik.getFieldProps(name)}
                    className={`w-full py-3 px-4 bg-white border rounded-lg
                        ${formik.touched[name] && formik.errors[name]
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-200 focus:border-slate-800'} 
                        text-slate-900 placeholder:text-slate-400 
                        focus:outline-none focus:ring-2 focus:ring-slate-200 
                        transition-all duration-200`}
                />
            </div>
            {formik.touched[name] && formik.errors[name] && (
                <p className="mt-2 text-sm text-red-500">{formik.errors[name]}</p>
            )}
        </div>
    );

    const addSocialLink = () => {
        const newSocialLinks = [...formik.values.social_links, { name: '', link: '' }];
        formik.setFieldValue('social_links', newSocialLinks);
    };

    const removeSocialLink = (index) => {
        const newSocialLinks = formik.values.social_links.filter((_, i) => i !== index);
        formik.setFieldValue('social_links', newSocialLinks);
    };

    return (
        <User title="Profile">
            <div className="max-w-2xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Update Profile</h2>

                    {feedbackMessage.message && (
                        <div className={`mb-6 p-4 rounded-lg ${feedbackMessage.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {feedbackMessage.message}
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                name="firstname"
                                placeholder="First Name"
                            />
                            <InputField
                                name="lastname"
                                placeholder="Last Name"
                            />
                        </div>

                        <InputField
                            name="username"
                            placeholder="Username"
                        />

                        <InputField
                            name="location"
                            placeholder="Location"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                name="latitude"
                                placeholder="Latitude"
                                type="number"
                            />
                            <InputField
                                name="longitude"
                                placeholder="Longitude"
                                type="number"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Phone Prefix"
                                    {...formik.getFieldProps('phone_number.prefix')}
                                    className="w-full py-3 px-4 bg-white border rounded-lg border-slate-200 focus:border-slate-800"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    {...formik.getFieldProps('phone_number.suffix')}
                                    className="w-full py-3 px-4 bg-white border rounded-lg border-slate-200 focus:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <select
                                    name="gender"
                                    {...formik.getFieldProps('gender')}
                                    className="w-full py-3 px-4 bg-white border rounded-lg appearance-none border-slate-200 focus:border-slate-800"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="relative">
                                <select
                                    name="account_type"
                                    {...formik.getFieldProps('account_type')}
                                    className="w-full py-3 px-4 bg-white border rounded-lg appearance-none border-slate-200 focus:border-slate-800"
                                >
                                    <option value="student">Student</option>
                                    <option value="mentor">Mentor</option>
                                </select>
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Social Links</h3>
                                <button
                                    type="button"
                                    onClick={addSocialLink}
                                    className="text-slate-600 hover:text-slate-900"
                                >
                                    + Add Link
                                </button>
                            </div>

                            {formik.values.social_links.map((link, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Platform Name"
                                            {...formik.getFieldProps(`social_links.${index}.name`)}
                                            className="w-full py-3 px-4 bg-white border rounded-lg border-slate-200 focus:border-slate-800"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="url"
                                            placeholder="Profile URL"
                                            {...formik.getFieldProps(`social_links.${index}.link`)}
                                            className="w-full py-3 px-4 bg-white border rounded-lg border-slate-200 focus:border-slate-800"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeSocialLink(index)}
                                        className="text-red-500 hover:text-red-700 mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg
                                    hover:bg-slate-800 focus:ring-4 focus:ring-slate-300
                                    transition-all duration-200 flex items-center justify-center
                                    space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <span>Update Profile</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </User>
    );
}