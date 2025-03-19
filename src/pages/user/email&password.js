import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import User from '.';
import { changepasswordotp } from '@/config/Axiosconfig/AxiosHandle/auth';
import { UpdateUserProfile } from '@/config/Axiosconfig/AxiosHandle/user';

export default function SecuritySettings() {
    const [activeTab, setActiveTab] = useState('password'); // 'password' or 'email'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const passwordValidationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Current password is required')
            .min(8, 'Password must be at least 8 characters'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            )
            .notOneOf([Yup.ref('oldPassword')], 'New password must be different from current password'),
        confirmPassword: Yup.string()
            .required('Please confirm your new password')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
        otp: Yup.string()
            .when('$showOtpInput', {
                is: true,
                then: Yup.string()
                    .required('OTP is required')
                    .matches(/^\d+$/, 'OTP must contain only numbers')
                    .length(6, 'OTP must be exactly 6 digits'),
                otherwise: Yup.string()
            })
    });

    const emailValidationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Please enter a valid email address'),
        otp: Yup.string()
            .when('$showOtpInput', {
                is: true,
                then: Yup.string()
                    .required('OTP is required')
                    .matches(/^\d+$/, 'OTP must contain only numbers')
                    .length(6, 'OTP must be exactly 6 digits'),
                otherwise: Yup.string()
            })
    });

    const passwordFormik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            otp: ''
        },
        validationSchema: passwordValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setFeedbackMessage({ type: '', message: '' });

            try {
                const response = await changepasswordotp({
                    old_password: values.oldPassword,
                    new_password: values.newPassword,
                    ...(showOtpInput && { otp: values.otp })
                });

                if (response.data.success) {
                    if (!showOtpInput) {
                        setShowOtpInput(true);
                        setFeedbackMessage({
                            type: 'success',
                            message: 'Please enter the OTP sent to your email to complete password change.'
                        });
                    } else {
                        setFeedbackMessage({
                            type: 'success',
                            message: 'Password changed successfully! Please log in with your new password.'
                        });
                        passwordFormik.resetForm();
                        setShowOtpInput(false);
                    }
                }
            } catch (error) {
                setFeedbackMessage({
                    type: 'error',
                    message: error.response?.data?.msg || 'Failed to change password'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const emailFormik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },
        validationSchema: emailValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setFeedbackMessage({ type: '', message: '' });

            try {
                if (!showOtpInput) {
                    const response = await UpdateUserProfile({
                        email: values.email
                    });

                    if (response.data.success) {
                        setShowOtpInput(true);
                        setFeedbackMessage({
                            type: 'success',
                            message: 'Please enter the OTP sent to your new email address to verify.'
                        });
                    }
                } else {
                    const response = await UpdateUserProfile({
                        email: values.email,
                        otp: values.otp
                    });

                    if (response.data.success) {
                        setFeedbackMessage({
                            type: 'success',
                            message: 'Email updated successfully!'
                        });
                        emailFormik.resetForm();
                        setShowOtpInput(false);
                    }
                }
            } catch (error) {
                setFeedbackMessage({
                    type: 'error',
                    message: error.response?.data?.message || 'Failed to update email'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const InputField = ({ name, placeholder, type = 'text', formik, showToggle = false }) => (
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
                {showToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, [name]: !prev[name] }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 
                            hover:text-slate-600 focus:outline-none"
                    >
                        {showPassword[name] ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {formik.touched[name] && formik.errors[name] && (
                <p className="mt-2 text-sm text-red-500">{formik.errors[name]}</p>
            )}
        </div>
    );

    const resetForms = () => {
        setShowOtpInput(false);
        setFeedbackMessage({ type: '', message: '' });
        passwordFormik.resetForm();
        emailFormik.resetForm();
    };

    return (
        <User title="Security Settings">
            <div className="max-w-2xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex space-x-4 mb-8">
                        <button
                            onClick={() => {
                                setActiveTab('password');
                                resetForms();
                            }}
                            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'password'
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            Change Password
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('email');
                                resetForms();
                            }}
                            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'email'
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            Update Email
                        </button>
                    </div>

                    {feedbackMessage.message && (
                        <div className={`mb-6 p-4 rounded-lg ${feedbackMessage.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {feedbackMessage.message}
                        </div>
                    )}

                    {activeTab === 'password' ? (
                        <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
                            {!showOtpInput ? (
                                <>
                                    <InputField
                                        name="oldPassword"
                                        placeholder="Current Password"
                                        type={showPassword.old ? 'text' : 'password'}
                                        formik={passwordFormik}
                                        showToggle={true}
                                    />
                                    <InputField
                                        name="newPassword"
                                        placeholder="New Password"
                                        type={showPassword.new ? 'text' : 'password'}
                                        formik={passwordFormik}
                                        showToggle={true}
                                    />
                                    <InputField
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        type={showPassword.confirm ? 'text' : 'password'}
                                        formik={passwordFormik}
                                        showToggle={true}
                                    />
                                </>
                            ) : (
                                <InputField
                                    name="otp"
                                    placeholder="Enter 6-digit OTP"
                                    type="text"
                                    formik={passwordFormik}
                                />
                            )}

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
                                        <span>{showOtpInput ? 'Verifying...' : 'Sending OTP...'}</span>
                                    </>
                                ) : (
                                    <span>{showOtpInput ? 'Verify OTP' : 'Change Password'}</span>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={emailFormik.handleSubmit} className="space-y-6">
                            {!showOtpInput ? (
                                <InputField
                                    name="email"
                                    placeholder="New Email Address"
                                    type="email"
                                    formik={emailFormik}
                                />
                            ) : (
                                <div className="space-y-6">
                                    <div className="text-slate-600">
                                        An OTP has been sent to {emailFormik.values.email}
                                    </div>
                                    <InputField
                                        name="otp"
                                        placeholder="Enter 6-digit OTP"
                                        type="text"
                                        formik={emailFormik}
                                    />
                                </div>
                            )}

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
                                        <span>{showOtpInput ? 'Verifying...' : 'Updating...'}</span>
                                    </>
                                ) : (
                                    <span>{showOtpInput ? 'Verify OTP' : 'Update Email'}</span>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </User>
    );
}