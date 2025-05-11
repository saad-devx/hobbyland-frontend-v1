import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import { User as UserIcon, LogOut, LogoutIcon, ChevronRight, KeyRound, Fingerprint, Bolt, Camera as CameraIcon, Gift as GiftBoxIcon, Diamond as DiamondIcon, HelpCircle as HelpCenterIcon, Heart as HeartShopListIcon, Package as PackageBagIcon, Mail as EmailIcon, Shield as SecurityIcon, Star as ReviewsIcon, Truck as TrackOrderIcon, ShoppingBag as OrderListIcon, Settings as ProcessIcon, CreditCard as UfPointsIcon } from 'lucide-react';
import { FetchMe } from '@/config/Axiosconfig/AxiosHandle/user';
import { UserLogout } from '@/config/Axiosconfig/AxiosHandle/auth';

export const Option = (props) => {
    const router = useRouter()
    const route = router.pathname
    if (window.matchMedia('(min-width: 1024px)').matches) return <Link href={props.href} className={`w-full py-5 px-4 flex justify-between items-center border-b border-gray-200 ${route === props.href ? 'bg-gray-100' : 'bg-white'} transition-all overflow-hidden`}>
        <span className={`${route === props.href ? 'opacity-100' : 'opacity-70'} flex items-center gap-x-3`}>
            {props.icon}
            {props.children}
        </span>
        {route === props.href && <ChevronRight className='text-gray-600' size={18} />}
    </Link>
    else return <Link href={props.href} className={`${route === props.href ? 'active_bg text-white lg:text-black active' : 'bg-white text-black'} shadow-md flex justify-center lg:justify-between items-center px-4 py-1 mx-2 lg:m-0 lg:py-5 whitespace-nowrap lg:border-b lg:border-[#F5F5F5] rounded-full lg:rounded text-sm lg:text-base`}>
        {props.children}
    </Link>
}

