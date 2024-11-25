import { Star, Users, Clock, Globe, MapPin, Bookmark, PlayCircle, BookOpen, MessagesSquare } from 'lucide-react';
import Image from 'next/image';
import { Footer, Header } from "@/Component";
import { Icon } from '@iconify/react';
import img1 from "@/../public/images/offerings/offer-pic1.webp";
import img2 from "@/../public/images/offerings/offer-pic2.webp";
import img3 from "@/../public/images/offerings/offer-pic3.webp";
import img4 from "@/../public/images/offerings/offer-pic4.webp";
import img5 from "@/../public/images/offerings/offer-pic5.webp";
import img6 from "@/../public/images/offerings/offer-pic6.webp";
import img7 from "@/../public/images/offerings/offer-pic7.webp";
import img8 from "@/../public/images/offerings/offer-pic8.webp";
import img9 from "@/../public/images/offerings/offer-pic9.webp";
import img10 from "@/../public/images/offerings/offer-pic10.webp";
import img11 from "@/../public/images/offerings/offer-pic11.webp";
import img12 from "@/../public/images/offerings/offer-pic12.webp";

const FindInterests = () => {
    const offerings = [
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
        {
            id: 5,
            type: "workshop",
            title: "Artisanal Bread Baking Workshop",
            instructor: "Elena Rodriguez",
            instructorTitle: "Master Baker, Le Cordon Bleu Graduate",
            description: "Hands-on workshop learning to make sourdough, focaccia, and artisanal breads. All materials included.",
            rating: 4.8,
            reviews: 67,
            price: 120,
            duration: "4 hours",
            mode: "onsite",
            level: "Beginner",
            location: "Miami, FL",
            image: img5,
            tags: ["Cooking", "Baking", "Culinary Arts"],
            materialsProvided: ["Ingredients", "Recipe Book", "Apron"],
            groupSize: "Maximum 8 participants",
            nextSessions: ["2024-12-15", "2024-12-22"]
        },
        {
            id: 6,
            type: "course",
            title: "Financial Trading Fundamentals",
            instructor: "James Chen",
            instructorTitle: "Former Wall Street Trader",
            description: "Learn stock market basics, technical analysis, and trading strategies. Includes live market sessions.",
            rating: 4.6,
            reviews: 892,
            students: 1500,
            price: 299,
            duration: "6 weeks",
            mode: "online",
            level: "Beginner",
            image: img6,
            tags: ["Finance", "Trading", "Investment"],
            features: ["Live Trading Sessions", "Market Simulators", "Strategy Guides"],
            certification: true,
            language: "English"
        },
        {
            id: 7,
            type: "workshop",
            title: "Urban Sketching Weekend",
            instructor: "Marco Rossi",
            instructorTitle: "Professional Artist & Illustrator",
            description: "Two-day outdoor sketching workshop. Learn perspective, composition, and watercolor techniques.",
            rating: 4.9,
            reviews: 45,
            price: 180,
            duration: "2 days",
            mode: "onsite",
            level: "All Levels",
            location: "Rome, Italy",
            image: img7,
            tags: ["Art", "Sketching", "Watercolor"],
            materialsProvided: ["Sketchbook", "Basic Art Supplies"],
            groupSize: "Maximum 12 participants",
            nextSessions: ["2024-12-14", "2024-12-28"],
            languages: ["English", "Italian"]
        },
        {
            id: 8,
            type: "private",
            title: "Personal Fitness Training",
            instructor: "Alex Thompson",
            instructorTitle: "Certified Personal Trainer, Sports Nutritionist",
            description: "Customized workout plans and nutrition guidance for your fitness goals.",
            rating: 4.9,
            reviews: 203,
            price: 65,
            duration: "1 hour",
            mode: "hybrid",
            level: "All Levels",
            location: "London, UK",
            image: img8,
            tags: ["Fitness", "Nutrition", "Health"],
            specializations: ["Weight Loss", "Muscle Gain", "Athletic Performance"],
            equipment: "Access to gym or home equipment recommended",
            languages: ["English"]
        },
        {
            id: 9,
            type: "course",
            title: "3D Animation with Blender",
            instructor: "David Kim",
            instructorTitle: "Senior Animator, Former Pixar Artist",
            description: "Learn 3D modeling, animation, and rendering using Blender. Create your own animated short film.",
            rating: 4.7,
            reviews: 445,
            students: 1200,
            price: 199,
            duration: "10 weeks",
            mode: "online",
            level: "Intermediate",
            image: img9,
            tags: ["3D Animation", "Blender", "Digital Art"],
            software: "Blender (Free)",
            requirements: "Decent GPU recommended",
            includes: ["Project Files", "Asset Library", "Discord Community"],
            language: "English"
        },
        {
            id: 10,
            type: "workshop",
            title: "Mindfulness Meditation Retreat",
            instructor: "Dr. Sarah Chen",
            instructorTitle: "PhD in Psychology, Certified Meditation Instructor",
            description: "Weekend retreat focusing on mindfulness techniques, stress reduction, and mental wellness.",
            rating: 5.0,
            reviews: 89,
            price: 250,
            duration: "2 days",
            mode: "onsite",
            level: "All Levels",
            location: "Boulder, CO",
            image: img10,
            tags: ["Meditation", "Wellness", "Mental Health"],
            includes: ["Meals", "Accommodation", "Materials"],
            groupSize: "Maximum 15 participants",
            nextSessions: ["2024-12-21", "2025-01-04"]
        },
        {
            id: 11,
            type: "private",
            title: "Business Spanish for Professionals",
            instructor: "Carlos Mendoza",
            instructorTitle: "Business Spanish Specialist, MBA",
            description: "Tailored Spanish lessons focusing on business vocabulary, presentations, and negotiations.",
            rating: 4.8,
            reviews: 156,
            price: 55,
            duration: "1 hour",
            mode: "online",
            level: "Intermediate",
            image: img11,
            tags: ["Language", "Spanish", "Business"],
            specializations: ["Business Writing", "Presentations", "Negotiations"],
            materials: "Custom business vocabulary guides provided",
            languages: ["Spanish", "English"]
        },
        {
            id: 12,
            type: "course",
            title: "Data Science & Machine Learning",
            instructor: "Dr. Priya Patel",
            instructorTitle: "AI Researcher, PhD in Computer Science",
            description: "Comprehensive course covering Python, data analysis, and machine learning algorithms.",
            rating: 4.9,
            reviews: 678,
            students: 1890,
            price: 399,
            duration: "14 weeks",
            mode: "online",
            level: "Intermediate",
            image: img12,
            tags: ["Data Science", "Machine Learning", "Python"],
            curriculum: ["Python for Data Science", "Statistical Analysis", "ML Algorithms", "Deep Learning Intro"],
            certification: true,
            prerequisites: "Basic Python knowledge",
            language: "English"
        }
    ];

    const TypeBadge = ({ type }) => {
        const styles = {
            course: "bg-blue-100 text-blue-800",
            private: "bg-purple-100 text-purple-800",
            workshop: "bg-orange-100 text-orange-800"
        };

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        );
    };

    return <>
        <main className="min-h-screen p-5 bg-gray-200">
            <Header margin='0' />
            <div className="max-w-7xl mx-auto px-4">
                <section className="w-full flex justify-between items-center">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-semibold text-slate-800">Teaching Marketplace</h1>
                        <p className="mt-2 text-gray-600">Discover courses, private lessons, and workshops</p>
                    </div>
                    <div className="pr-4 mt-6 flex items-center gap-4 bg-gray-100 rounded-[2rem]">
                        <input
                            id="search-input"
                            type="text"
                            placeholder="Type to search..."
                            className="w-full h-12 pl-12 pr-4 text-gray-800 bg-white rounded-full border border-gray-200 
                        outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        shadow-sm hover:shadow-md transition-shadow duration-200"/>
                        <button><Icon icon="lucide:search" className="text-2xl text-slate-700" /></button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offerings.map((offering) => (
                        <div key={offering.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative">
                                <Image src={offering.image} alt={offering.title} className="w-full h-48 object-cover" />
                                <button className="absolute top-4 right-4 p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
                                    <Bookmark className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <TypeBadge type={offering.type} />
                                    <div className="flex items-center text-sm">
                                        {offering.mode === "online" && <Globe className="w-4 h-4 text-gray-500 mr-1" />}
                                        {offering.mode === "onsite" && <MapPin className="w-4 h-4 text-gray-500 mr-1" />}
                                        {offering.mode === "hybrid" && <Globe className="w-4 h-4 text-gray-500 mr-1" />}
                                        <span className="text-gray-600 capitalize">{offering.mode}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{offering.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{offering.description}</p>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm font-medium text-gray-900">{offering.rating}</span>
                                    </div>
                                    <span className="mx-2 text-gray-300">·</span>
                                    <span className="text-sm text-gray-600">{offering.reviews} reviews</span>
                                    {offering.students && (
                                        <>
                                            <span className="mx-2 text-gray-300">·</span>
                                            <Users className="w-4 h-4 text-gray-500" />
                                            <span className="ml-1 text-sm text-gray-600">{offering.students}</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {offering.duration}
                                    </div>
                                    <div className="text-sm text-gray-600">{offering.level}</div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {offering.tags.map((tag) => <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {tag}
                                    </span>)}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="text-gray-900">
                                        <span className="text-2xl font-bold">${offering.price}</span>
                                        {offering.type === "private" && <span className="text-sm text-gray-600">/hour</span>}
                                    </div>
                                    <button className="group px-4 py-2 flex items-center text-sm text-white font-semibold bg-gradient-to-br from-orange-300 to-blue-400 transition-all rounded-3xl">
                                        {offering.type === "course" ? "Enroll Now" : "Book Session"}
                                        <div className="ml-2 w-2 aspect-square bg-white rounded-full group-hover:w-4 transition-all"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main >
        <Footer />
    </>
};

export default FindInterests;