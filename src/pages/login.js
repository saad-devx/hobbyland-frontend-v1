import { useState } from "react";
import { useRouter } from "next/router";
import { Login } from "@/config/Axiosconfig/AxiosHandle/auth";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Index() {
    const router = useRouter();
    const { email: queryEmail } = router.query;
    const [inputType, setInputType] = useState(true);
    const [data, setData] = useState({
        password: "",
        email: queryEmail || "",
        register_provider: "hobbyland",
    });
    const [error, setError] = useState("");
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const handlePasswordChange = (e) => {
        setData({ ...data, password: e.target.value });
        if (error) setError("");
    };

    const handleEmailChange = (e) => {
        setData({ ...data, email: e.target.value });
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();
        if (!(data.password.length >= 8)) {
            setError("Please enter your password with at least 8 characters.");
            return;
        }

        try {
            const response = await Login(data);
            if (response) {
                setSuccess(response.data.msg);
                if (response.data.verify_totp) {
                    router.push("./authentication-2fa");
                } else {
                    router.push("./StudentHome");
                }
                setErrors("");

                const cookies = document.cookie.split(";");
                let isLoggedIn = false;
                cookies.forEach((cookie) => {
                    const [name, value] = cookie.split("=");
                    if (name.trim() === "is_logged_in" && value.trim() === "true") {
                        isLoggedIn = true;
                    }
                });

                if (isLoggedIn) {
                    localStorage.setItem("is_logged_in", true);
                } else {
                    localStorage.removeItem("is_logged_in");
                }
            }
        } catch (error) {
            setErrors(error.response ? error.response.data.msg : error.message);
            setSuccess("");
        }
    };

    return (
        <main className="h-screen bg-gray-100 p-5 flex items-center">
            <div className="relative w-full md:w-[45%] h-[50vh] md:h-full rounded-3xl overflow-hidden">
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
                    <p className="text-white font-bold text-5xl text-center">Sign in to <br /> hobbyland</p>
                </div>
            </div>

            <div className="w-full md:w-[55%] h-[50vh] md:h-full px-[5%] flex flex-col justify-between items-center">
                <div className="w-full flex justify-between items-center">
                    <Icon icon="ph:dots-six" className="text-4xl" />
                    <span className="text-xl font-light text-slate-800">001</span>
                </div>

                <form onSubmit={handleLoginClick} className="w-full space-y-4">
                    {errors && <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-2 rounded-r-lg">
                        <Icon icon="carbon:warning-filled" className="text-2xl text-red-500" />
                        <p className="text-red-800">{errors}</p>
                    </div>}

                    {success && <div className="p-4 bg-green-50 border-l-4 border-green-500 flex items-center gap-2 rounded-r-lg">
                        <Icon icon="ep:success-filled" className="text-2xl text-green-500" />
                        <p className="text-green-800">{success}</p>
                    </div>}

                    <div className="group">
                        <label className="block text-sm font-medium text-gray-700 opacity-0 group-focus-within:opacity-100 transition-all">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            className="w-full py-2 px-0 bg-transparent border-0 border-b-2 border-slate-400 text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all"
                        />
                    </div>

                    <div className="group relative">
                        <label className="block text-sm font-medium text-gray-700 opacity-0 group-focus-within:opacity-100 transition-all">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={inputType ? "password" : "text"}
                                name="password"
                                value={data.password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b-2 ${error ? 'border-red-500' : 'border-slate-400'} text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:border-slate-800 outline-none transition-all pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setInputType(!inputType)}
                                className="absolute right-0 top-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <Icon icon={inputType ? "ep:hide" : "icon-park-outline:eyes"} fontSize={20} />
                            </button>
                        </div>
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-slate-700" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <Link href="/ForgetPassword" className="text-sm text-slate-700 hover:text-slate-500">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white py-3 rounded-3xl hover:bg-slate-700 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                        Sign In
                        <Icon icon="tabler:chevron-right" />
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?&nbsp;
                        <Link href="/SIgnupDetail" className="text-slate-600 hover:text-slate-500">Sign up</Link>
                    </p>
                </form>

                <div className="w-full flex justify-between items-center">
                    <span className="text-xl font-light text-slate-800">001</span>
                    <Icon icon="arcticons:dots" className="text-3xl text-black animate-spin" style={{ animationDuration: "5s" }} />
                </div>
            </div>
        </main>
    );
}