export default function User({ title, loading, profileNull, children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const res = await FetchMe();
                setUser(res.data.user);
            }
            catch (error) {
                console.log('User not logged In');
            }
        }
        fetchLoggedInUser();
    }, []);

    const handleLogout = async () => {
        setLogout(!logout);
        await UserLogout();
        router.push('/');
    }

    if (window.matchMedia('(max-width: 760px)').matches) return <>
        <main className='bg-white w-full min-h-screen p-4 md:p-10 flex flex-col'>
            <section className="w-full flex flex-col">
                {user && user.email ? <>
                    <nav className="w-full py-5 flex justify-between items-center">
                        <div className="flex items-center gap-x-3">
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.2819 15.5591C13.2577 15.5591 13.2214 15.5591 13.1973 15.5591C13.161 15.5591 13.1126 15.5591 13.0763 15.5591C10.3312 15.4744 8.27539 13.334 8.27539 10.6977C8.27539 8.01304 10.4642 5.82422 13.1489 5.82422C15.8335 5.82422 18.0223 8.01304 18.0223 10.6977C18.0103 13.3461 15.9424 15.4744 13.3182 15.5591C13.294 15.5591 13.294 15.5591 13.2819 15.5591ZM13.1368 7.62607C11.4438 7.62607 10.0772 9.00466 10.0772 10.6856C10.0772 12.3423 11.3712 13.6847 13.0159 13.7451C13.0521 13.733 13.1731 13.733 13.294 13.7451C14.9145 13.6605 16.1842 12.3302 16.1963 10.6856C16.1963 9.00466 14.8298 7.62607 13.1368 7.62607Z" fill="#383838" />
                                <path d="M12.9984 26.9023C9.76795 26.9023 6.68162 25.5367 4.29182 23.0513C4.07566 22.8328 3.97958 22.5051 4.0036 22.191C4.15972 20.5659 5.04839 19.0501 6.52551 17.9303C10.1042 15.2264 15.9046 15.2264 19.4713 17.9303C20.9484 19.0637 21.8371 20.5659 21.9932 22.191C22.0292 22.5187 21.9211 22.8328 21.705 23.0513C19.3151 25.5367 16.2288 26.9023 12.9984 26.9023ZM5.88903 21.9179C7.88253 23.8161 10.3924 24.8539 12.9984 24.8539C15.6043 24.8539 18.1142 23.8161 20.1077 21.9179C19.8916 21.0848 19.3152 20.2791 18.4625 19.6236C15.5083 17.384 10.5005 17.384 7.52226 19.6236C6.66962 20.2791 6.10519 21.0848 5.88903 21.9179Z" fill="#383838" />
                                <path d="M13.1347 26.7069C5.96357 26.7069 0.134766 20.8781 0.134766 13.707C0.134766 6.53583 5.96357 0.707031 13.1347 0.707031C20.3058 0.707031 26.1346 6.53583 26.1346 13.707C26.1346 20.8781 20.3058 26.7069 13.1347 26.7069ZM13.1347 2.52097C6.96728 2.52097 1.94871 7.53955 1.94871 13.707C1.94871 19.8744 6.96728 24.8929 13.1347 24.8929C19.3021 24.8929 24.3207 19.8744 24.3207 13.707C24.3207 7.53955 19.3021 2.52097 13.1347 2.52097Z" fill="#383838" />
                            </svg>
                            <span className="flex flex-col">
                                <p className="font_urbanist_bold text-base">{user.firstname} {user.lastname}</p>
                            </span>
                        </div>
                        <button onClick={handleLogout}><LogoutIcon /></button>
                    </nav>
                    <nav className="w-full py-4 border rounded-md flex justify-center items-center font_urbanist text-xs gap-x-[25%]">
                        <span className="flex flex-col items-center gap-2">
                            <span className='font_urbanist_bold text-lg'>{0}</span>
                            {langObj.vouchers}
                        </span>
                        <span className="flex flex-col items-center gap-2">
                            <span className='font_urbanist_bold text-lg'>{points}</span>
                            {langObj.ufPoints}
                        </span>
                    </nav>
                </> :
                    <div className="py-7 flex items-center font_urbanist_bolc text-base gap-x-4">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2819 15.5591C13.2577 15.5591 13.2214 15.5591 13.1973 15.5591C13.161 15.5591 13.1126 15.5591 13.0763 15.5591C10.3312 15.4744 8.27539 13.334 8.27539 10.6977C8.27539 8.01304 10.4642 5.82422 13.1489 5.82422C15.8335 5.82422 18.0223 8.01304 18.0223 10.6977C18.0103 13.3461 15.9424 15.4744 13.3182 15.5591C13.294 15.5591 13.294 15.5591 13.2819 15.5591ZM13.1368 7.62607C11.4438 7.62607 10.0772 9.00466 10.0772 10.6856C10.0772 12.3423 11.3712 13.6847 13.0159 13.7451C13.0521 13.733 13.1731 13.733 13.294 13.7451C14.9145 13.6605 16.1842 12.3302 16.1963 10.6856C16.1963 9.00466 14.8298 7.62607 13.1368 7.62607Z" fill="#383838" />
                            <path d="M12.9984 26.9023C9.76795 26.9023 6.68162 25.5367 4.29182 23.0513C4.07566 22.8328 3.97958 22.5051 4.0036 22.191C4.15972 20.5659 5.04839 19.0501 6.52551 17.9303C10.1042 15.2264 15.9046 15.2264 19.4713 17.9303C20.9484 19.0637 21.8371 20.5659 21.9932 22.191C22.0292 22.5187 21.9211 22.8328 21.705 23.0513C19.3151 25.5367 16.2288 26.9023 12.9984 26.9023ZM5.88903 21.9179C7.88253 23.8161 10.3924 24.8539 12.9984 24.8539C15.6043 24.8539 18.1142 23.8161 20.1077 21.9179C19.8916 21.0848 19.3152 20.2791 18.4625 19.6236C15.5083 17.384 10.5005 17.384 7.52226 19.6236C6.66962 20.2791 6.10519 21.0848 5.88903 21.9179Z" fill="#383838" />
                            <path d="M13.1347 26.7069C5.96357 26.7069 0.134766 20.8781 0.134766 13.707C0.134766 6.53583 5.96357 0.707031 13.1347 0.707031C20.3058 0.707031 26.1346 6.53583 26.1346 13.707C26.1346 20.8781 20.3058 26.7069 13.1347 26.7069ZM13.1347 2.52097C6.96728 2.52097 1.94871 7.53955 1.94871 13.707C1.94871 19.8744 6.96728 24.8929 13.1347 24.8929C19.3021 24.8929 24.3207 19.8744 24.3207 13.707C24.3207 7.53955 19.3021 2.52097 13.1347 2.52097Z" fill="#383838" />
                        </svg>
                        <p> <Link href='/auth/login'>Sign In</Link> / <Link href='/auth/signup'>Register</Link></p>
                    </div>
                }
            </section>
            {user && user.email ? <><h2 className="mt-5 font_urbanist_bold text-base">{langObj.menu.item1}</h2>
                <div className="py-5 grid grid-cols-4 place-content-center border-b border-gray-50">
                    <Link href="/user/myaccount" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <svg width="18" height="18" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="user-solid 1" clip-path="url(#clip0_3451_580)"><path id="Vector" d="M13.1234 5.5C13.1234 7.90273 11.1762 9.85 8.77344 9.85C6.3707 9.85 4.42344 7.90273 4.42344 5.5C4.42344 3.09727 6.3707 1.15 8.77344 1.15C11.1762 1.15 13.1234 3.09727 13.1234 5.5ZM0.673437 19.3398C0.673437 15.8512 3.49961 13.025 6.98828 13.025H10.5586C14.0473 13.025 16.8734 15.8512 16.8734 19.3398C16.8734 19.6215 16.6449 19.85 16.3633 19.85H1.18359C0.901954 19.85 0.673437 19.6215 0.673437 19.3398Z" stroke="black" stroke-width="1.3" /></g>
                            <defs><clipPath id="clip0_3451_580"><rect width="17.5" height="20" fill="white" transform="translate(0.0234375 0.5)" /></clipPath></defs>
                        </svg>
                        {langObj.accountMenu.item1}
                    </Link>
                    <Link href="/products/category/wishlist" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <svg width="18" height="18" viewBox="0 0 24 21" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group">
                                <path id="Vector" d="M5.70654 0.532631C5.61255 0.54438 5.34821 0.597248 5.11912 0.650116C3.20413 1.09655 1.5711 2.37713 0.689969 4.12177C-0.255778 5.99564 -0.226407 8.42756 0.760459 10.3308C1.31851 11.4058 1.60634 11.7054 5.57731 15.4002C7.61566 17.2976 9.57764 19.1245 9.93597 19.4534C10.2884 19.7883 10.6996 20.1407 10.8406 20.2347C11.3986 20.5989 12.0624 20.5872 12.6381 20.2053C12.8026 20.0996 13.3841 19.5886 13.9304 19.0775C19.3641 14.0198 21.4847 12.0285 21.6903 11.7876C22.5949 10.7126 23.0942 9.71401 23.3409 8.46868C23.4701 7.81664 23.4701 6.50082 23.3409 5.84879C22.8768 3.52847 21.3495 1.71922 19.1467 0.890957C18.4536 0.632492 17.9954 0.54438 17.1612 0.509134C15.5811 0.444517 14.3592 0.808718 12.9847 1.76034C12.456 2.12454 12.2152 2.33014 11.9567 2.64147L11.7452 2.89406L11.3986 2.53573C10.447 1.56649 9.00784 0.808718 7.68615 0.579624C7.23971 0.497385 6.16473 0.473888 5.70654 0.532631ZM7.93874 2.10692C9.08421 2.42413 9.86548 2.9528 10.7701 4.02191C11.2107 4.54471 11.4456 4.72094 11.7217 4.72094C12.0213 4.72094 12.2093 4.58583 12.6616 4.05128C13.437 3.14078 14.0009 2.69434 14.8351 2.34776C15.5282 2.05405 15.8689 1.99531 16.8382 1.99531C17.9073 1.99531 18.4007 2.10692 19.2231 2.52399C20.5859 3.21714 21.514 4.40373 21.8782 5.91928C21.9957 6.43033 22.0075 7.75203 21.9017 8.27483C21.6844 9.27932 21.2438 10.1605 20.6035 10.8536C20.4332 11.0357 15.6457 15.506 12.4384 18.4783C12.0977 18.7955 11.7746 19.054 11.7217 19.054C11.6747 19.054 10.0593 17.5972 8.13846 15.8173C2.49922 10.5834 2.58734 10.6656 2.08803 9.76101C1.64746 8.96212 1.47711 8.21609 1.48299 7.09999C1.48886 5.89578 1.71795 5.12039 2.34649 4.18639C3.08664 3.07616 4.26736 2.30077 5.60668 2.04818C6.18235 1.93657 7.43943 1.97181 7.93874 2.10692Z" fill="black" />
                            </g>
                        </svg>
                        {langObj.accountMenu.item2}
                    </Link>
                    <Link href="/stories" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <CameraIcon />
                        {langObj.accountMenu.item3}
                    </Link>
                    <Link href="/giftcard" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <GiftBoxIcon />
                        {langObj.accountMenu.item4}
                    </Link>
                </div>
                <h2 className="mt-5 font_urbanist_bold text-base">{langObj.dashboardMenu.heading}</h2>
                <div className="py-5 grid grid-cols-4 place-content-center border-b border-gray-50">
                    <Link href="/user/uf-wallet" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <UfPointsIcon />
                        {langObj.dashboardMenu.item1}
                    </Link>
                    <Link href="/user/security" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <SecurityIcon />
                        {langObj.dashboardMenu.item2}
                    </Link>
                    <Link href="/user/emailaddress" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <EmailIcon />
                        {langObj.dashboardMenu.item3}
                    </Link>
                    <Link href="/user/shopping-lists" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <PackageBagIcon />
                        {langObj.dashboardMenu.item4}
                    </Link>
                </div>
                <h2 className="mt-5 font_urbanist_bold text-base">{langObj.menu.item5}</h2>
                <div className="py-5 grid grid-cols-4 place-content-center border-b border-gray-50">
                    <Link href="/user/orders/processing" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <ProcessIcon />
                        {langObj.orderMenu.item1}
                    </Link>
                    <Link href="/user/orders/shipped" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <OrderListIcon />
                        {langObj.orderMenu.item2}
                    </Link>
                    <Link href="/user/orders/delivering" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <svg width="20" height="20" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.87163 0.548805C1.94445 0.715864 1.17597 1.43005 0.908673 2.36976C0.837673 2.62453 0.833496 2.95447 0.833496 8.63034C0.833496 14.3062 0.837673 14.6361 0.908673 14.8909C1.10915 15.5967 1.58527 16.1773 2.24515 16.5072C2.45398 16.6158 2.7881 16.7077 3.11804 16.7536L3.31434 16.7787L3.3394 17.0167C3.46469 18.1653 3.86981 18.9755 4.64247 19.6271C5.34829 20.2243 6.10842 20.5 7.05648 20.5C8.01708 20.5041 8.7772 20.2368 9.48303 19.6563C10.2599 19.0173 10.6942 18.1528 10.8153 17.0126L10.8404 16.7745H13.3421H15.8438L15.8689 17.0126C15.9942 18.1653 16.3993 18.9755 17.172 19.6271C17.8778 20.2243 18.6379 20.5 19.586 20.5C20.5466 20.5041 21.3067 20.2368 22.0125 19.6563C22.7894 19.0173 23.2237 18.1528 23.3448 17.0167L23.3699 16.7787L24.4015 16.7662C25.2911 16.7536 25.4498 16.7453 25.5667 16.6785C25.9384 16.478 25.9384 15.8139 25.5667 15.6176C25.4749 15.5717 25.2994 15.5424 25.028 15.5299L24.6187 15.5132V12.5604C24.6187 9.42805 24.6061 9.26516 24.414 8.89763C24.3681 8.80575 24.0841 8.44239 23.7792 8.08739C23.4785 7.73239 22.7392 6.86368 22.1462 6.15785C21.5489 5.44784 20.9851 4.80466 20.8891 4.72113C20.6385 4.50813 20.2835 4.33689 19.9786 4.28677C19.8324 4.26589 19.1224 4.24501 18.4082 4.24501H17.101V3.56424C17.0968 3.18 17.0717 2.74982 17.0383 2.56188C16.8754 1.63052 16.1821 0.870396 15.2424 0.586393C15.0044 0.515392 14.6452 0.50704 9.08209 0.502863C4.32505 0.494511 3.11387 0.502863 2.87163 0.548805ZM15.1589 1.8477C15.4137 1.98552 15.6726 2.26952 15.7645 2.52011C15.848 2.74147 15.848 2.85006 15.848 9.13152V15.5216H13.2419H10.6357L10.5063 15.2501C10.2223 14.6361 9.64174 13.9679 9.09461 13.6171C8.07555 12.9655 6.71819 12.8611 5.58218 13.3414C4.78029 13.6839 4.01599 14.4398 3.64846 15.2543L3.52734 15.5216H3.29763C2.84657 15.5216 2.39968 15.2501 2.17415 14.8324L2.08645 14.6654V8.63034V2.59529L2.17415 2.42823C2.3078 2.18182 2.59598 1.91452 2.83822 1.82264C3.04287 1.74328 3.18904 1.74328 9.01944 1.75164L14.9918 1.75999L15.1589 1.8477ZM19.8742 5.55643C19.9744 5.5982 20.4338 6.0952 21.4779 7.30221C22.2798 8.22521 22.9898 9.04799 23.0525 9.11899L23.1652 9.25681H20.1331H17.101V7.37739V5.49796H18.4166C19.4523 5.49796 19.7656 5.51049 19.8742 5.55643ZM23.3657 13.0157V15.5216H23.2655C23.182 15.5216 23.1444 15.4756 23.0358 15.2501C22.7518 14.6403 22.1712 13.9679 21.6325 13.6213C20.4839 12.8862 18.9303 12.8486 17.7316 13.521C17.6021 13.5962 17.4226 13.7173 17.3265 13.7925C17.2304 13.8718 17.1427 13.9345 17.126 13.9345C17.1135 13.9345 17.101 13.1618 17.101 12.2221V10.5098H20.2333H23.3657V13.0157ZM7.57019 14.3354C7.98784 14.419 8.32614 14.586 8.66444 14.8659C9.65844 15.6844 9.85892 17.1045 9.13638 18.1695C8.77303 18.7041 8.20084 19.0841 7.57019 19.2136C7.16925 19.2971 6.98966 19.2971 6.59289 19.2178C6.19195 19.1342 5.95806 19.0298 5.62812 18.7959C5.12694 18.4368 4.76358 17.8771 4.63829 17.2673C4.55476 16.8622 4.55476 16.6868 4.63829 16.2817C4.76358 15.6719 5.12694 15.1123 5.62812 14.7531C5.94971 14.5234 6.19195 14.4148 6.56783 14.3354C6.93954 14.2561 7.18178 14.2561 7.57019 14.3354ZM20.0997 14.3354C21.3694 14.5944 22.2715 15.8473 22.0794 17.0878C22.0125 17.5263 21.8914 17.8353 21.6659 18.1695C21.3025 18.7041 20.7303 19.0841 20.0997 19.2136C19.6988 19.2971 19.5192 19.2971 19.1224 19.2178C18.7215 19.1342 18.4876 19.0298 18.1576 18.7959C17.6564 18.4368 17.2931 17.8771 17.1678 17.2673C17.0843 16.8622 17.0843 16.6868 17.1678 16.2817C17.2931 15.6719 17.6564 15.1123 18.1576 14.7531C18.4792 14.5234 18.7215 14.4148 19.0973 14.3354C19.469 14.2561 19.7113 14.2561 20.0997 14.3354Z" fill="black" />
                            <path d="M10.0009 3.05889C9.77958 3.15495 6.00402 6.9305 5.89961 7.16439C5.80355 7.37321 5.82025 7.56116 5.95808 7.73239C6.13349 7.95792 6.17108 7.9621 8.12568 7.9621H9.92576L9.53734 8.37975C9.32016 8.60528 8.69786 9.25264 8.15492 9.81229C7.02309 10.9859 6.99385 11.0277 7.16509 11.3743C7.24444 11.5288 7.31127 11.5957 7.4658 11.675C7.84168 11.863 7.76233 11.9256 10.0093 9.68282C12.2228 7.4651 12.1727 7.52774 12.0307 7.15186C11.9806 7.02239 11.9096 6.93468 11.8052 6.86786C11.6507 6.7718 11.6381 6.7718 9.82552 6.75092L7.99621 6.73003L9.37028 5.32255C10.9323 3.7313 10.9281 3.73548 10.7485 3.38048C10.6733 3.23012 10.5982 3.15495 10.4603 3.08395C10.2432 2.97536 10.1972 2.97536 10.0009 3.05889Z" fill="black" /></svg>
                        {langObj.orderMenu.item3}
                    </Link>
                    <Link href="/user/orders/delivered" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                        <ReviewsIcon />
                        {langObj.orderMenu.item4}
                    </Link>
                </div></> :
                <>
                    <h2 className="mt-5 font_urbanist_bold text-base">{langObj.explore}</h2>
                    <div className="py-5 grid grid-cols-4 place-content-center border-b border-gray-50">
                        <Link href="/contact" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                            <HelpCenterIcon />
                            {langObj.services.item3}
                        </Link>
                        <Link href="/auth/login" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                            <HeartShopListIcon />
                            {langObj.dashboardMenu.item4}
                        </Link>
                        <Link href="/stories" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                            <CameraIcon />
                            {langObj.accountMenu.item3}
                        </Link>
                        <Link href="/giftcard" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                            <GiftBoxIcon />
                            {langObj.accountMenu.item4}
                        </Link>
                    </div>
                </>}
            <h2 className="mt-5 font_urbanist_bold text-base">{langObj.services.heading}</h2>
            <div className="py-5 grid grid-cols-4 place-content-center border-b border-gray-50">
                <Link href="/products/category/all-categories" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.566709 6.14375L0.566709 6.14375L0.567045 6.14441C0.612783 6.23422 0.65045 6.28362 0.687623 6.32028C0.725975 6.35809 0.782047 6.4003 0.885451 6.45568L0.972253 6.5H3.51431H6.05646L6.15624 6.4491L6.1569 6.44876C6.24686 6.40303 6.29634 6.36537 6.33304 6.32822C6.37087 6.28992 6.41309 6.23393 6.46849 6.13069L6.51273 6.0442V3.50481V0.965417L6.4685 0.878953C6.41309 0.77569 6.37088 0.719701 6.33304 0.681395C6.29634 0.64425 6.24686 0.606586 6.1569 0.560857L6.15624 0.56052L6.05567 0.509214L3.55707 0.500823C2.6733 0.498627 2.01112 0.500835 1.56001 0.507367C1.33391 0.510641 1.16456 0.514952 1.04826 0.520116C0.999508 0.522281 0.96343 0.524455 0.938169 0.526441C0.743945 0.610951 0.584784 0.787259 0.525972 0.959131C0.525145 0.97156 0.521384 1.01193 0.517665 1.09655C0.512561 1.21268 0.508381 1.37873 0.505381 1.60075C0.499394 2.04395 0.498274 2.69643 0.50267 3.59017C0.50267 3.59021 0.50267 3.59024 0.502671 3.59028L0.515261 6.04309L0.566709 6.14375ZM0.902272 0.530108C0.902414 0.530142 0.90474 0.529868 0.908821 0.529187C0.90417 0.529735 0.90213 0.530075 0.902272 0.530108Z" stroke="black" />
                        <path d="M10.0804 6.14375L10.0804 6.14375L10.0807 6.14441C10.1265 6.23422 10.1641 6.28362 10.2013 6.32028C10.2396 6.35809 10.2957 6.4003 10.3991 6.45568L10.4859 6.5H13.028H15.5701L15.6699 6.4491L15.6706 6.44876C15.7605 6.40303 15.81 6.36537 15.8467 6.32822C15.8845 6.28992 15.9268 6.23393 15.9822 6.13069L16.0264 6.0442V3.50481V0.965417L15.9822 0.878953C15.9268 0.77569 15.8845 0.719701 15.8467 0.681395C15.81 0.64425 15.7605 0.606586 15.6706 0.560857L15.6699 0.56052L15.5693 0.509214L13.0707 0.500823C12.187 0.498627 11.5248 0.500835 11.0737 0.507367C10.8476 0.510641 10.6782 0.514952 10.5619 0.520116C10.5132 0.522281 10.4771 0.524455 10.4518 0.526441C10.2576 0.610951 10.0985 0.787259 10.0396 0.959131C10.0388 0.97156 10.0351 1.01193 10.0313 1.09655C10.0262 1.21268 10.0221 1.37873 10.0191 1.60075C10.0131 2.04395 10.0119 2.69643 10.0163 3.59017C10.0163 3.59021 10.0163 3.59024 10.0163 3.59028L10.0289 6.04309L10.0804 6.14375ZM10.4159 0.530108C10.4161 0.530142 10.4184 0.529868 10.4225 0.529187C10.4178 0.529735 10.4158 0.530075 10.4159 0.530108Z" stroke="black" />
                        <path d="M0.566709 15.6437L0.566709 15.6437L0.567045 15.6444C0.612783 15.7342 0.65045 15.7836 0.687623 15.8203C0.725975 15.8581 0.782047 15.9003 0.885451 15.9557L0.972253 16H3.51431H6.05646L6.15624 15.9491L6.1569 15.9488C6.24686 15.903 6.29634 15.8654 6.33304 15.8282C6.37087 15.7899 6.41309 15.7339 6.46849 15.6307L6.51273 15.5442V13.0048V10.4654L6.4685 10.379C6.41309 10.2757 6.37088 10.2197 6.33304 10.1814C6.29634 10.1442 6.24686 10.1066 6.1569 10.0609L6.15624 10.0605L6.05567 10.0092L3.55707 10.0008C2.6733 9.99863 2.01112 10.0008 1.56001 10.0074C1.33391 10.0106 1.16456 10.015 1.04826 10.0201C0.999508 10.0223 0.96343 10.0245 0.938169 10.0264C0.743945 10.111 0.584784 10.2873 0.525972 10.4591C0.525145 10.4716 0.521384 10.5119 0.517665 10.5965C0.512561 10.7127 0.508381 10.8787 0.505381 11.1007C0.499394 11.5439 0.498274 12.1964 0.50267 13.0902C0.50267 13.0902 0.50267 13.0902 0.502671 13.0903L0.515261 15.5431L0.566709 15.6437ZM0.902272 10.0301C0.902414 10.0301 0.90474 10.0299 0.908821 10.0292C0.90417 10.0297 0.90213 10.0301 0.902272 10.0301Z" stroke="black" />
                        <path d="M10.0804 15.6437L10.0804 15.6437L10.0807 15.6444C10.1265 15.7342 10.1641 15.7836 10.2013 15.8203C10.2396 15.8581 10.2957 15.9003 10.3991 15.9557L10.4859 16H13.028H15.5701L15.6699 15.9491L15.6706 15.9488C15.7605 15.903 15.81 15.8654 15.8467 15.8282C15.8845 15.7899 15.9268 15.7339 15.9822 15.6307L16.0264 15.5442V13.0048V10.4654L15.9822 10.379C15.9268 10.2757 15.8845 10.2197 15.8467 10.1814C15.81 10.1442 15.7605 10.1066 15.6706 10.0609L15.6699 10.0605L15.5693 10.0092L13.0707 10.0008C12.187 9.99863 11.5248 10.0008 11.0737 10.0074C10.8476 10.0106 10.6782 10.015 10.5619 10.0201C10.5132 10.0223 10.4771 10.0245 10.4518 10.0264C10.2576 10.111 10.0985 10.2873 10.0396 10.4591C10.0388 10.4716 10.0351 10.5119 10.0313 10.5965C10.0262 10.7127 10.0221 10.8787 10.0191 11.1007C10.0131 11.5439 10.0119 12.1964 10.0163 13.0902C10.0163 13.0902 10.0163 13.0902 10.0163 13.0903L10.0289 15.5431L10.0804 15.6437ZM10.4159 10.0301C10.4161 10.0301 10.4184 10.0299 10.4225 10.0292C10.4178 10.0297 10.4158 10.0301 10.4159 10.0301Z" stroke="black" />
                    </svg>
                    {langObj.services.item1}
                </Link>
                <Link href="/trackorder" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                    <TrackOrderIcon />
                    {langObj.services.item2}
                </Link>
                <Link href="/contact" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                    <HelpCenterIcon />
                    {langObj.services.item3}
                </Link>
                <a href="#" className="h-11 flex flex-col justify-between items-center font_urbanist text-xs">
                    <DiamondIcon />
                    {langObj.services.item4}
                </a>
            </div>
            {user && user.email ? <><h2 className="mt-5 font_urbanist_bold text-base">{langObj.newsletterMenu.heading}</h2>
                <section className="flex items-center w-full md:w-3/4 my-7 gap-x-8 text-[13px] font_urbanist_medium">
                    <div className="w-1/4 flex justify-between">
                        {langObj.newsletterMenu.item1}<label className="switch w-[45px] md:w-11 h-6 "><input type="checkbox" name='active_by_email' checked={newsletterData?.active_by_email || false} value={newsletterData?.active_by_email} onChange={newsletterSubToggle} /><span className="slider"></span></label>
                    </div>
                    {/* <div className="w-1/4 flex justify-between">
                        Phone<label className="switch w-[45px] md:w-11 h-6"><input type="checkbox" name='active_by_phone' checked={newsletterData?.active_by_phone || false} value={newsletterData?.active_by_phone} onChange={newsletterSubToggle} /><span className="slider"></span></label>
                    </div> */}
                </section></> : null}
            <h2 className="mt-5 mb-3 font_urbanist_bold text-xl">{langObj.recentView}</h2>
            <section className="w-full min-h-[30vh] grid grid-cols-2 gap-7">
                {recentItems.length ? recentItems.map((item, i) => {
                    return <Link href={item.href} key={i} className="w-full font_urbanist_medium text-sm flex flex-col items-center justify-center gap-y-2">
                        <span className="w-full aspect-square rounded-xl overflow-hidden">
                            <Image width={250} height={250} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + item.image} alt={item.name[locale]} className='w-full h-full object-cover' />
                        </span>
                        {item.name[locale]}
                    </Link>
                }) :
                    <div className="w-full flex flex-col justify-center items-center col-span-full gap-y-4">
                        <Image width={300} height={300} className='w-2/5' src={giantSearchIcon} alt='recent items' />
                        <p className="font_urbanist text-sm text-gray-400">{langObj.noViews}</p>
                    </div>}
            </section>
        </main>
    </>
    else if (user) return <>
        <main className="p-5 bg-gray-200">
            <Header margin='0' />
            <div className={`w-full md:px-7 lg:px-14 xl:px-20 py-16 flex flex-col lg:flex-row justify-between font_urbanist`}>
                <section id='menu_container' className="hidden mid:flex lg:hidden w-full pb-7 px-4 rounded-full overflow-x-scroll hide_scrollbar">
                    <Option icon={<UserIcon />} href='/user/profile'>Profile</Option>
                    <Option icon={<KeyRound />} href='/user/email&password'>Email & Passowrd</Option>
                    <Option icon={<Fingerprint />} href='/user/2fa'>2FA</Option>
                    <Option icon={<Bolt />} href='/user/settings'>Settings</Option>
                </section>
                <section className="w-1/4 min-h-screen hidden lg:block">
                    <div className="flex flex-col sticky left-0 top-24 items-center w-[95%] 2xl:w-[90%] rounded-lg list-none font_urbanist overflow-hidden">
                        <Option icon={<UserIcon />} href='/user/profile'>Profile</Option>
                        <Option icon={<KeyRound />} href='/user/email&password'>Email & Passowrd</Option>
                        <Option icon={<Fingerprint />} href='/user/2fa'>2FA</Option>
                        <Option icon={<Bolt />} href='/user/settings'>Settings</Option>
                        <button onClick={handleLogout} className="w-full py-5 flex justify-between items-center px-4 bg-white transition-all overflow-hidden">
                            <span className="opacity-70 focus:opacity-100 flex items-center gap-x-3">
                                <LogOut />
                                Logout
                            </span>
                            <ChevronRight className='text-gray-600' size={18} />
                        </button>
                    </div>
                </section>
                <section className='bg-gray-50 w-full lg:w-[70%] 2xl:w-[73%] px-12 py-10 rounded-lg font_urbanist text-left overflow-x-hidden overflow-y-auto' >
                    <nav className={`${profileNull ? 'hidden' : null} mb-6 flex flex-col`}>
                        <h2 className="text-lg lg:text-2xl font-bold text-slate-800 mb-6">{title || "Account"}</h2>
                        <div className="w-3/5 md:w-auto flex items-center gap-x-3">
                            <label htmlFor='pfp' className="group relative md:w-20 aspect-square rounded-full cursor-pointer border-2 border-gray-300 flex justify-center items-center hover:bg-black/50 transition-all overflow-hidden">
                                <span className="opacity-0 group-hover:opacity-100 text-white font_urbanist_medium text-xs cursor-pointer flex flex-col items-center gap-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <i className="fa-solid fa-camera text-white" />Upload
                                </span>
                                {/* <Image className="w-full h-full object-cover" width={150} height={150} src={profileImage} alt="avatar" /> */}
                                <UserIcon className='text-gray-400' size={36} />
                            </label>
                            <input type="file" id='pfp' name='pfp' accept="image/*" className="opacity-0 w-0 h-0 appearance-none" />
                            <p className='text-sm lg:text-base'>Welcome {user.firstname || user.username} !</p>
                        </div>
                    </nav>
                    {loading ? <div className="w-full py-40 flex justify-center">Loading...</div> : children}
                </section>
            </div>
        </main>
        <Footer />
    </>
}