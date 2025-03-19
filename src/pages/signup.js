import { useState } from 'react';
import moment from "moment-timezone";
import { CreateAcount } from "@/config/Axiosconfig/AxiosHandle/auth";
import { Icon } from "@iconify/react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRouter } from 'next/router';
const libraries = ["places"];

const SignupPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptPolicies, setAcceptPolicies] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({});
    const [autocomplete, setAutocomplete] = useState(null);

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        timezone: moment.tz.guess(),
        longitude: '',
        latitude: '',
        location: '',
        blocked: false,
        account_type: '',
        accept_policies: false,
        register_provider: 'hobbyland',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setSignupData(prev => ({ ...prev, account_type: selectedRole }));
        setError('');
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyA1lurRRYuP5JyVNVNsjHvNgDiq7TBtNhU",
        libraries,
    });

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();

            // Extracting latitude and longitude
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();

            setSignupData((prev) => ({
                ...prev,
                location: place.formatted_address || "",
                latitude: lat || "",
                longitude: lng || "",
            }));
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!signupData.username) {
            newErrors.username = 'Username is required';
        } else if (signupData.username.length < 4) {
            newErrors.username = 'Username should be at least 4 characters long';
        } else if (signupData.username.length > 30) {
            newErrors.username = 'Username should be less than 30 characters';
        }

        if (!signupData.email) newErrors.email = 'Email is required';
        if (!signupData.password) {
            newErrors.password = 'Password is required';
        } else if (signupData.password.length < 8) newErrors.password = 'Password should be at least 8 characters long';
        if (!signupData.firstname) newErrors.firstname = 'First name is required';
        if (!signupData.lastname) newErrors.lastname = 'Last name is required';
        if (!acceptPolicies) newErrors.accept_policies = 'You must accept the policies';
        return newErrors;
    };

    const handleNext = () => {
        if (!role) {
            setError('Please select a role to continue');
            return;
        }
        setStep(2);
        setError('');
    };

    const handleBack = () => {
        setStep(1);
        setError('');
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await CreateAcount({
                ...signupData,
                accept_policies: acceptPolicies
            });

            if (response) {
                setSuccess(response.data.msg);
                setError('');
                setTimeout(() => {
                    router.push('./otp');
                }, 1000);
            }
        } catch (err) {
            setError(err.response ? err.response.data.msg : err.message);
            setSuccess('');
        }
    };

    return (
        <main className="relative w-full h-screen bg-gray-100 p-5 flex items-center gap-[5%]">
            <section className="w-[45%] h-full px-4 flex flex-col justify-between">
                <div className="w-full flex justify-between items-center">
                    <span className="text-xl font-light text-slate-800">002</span>
                    <Icon icon="arcticons:dots" className="text-3xl text-black animate-spin" style={{ animationDuration: "5s" }} />
                </div>

                {error && (
                    <div className="w-full p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-2 rounded-r-lg">
                        <Icon name="AlertCircle" className="text-2xl text-red-500" />
                        <p className="text-red-800">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="w-full p-4 bg-green-50 border-l-4 border-green-500 flex items-center gap-2 rounded-r-lg">
                        <Icon name="CheckCircle" className="text-2xl text-green-500" />
                        <p className="text-green-800">{success}</p>
                    </div>
                )}

                <div className="w-full flex flex-col space-y-6">
                    <h2 className="text-2xl font-bold text-center">Choose your role</h2>

                    <button
                        onClick={() => handleRoleSelect('student')}
                        className={`w-full p-6 rounded-xl border-2 transition-all ${role === 'student'
                            ? 'border-slate-800 bg-slate-50'
                            : 'border-slate-200 hover:border-slate-300'
                            }`}>
                        <h3 className="text-lg font-semibold">Join as Student</h3>
                        <p className="text-slate-600 text-sm">
                            Learn new skills and connect with mentors
                        </p>
                    </button>

                    <button
                        onClick={() => handleRoleSelect('mentor')}
                        className={`w-full p-6 rounded-xl border-2 transition-all ${role === 'mentor'
                            ? 'border-slate-800 bg-slate-50'
                            : 'border-slate-200 hover:border-slate-300'
                            }`}>
                        <h3 className="text-lg font-semibold">Join as Mentor</h3>
                        <p className="text-slate-600 text-sm">
                            Share your knowledge and help others grow
                        </p>
                    </button>

                    <button onClick={handleNext} className="w-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white py-3 rounded-3xl hover:bg-slate-700 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                        Next Step
                        <Icon icon="lucide:chevron-right" className="w-5 h-5" />
                    </button>
                </div>
                <div className="w-full flex justify-between items-center">
                    <Icon icon="ph:dots-six" className="text-4xl" />
                    <span className="text-xl font-light text-slate-800">002</span>
                </div>
            </section>

            <section className="w-[55%] h-full px-4 flex flex-col justify-between">
                <div className="w-full flex justify-between items-center">
                    <span className="text-xl font-light text-slate-800">002</span>
                    <Icon icon="arcticons:dots" className="text-3xl text-black animate-spin" style={{ animationDuration: "5s" }} />
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="firstname"
                                value={signupData.firstname}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${errors.firstname ? 'border-red-500' : 'border-slate-400'} text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all`}
                            />
                            {errors.firstname && <p className="mt-1 text-sm text-red-500">{errors.firstname}</p>}
                        </div>
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="lastname"
                                value={signupData.lastname}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${errors.lastname ? 'border-red-500' : 'border-slate-400'} text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all`}
                            />
                            {errors.lastname && <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>}
                        </div>
                    </div>

                    <input
                        type="text"
                        name="username"
                        value={signupData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${errors.username ? 'border-red-500' : 'border-slate-400'
                            } text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all`}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}

                    <input
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-slate-400'} text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}

                    <div>
                        {isLoaded ? (
                            <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={onPlaceChanged}>
                                <input
                                    className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${errors.location ? 'border-red-500' : 'border-slate-400'} text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all`}
                                    placeholder="location"
                                    value={signupData.location}
                                    name="location"
                                    onChange={(e) => {
                                        setSignupData((prev) => ({
                                            ...prev,
                                            location: e.target.value,
                                        }));
                                    }}
                                />
                            </Autocomplete>
                        ) : null}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={signupData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-slate-400'
                                } text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? (
                                <Icon icon="lucide:eye-off" className="w-5 h-5" />
                            ) : (
                                <Icon icon="lucide:eye" className="w-5 h-5" />
                            )}
                        </button>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="acceptPolicies"
                            checked={acceptPolicies}
                            onChange={(e) => setAcceptPolicies(e.target.checked)}
                            className="rounded border-slate-300"
                        />
                        <label htmlFor="acceptPolicies" className="text-sm text-slate-600">
                            I accept the Terms and Privacy Policy
                        </label>
                    </div>
                    {errors.accept_policies && <p className="mt-1 text-sm text-red-500">{errors.accept_policies}</p>}

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-1/3 bg-slate-200 text-slate-800 py-3 rounded-3xl hover:bg-slate-300 transition-colors flex items-center justify-center gap-2">
                            <Icon icon="lucide:chevron-left" className="w-5 h-5" />
                            Back
                        </button>

                        <button type="submit" className="w-2/3 bg-gradient-to-tr from-slate-950 to-slate-700 text-white py-3 rounded-3xl hover:bg-slate-700 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="w-full flex justify-between items-center">
                    <Icon icon="ph:dots-six" className="text-4xl" />
                    <span className="text-xl font-light text-slate-800">002</span>
                </div>
            </section>

            <aide className={`absolute top-1/2 -translate-y-1/2 h-[50vh] ${step == 1 ? "w-[55%] right-5" : "w-[45%] right-[calc(55%-1.25rem)]"} md:h-[calc(100vh-1.6rem)] rounded-3xl overflow-hidden transition-all duration-500`}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/videos/login-bg.mp4"
                    className="w-full h-full object-cover">
                    <source src="/videos/login-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/10">
                    <p className="text-white font-bold text-5xl text-center">Join the <br /> hobbyland</p>
                </div>
            </aide>
        </main>
    );
};

export default SignupPage;