import Link from "next/link";
import dynamic from "next/dynamic";
import { FetchMe, FetchMeNotification } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/config/contextapi/user";
import { UserLogout } from "@/config/Axiosconfig/AxiosHandle/auth";
import NotificationDropdown from "@/Component/Notificationdrowpdown";
const MessengerOffcanvas = dynamic(() => import("../messenger-offcanvas"))

const messages = [
    { id: 1, text: "Hi there!", sent: false, time: "10:30 AM" },
    { id: 2, text: "Hello! How can I help?", sent: true, time: "10:31 AM" },
]

function Header({ margin }) {
    const [token, setToken] = useState(false);
    const [userdata, setUserdata] = useState({});
    const [notification, setNotification] = useState([]);
    const [messenger, setMessenger] = useState(false);
    const router = useRouter();
    const { fetchUserData, user } = useContext(UserContext);

    const fecthMeData = async () => {
        try {
            const cookies = document.cookie.split(";");
            let isLoggedIn = false;
            cookies.forEach((cookie) => {
                const [name, value] = cookie.split("=");
                if (name.trim() === "is_logged_in" && value.trim() === "true") {
                    isLoggedIn = true;
                }
            });
            if (isLoggedIn) {
                const response = await FetchMe();
                if (response) {
                    setUserdata({ ...response.data.user });
                    fetchUserData();
                    setToken(true);
                }
            } else {
                setToken(false);
            }
        } catch (error) {
            console.log(error, "err");
            setToken(false);
        }
    };

    const FetchNotification = async () => {
        try {
            const cookies = document.cookie.split(";");
            let isLoggedIn = false;
            cookies.forEach((cookie) => {
                const [name, value] = cookie.split("=");
                if (name.trim() === "is_logged_in" && value.trim() === "true") {
                    isLoggedIn = true;
                }
            });
            if (isLoggedIn) {
                const response = await FetchMeNotification();
                if (response) {
                    setNotification(response.data.notifications_data[0]?.notifications);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await UserLogout();
            if (response) {
                console.log(response);
                router.push("/login");
            }
        } catch (error) {
            console.log(error, "errs");
        }
    };

    useEffect(() => {
        FetchNotification();
        fecthMeData();
    }, []);

    const handleFaverioteCLick = () => {
        router.push("favourite");
    };

    return <>
        <MessengerOffcanvas show={messenger} setShow={setMessenger} />
        <div className={`sticky top-5 z-50 w-full h-[58px] ${margin || "mb-4"} px-5 flex justify-between items-center bg-white/50 backdrop-blur rounded-[2rem]`}>
            <Link href="/" className="font-extrabold lg:text-2xl text-slate-800">hobbyland</Link>
            <div className="flex items-center gap-3">
                {token ? <>
                    <button onClick={() => setMessenger(true)} className=" relative px-3 py-1 bg-white text-slate-900 rounded-3xl border border-gray-300">
                        <Icon icon="mynaui:send-solid" className=" text-2xl" />
                        <div className="absolute right-0 top-full scale-0 group-focus-within:scale-100 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-slate-200 z-50 transform origin-top-right transition-all duration-200 ease-out overflow-hidden">
                            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100">
                                <h3 className="font-semibold text-slate-800">Messages</h3>
                                <button className="text-slate-500 hover:text-slate-700 text-xl">
                                    <Icon icon="proicons:expand" />
                                </button>
                            </div>

                            <div className="h-96 flex flex-col">
                                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] p-3 rounded-lg ${message.sent
                                                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
                                                : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800'
                                                }`}>
                                                <p>{message.text}</p>
                                                <span className="text-xs mt-1 block opacity-70">{message.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t border-slate-200 bg-slate-50">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            // value={messageInput}
                                            // onChange={(e) => setMessageInput(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                        />
                                        <button className="p-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-md hover:from-slate-800 hover:to-slate-900 transition-all">
                                            <Icon icon="lets-icons:send-hor-fill" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>

                    <div className="group relative px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center gap-3 cursor-pointer" tabIndex={2}>
                        <button onClick={() => router.push("addtocard")} className="text-slate-900 text-xl">
                            <Icon icon="mynaui:cart-solid" />
                        </button>
                        <button onClick={handleFaverioteCLick} className="text-slate-900 text-xl">
                            <Icon icon="stash:save-ribbon-duotone" />
                        </button>
                        <NotificationDropdown iconColor="white" />
                    </div>

                    <div className="group relative px-2 py-1 bg-white border border-gray-300 rounded-full flex items-center cursor-pointer" tabIndex={3}>
                        {userdata?.profile_image ? <span className="inline-block w-9 aspect-square mr-3 border border-gray-400 rounded-full overflow-hidden">
                            <Image src={userdata?.profile_image?.includes("googleuser") ? userdata.profile_image : process.env.NEXT_PUBLIC_BASE_IMG_URL + userdata?.image || process.env.NEXT_PUBLIC_DEFAULT_PFP} className="w-full h-full object-cover" alt="user avatar" width={80} height={80} />
                        </span> : <span className="w-9 aspect-square mr-3 flex justify-center items-center text-gray-100 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full overflow-hidden">
                            {userdata && userdata.firstname ? userdata?.firstname?.charAt(0) : ""}
                        </span>}
                        <span className="text-sm mr-2">{userdata?.firstname || userdata?.username}</span>
                        <Icon icon="solar:alt-arrow-down-broken" />
                        <aside className=" !absolute -bottom-1 w-[150px] p-5 bg-white card_boxshadow flex flex-col transition-all space-y-8 origin-top-right scale-0 group-focus-within:scale-100 duration-300 translate-y-full translate-x-[-25%] rounded-[15px]">
                            <div className="flex flex-col gap-3 text-sm" >
                                <Link href="/profile/myprofile">My Profile</Link>
                                <Link href="/user">Settings</Link>
                                <button onClick={handleLogout} className="text-left">Log out</button>
                            </div>
                        </aside>
                    </div>

                </> : <>
                    <Link href="/login" className="px-4 py-1 rounded-3xl border text-sm">
                        login
                    </Link>
                    <Link href="/signup" className="px-4 py-1 rounded-3xl bg-gray-200 text-sm">
                        signup
                    </Link>
                </>}
                {/* <button className="px-3 py-2 rounded-3xl bg-gray-200 text-lg text-cyan-800">
                    <Icon icon="mingcute:ai-fill" />
                </button> */}
            </div>
        </div>
    </>
}

export default Header;