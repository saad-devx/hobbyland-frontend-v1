import React, { useState, useRef, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { FetchMeNotification, UpdateNotificationCategory } from '@/config/Axiosconfig/AxiosHandle/user';
import { useSocket } from '@/config/contextapi/socket';

const NotificationDropdown = (props) => {
    const [expanded, setExpanded] = useState({});
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [tab, setTab] = useState("account");
    const [refresh, setRefresh] = useState("");

    const toggleExpand = (index) => {
        setExpanded(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const isTruncated = (text) => text.length > 60;

    const handleDropdownToggle = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

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
                    setNotifications(response.data.notifications_data[0]?.notifications);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    const UpdateCategrios = async () => {
        try {
            const response = await UpdateNotificationCategory(tab)
            if (response) {
                console.log(response, "update categrios")
            }
        } catch (e) {
            console.log(tab, "tab")
            console.log(e, "update categrios")

        }
    }
    useEffect(() => {
        FetchNotification();
    }, [refresh]);
    console.log(notifications)
    const filteredNotifications = notifications?.filter(notif => notif.category === tab);
    console.log(filteredNotifications, "filter")

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button
                type="button"
                className='text-slate-900 text-xl'
                onClick={handleDropdownToggle}
                aria-expanded={isDropdownOpen}
            >
                <Icon icon="ion:notifications" />
            </button>
            {isDropdownOpen && (
                <>
                    <div className="dropdown-menu-wrapper" >
                        <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                            <div className='top_fixed'>
                                <div onClick={() => setTab("account")} className={`${tab === 'account' ? "ineerbutton_active" : "ineerbutton"}`}>
                                    Account
                                </div>
                                <div onClick={() => setTab("primary")} className={`${tab === 'primary' ? "ineerbutton_active" : "ineerbutton"}`}>
                                    Primary
                                </div>
                            </div>

                            <div className='w-100 d-flex justify-content-end p-2 align-items-center gap-3' style={{ height: "45px", backgroundColor: "white" }}>
                                <button onClick={() => setRefresh(!refresh)} className='button-outline d-flex align-items-center '>
                                    <div>
                                        <Icon icon="dashicons:yes" fontSize="16px" />
                                    </div>
                                    <div onClick={UpdateCategrios} style={{ fontSize: "16px" }}>
                                        Mark All as read
                                    </div>
                                </button>
                                <button onClick={FetchNotification} className='button-outline d-flex align-items-center '>
                                    <div>
                                        <Icon icon="material-symbols:refresh" fontSize="16px" />
                                    </div>
                                    <div style={{ fontSize: "16px" }}>
                                        Refresh
                                    </div>
                                </button>
                            </div>

                            <div className="notifications-content">
                                {filteredNotifications?.length > 0 ? (
                                    filteredNotifications?.map((notif, index) => (
                                        <div key={index} className={`notificationchips ${expanded[index] ? 'expanded' : ''}`}>
                                            <div>
                                                <div className='fw-bold'>{notif.mini_msg}</div>
                                                <div className='description_dsc'>
                                                    {expanded[index] ? notif.message : notif.message.slice(0, 60)}
                                                    {isTruncated(notif.message) && !expanded[index] && '...'}
                                                </div>
                                                {isTruncated(notif.message) && (
                                                    <div className='seemorebutton' onClick={() => toggleExpand(index)}>
                                                        {expanded[index] ? 'Show Less' : 'See More..'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <li className="dropdown-item w-100 text-center">No notifications</li>
                                )}
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default NotificationDropdown;