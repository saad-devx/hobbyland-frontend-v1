import { useEffect, useState } from "react";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

function Footer() {
  const [data, setData] = useState({});
  const [token, setToken] = useState(true);
  const FetchMedata = async () => {
    try {
      const cookies = document.cookie.split(";");
      console.log(cookies, "cokiies");
      let isLoggedIn = false;

      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name.trim() === "is_logged_in" && value.trim() === "true") {
          isLoggedIn = true;
        }
      });

      if (isLoggedIn) {
        setToken(true);
      } else {
        setToken(false);
      }
      if (isLoggedIn) {
        const response = await FetchMe();
        if (response) {
          console.log(response.data.user);
          setData({ ...response.data.user });
        }
      }
    } catch (e) { }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    FetchMedata();
  }, []);
  const router = useRouter();
  // return (
  //   <div className="Footer_Container">
  //     <div>
  //       <div className="container">
  //         <div className="row">
  //           <div className="col-md-3">
  //             <div className="HeadinG_Foter">Pages</div>
  //             <a
  //               onClick={() => {
  //                 router.push("./studentHome");
  //               }}
  //               className="link"
  //             >
  //               Home
  //             </a>
  //             <a
  //               onClick={() => {
  //                 router.push("./favourite");
  //               }}
  //               className="link"
  //             >
  //               favorite
  //             </a>
  //             <a
  //               onClick={() => {
  //                 router.push("./addtocard");
  //               }}
  //               className="link"
  //             >
  //               Categrios Pages
  //             </a>
  //             <a className="link">Add to Card</a>
  //           </div>
  //           <div className="col-md-3">
  //             <div className="HeadinG_Foter">Community</div>
  //             <p className="text-white">
  //               Community is the heart of shared support and understanding. It
  //               fosters collaboration, empathy, and growth, enriching lives
  //               through shared experiences and mutual aid. Embrace and
  //               contribute
  //             </p>
  //           </div>{" "}
  //           <div className="col-md-3">
  //             <div className="HeadinG_Foter">HobblyLand</div>
  //             {data?.account_type === "student" ? (
  //               <a
  //                 onClick={() => {
  //                   router.push("./StudentHome");
  //                 }}
  //                 className="link"
  //               >
  //                 HobblyLand Learning
  //               </a>
  //             ) : data?.account_type === "mentor" ? (
  //               <a
  //                 onClick={() => {
  //                   router.push("./Dashboard");
  //                 }}
  //                 className="link"
  //               >
  //                 HobblyLand Teacher
  //               </a>
  //             ) : null}
  //             {token === true ? (
  //               <div>fghfgh</div>
  //             ) : (
  //               <div>
  //                 <a
  //                   onClick={() => {
  //                     router.push("./SIgnupDetail");
  //                   }}
  //                   className="link"
  //                 >
  //                   HobblyLand Teacher
  //                 </a>
  //                 <a
  //                   onClick={() => {
  //                     router.push("./SIgnupDetail");
  //                   }}
  //                   className="link"
  //                 >
  //                   HobblyLand Teacher
  //                 </a>
  //               </div>
  //             )}
  //           </div>
  //           <div className="col-md-3">
  //             <div className="HeadinG_Foter">Contact</div>

  //             <div className="mt-3">
  //               <div className="InputBox">
  //                 <input
  //                   className="Input_Email"
  //                   placeholder="Enter Your Gmail"
  //                 />
  //                 <div>
  //                   <Icon
  //                     icon="streamline:mail-send-email-message-solid"
  //                     fontSize={15}
  //                     color="white"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="Copy_Right">
  //         <div className="text-white">HobblyLand</div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return <footer className="p-5 bg-gray-200 text-gray-200">
    <section className="relative min-h-[70vh] px-16 py-20 bg-gradient-to-b from-slate-950 to-slate-800 rounded-3xl overflow-hidden">
      <div className="w-full flex justify-between items-start">
        {/* <p className="font-medium tracking-wide">learn anything, anywhere, anytime!</p> */}
        <p className="font-medium tracking-wide">Either be a Student or a Mentor or even both,<br /> Try all your kinks!</p>

        <div className="flex gap-40">
          <ul className="flex flex-col gap-4">
            <li>Home</li>
            <li>Contact</li>
            <li>Whatever</li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>Home</li>
            <li>Contact</li>
            <li>Whatever</li>
          </ul>

          <button onClick={scrollTop} className="group size-20 border rounded-[10rem] flex justify-center items-center hover:translate-y-1/4 transition-all duration-300">
            <Icon icon="lucide:arrow-up-from-dot" className="text-2xl group-hover:-translate-y-[150%] transition-all duration-300" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-[15%] left-16 w-1/3 flex items-center justify-center">
        <div className="relative w-full text-slate-700">
          <input
            type="email"
            placeholder="youremail@gmail.com"
            className="w-full px-7 py-5 pr-14 rounded-[10rem] bg-gray-100 outline-none"
          />
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white rounded-full size-12 flex items-center justify-center">
            <Icon icon="bxs:send" className="text-lg" />
          </button>
        </div>
      </div>

      <span className="absolute bottom-[-12%] right-[-30%] text-[17vw] font-bold leading-none">hobbyland</span>

    </section>
  </footer>
}

export default Footer;
