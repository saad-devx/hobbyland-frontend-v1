import User from "."
export default function Profile() {
    return <User title="Profile">
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
    </User>
}
