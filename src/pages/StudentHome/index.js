import { useEffect, useState, useContext } from "react";
import { Footer, Header } from "@/Component";
import BentoGrid from "@/Component/bento-grid";
import Testimonials from "@/Component/testimonials";
import CTASection from "@/Component/CTA-section";
import { UserContext } from "@/config/contextapi/user";
import { FetchMe } from "@/config/Axiosconfig/AxiosHandle/user";
import { Icon } from "@iconify/react";
import { ArrowRight, Star, Users, Trophy, Activity, Play, Book } from 'lucide-react';
import Link from "next/link";
import { ephesis } from "@/config";
import Image from "next/image";
import dynamic from 'next/dynamic';
const EarthGlobe = dynamic(
  () => import("@/Component/3d-globe"),
  { ssr: false }
);
import img1 from "@/../public/images/offerings/offer-pic1.webp";
import img2 from "@/../public/images/offerings/offer-pic2.webp";
import img3 from "@/../public/images/offerings/offer-pic3.webp";
import img4 from "@/../public/images/offerings/offer-pic4.webp";
// import { categrios } from "@/constant/categrios";
// import { CourseCard, CourseTeam, HeroSection } from "@/layout/Home";
// import { Card_Section, Student_Header } from "@/layout/Student_portal";

function Index() {
  const [token, setToken] = useState(false);
  const [userdata, setUserdata] = useState(null);
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

  const fetchData = async () => {
    const cookies = document.cookie.split(";");
    let isLoggedIn = false;

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name.trim() === "is_logged_in" && value.trim() === "true") {
        isLoggedIn = true;
      }
    });
  };

  // Mock data
  const stats = {
    coursesCompleted: 12,
    teaching: 3,
    followers: 856,
    following: 234,
    achievements: 15
  };

  const marketplaceCourses = [
    {
      id: 1,
      type: "course",
      title: "Complete Web Development Bootcamp",
      instructor: "Michael Roberts",
      instructorTitle: "Senior Full-Stack Developer",
      description: "Comprehensive course covering HTML, CSS, JavaScript, React, and Node.js. Perfect for beginners wanting to become full-stack developers.",
      rating: 4.8,
      reviews: 1240,
      students: 3850,
      price: 199,
      duration: "12 weeks",
      mode: "online",
      level: "Beginner",
      featured: true,
      image: img1,
      tags: ["Web Development", "Programming", "Full Stack"],
      curriculum: ["HTML & CSS Basics", "JavaScript Fundamentals", "React.js", "Node.js", "Database Integration"],
      nextStartDate: "2024-12-10",
      language: "English"
    },
    {
      id: 2,
      type: "private",
      title: "One-on-One Classical Piano Lessons",
      instructor: "Nina Chen",
      instructorTitle: "Concert Pianist, Julliard Graduate",
      description: "Personalized piano lessons for all skill levels. Focus on classical repertoire, technique, and music theory.",
      rating: 5.0,
      reviews: 89,
      price: 75,
      duration: "1 hour",
      mode: "hybrid",
      level: "All Levels",
      location: "San Francisco, CA",
      image: img2,
      tags: ["Music", "Piano", "Classical"],
      availability: ["Weekdays 9AM-6PM", "Saturday 10AM-2PM"],
      equipment: "Student must have access to a piano or keyboard",
      languages: ["English", "Mandarin"]
    },
    {
      id: 3,
      type: "course",
      title: "Digital Photography Masterclass",
      instructor: "Sarah Williams",
      instructorTitle: "Professional Photographer",
      description: "Master your camera and learn professional photography techniques. Includes practical assignments and feedback.",
      rating: 4.7,
      reviews: 756,
      students: 2200,
      price: 149,
      duration: "8 weeks",
      mode: "online",
      level: "Intermediate",
      image: img3,
      tags: ["Photography", "Digital Arts"],
      includes: ["Video Lessons", "Weekly Assignments", "Personal Feedback", "Private Community Access"],
      requirements: "DSLR or Mirrorless Camera",
      language: "English"
    },
    {
      id: 4,
      type: "private",
      title: "Japanese Language Tutoring",
      instructor: "Yuki Tanaka",
      instructorTitle: "Certified Japanese Language Instructor",
      description: "Private Japanese lessons focusing on conversation, reading, and writing. JLPT preparation available.",
      rating: 4.9,
      reviews: 125,
      price: 45,
      duration: "1 hour",
      mode: "online",
      level: "All Levels",
      image: img4,
      tags: ["Language", "Japanese", "JLPT"],
      specializations: ["Business Japanese", "JLPT Prep", "Conversational"],
      materials: "Provided digitally",
      languages: ["Japanese", "English"]
    },
  ];

  const liveStreams = [
    { id: 1, title: "Watercolor Painting Workshop", host: "Julia Arts", viewers: 234, image: "https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Cooking Italian Pasta", host: "Chef Mario", viewers: 567, image: "https://images.unsplash.com/photo-1624589115993-90e2a31deaaa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Yoga Flow Session", host: "Emma Wellness", viewers: 189, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  useEffect(() => {
    fecthMeData();
    fetchData();
  }, []);

  return <>
    <main className="p-5 bg-gray-200">
      <Header margin='0' />
      <section className="w-full h-[calc(100vh-74px)] py-5 flex flex-col gap-4">
        <section className="flex-1 rounded-2xl bg-white relative overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline>
            <source src="/videos/hobbyland-vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/50 to-black/10" style={{ backgroundSize: '150% 110%' }}>
            <h1 className="absolute left-[5%] top-[15%] text-4xl md:text-8xl font-semibold text-white max-w-4xl">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">learn&nbsp;</span>
              anything <br /> anywhere <br /> anytime
            </h1>
          </div>

          <button onClick={() => {
            if (window) window.scrollTo({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth"
            });
          }} className="group absolute bottom-10 right-10 size-32 border rounded-[10rem] flex justify-center items-center backdrop-blur-md transition-all duration-300">
            <span className="absolute top-1/2 left-0 -translate-x-1/2 text-white font-light text-sm tracking-[0.5em] group-hover:tracking-[0.8em] transition-all duration-500">EXPLORE</span>
            <Icon icon="lucide:arrow-up-from-dot" className="text-2xl text-white group-hover:translate-y-[100%] rotate-180 transition-all duration-300" />
          </button>

        </section>
      </section>

      {userdata ?
        <section className="min-h-screen bg-gray-100 rounded-3xl px-6 py-10 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Welcome back, {userdata?.firstname}!</h1>
            <button className="bg-gradient-to-r from-orange-400 to-blue-500 text-white px-6 py-2 rounded-full">
              Create Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-orange-400/10 to-blue-500/10 p-6 rounded-3xl col-span-2 row-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <Book className="text-orange-400" />
                    <span className="text-lg font-semibold">Learning</span>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.coursesCompleted} courses</p>
                  <p className="text-gray-500">Currently enrolled in 3</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <Users className="text-blue-500" />
                    <span className="text-lg font-semibold">Teaching</span>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.teaching} courses</p>
                  <p className="text-gray-500">132 total students</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <Trophy className="text-orange-400" />
                    <span className="text-lg font-semibold">Achievements</span>
                  </div>
                  <p className="text-3xl font-bold mt-2">{stats.achievements}</p>
                  <p className="text-gray-500">3 this month</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <Activity className="text-blue-500" />
                    <span className="text-lg font-semibold">Activity</span>
                  </div>
                  <p className="text-3xl font-bold mt-2">89%</p>
                  <p className="text-gray-500">Response rate</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-blue-500 p-6 rounded-3xl text-white">
              <h3 className="text-xl font-semibold mb-4">Network</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Followers</span>
                  <span className="font-bold">{stats.followers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Following</span>
                  <span className="font-bold">{stats.following}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Marketplace</h2>
              <Link href="/market-place" className="text-gray-600 flex items-center gap-2 hover:text-gray-900">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid col grid-cols-4 gap-6 overflow-x-auto pb-4">
              {marketplaceCourses.map(course => (
                <div key={course.id} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Image src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-t-2xl" />
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-gray-600 text-sm">{course.instructor}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{course.students} students</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">$ {course.price}</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-full text-sm">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Public Lives from Around the World</h2>
              <button className="text-gray-600 flex items-center gap-2 hover:text-gray-900">
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid col grid-cols-4 gap-6 overflow-x-auto pb-4">
              {liveStreams.map(stream => (
                <div key={stream.id} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 relative">
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                  <img src={stream.image} alt={stream.title} className="w-full h-40 object-cover rounded-t-2xl" />
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold">{stream.title}</h3>
                    <p className="text-gray-600 text-sm">{stream.host}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{stream.viewers}</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-full text-sm flex items-center gap-1">
                        <Play className="w-4 h-4" /> Join Stream
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Feed</h2>
            <div className="space-y-4 lg:px-[15%] xl:px-[20%]">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Image width={80} height={80} src="/images/pfp4.webp" alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-semibold">Emma White</h4>
                    <p className="text-gray-500 text-sm">Photography Mentor</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">Hey folks! Just uploaded a new course on Advanced Portrait Photography! It will cover all those shutter speed basics, angles and then giving a final touch to the picture in Lighting room. Check it out and let me know your thoughts 📸</p>
                <Image width={1200} height={800} src="/images/offerings/offer-pic13.webp" alt="Post" className="w-full rounded-xl mb-4" />
                <div className="flex gap-4 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-gray-900">
                    <Star className="w-5 h-5" /> Like
                  </button>
                  <button className="flex items-center gap-2 hover:text-gray-900">
                    Comment
                  </button>
                  <button className="flex items-center gap-2 hover:text-gray-900">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> :
        <>
          <section className="relative h-[140vh] p-8 rounded-3xl bg-gradient-to-br from-orange-500/30 to-blue-600/30 overflow-hidden">
            <div className="mt-[10%] text-slate-700">
              <span className={ephesis.className + " text-2xl italic"}>We call it</span>
              <br />
              <span className="text-6xl font-bold">Mentorpreneurship</span>
              <p className="mt-6 max-w-[45%] text-lg">At Hobbyland, we redefine growth with Mentorpreneurship. Share your skills as a mentor while learning new ones as a student while anywhere in the world from all over the world. Transform your passions into a source of income while expanding your knowledge in a collaborative and vibrant community</p>

              <div className={ephesis.className + " mt-[20%] text-7xl italic"}>Learn, Earn and Upturn</div>
              <p className="mt-6 max-w-[45%] text-lg">Discover the ultimate cycle of growth with Hobbyland. As you learn new skills, earn by sharing your expertise, and upturn your potential into limitless possibilities. Whether you're mastering a craft or mentoring others, every step you take transforms not just your knowledge but your future. This is more than skill-sharing; it’s life-changing.</p>
            </div>
            <EarthGlobe />
          </section>
          <BentoGrid />
          <Testimonials />
          <CTASection />
        </>}

    </main>
    <Footer />
  </>
}

export default Index;
