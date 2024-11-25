
import { Footer, Header } from "@/Component";
import { Star, UserCircle, Briefcase, GraduationCap, Users } from 'lucide-react';
import { Icon } from "@iconify/react";

const PeopleFinder = () => {
    const people = [
        {
            id: 1,
            name: "Dr. Sarah Chen",
            role: "mentor",
            bio: "AI Research Lead with 10+ years experience. Specialized in machine learning and neural networks.",
            rating: 4.9,
            reviews: 128,
            expertise: ["Machine Learning", "Deep Learning", "Python"],
            location: "San Francisco, CA",
            teachingMode: ["online", "onsite"],
            isConnected: false,
            hourlyRate: "$150"
        },
        {
            id: 2,
            name: "Alex Thompson",
            role: "student",
            bio: "Looking to master digital photography and photo editing. Currently learning landscape photography.",
            interests: ["Photography", "Adobe Lightroom", "Composition"],
            location: "New York, NY",
            preferredMode: "online",
            isConnected: true
        },
        {
            id: 3,
            name: "Michael Roberts",
            role: "mentorpreneur",
            bio: "Full-stack developer & coding bootcamp instructor. Learning classical piano while teaching web development.",
            rating: 4.7,
            reviews: 56,
            expertise: ["JavaScript", "React", "Node.js"],
            learning: ["Classical Piano", "Music Theory"],
            location: "Austin, TX",
            teachingMode: ["online"],
            isConnected: false,
            hourlyRate: "$85"
        },
        {
            id: 4,
            name: "Elena Rodriguez",
            role: "mentor",
            bio: "Professional chef with 15 years of experience. Specializing in Mediterranean and Latin American cuisine.",
            rating: 4.8,
            reviews: 203,
            expertise: ["Culinary Arts", "Pastry Making", "Restaurant Management"],
            location: "Miami, FL",
            teachingMode: ["onsite"],
            isConnected: false,
            hourlyRate: "$95"
        },
        {
            id: 5,
            name: "James Kim",
            role: "student",
            bio: "Aspiring musician looking to learn music production and sound engineering.",
            interests: ["Music Production", "Sound Engineering", "Ableton Live"],
            location: "Chicago, IL",
            preferredMode: "mentorpreneur",
            isConnected: false
        },
        {
            id: 6,
            name: "Priya Patel",
            role: "mentorpreneur",
            bio: "Yoga instructor teaching mindfulness while learning digital marketing to grow my business.",
            rating: 4.9,
            reviews: 89,
            expertise: ["Yoga", "Meditation", "Mindfulness"],
            learning: ["Digital Marketing", "Social Media Strategy"],
            location: "Toronto, Canada",
            teachingMode: ["online", "onsite"],
            isConnected: true,
            hourlyRate: "$60"
        },
        {
            id: 7,
            name: "David Wilson",
            role: "mentor",
            bio: "Former Olympic athlete teaching athletic training and sports psychology.",
            rating: 5.0,
            reviews: 167,
            expertise: ["Athletic Training", "Sports Psychology", "Nutrition"],
            location: "Melbourne, Australia",
            teachingMode: ["online", "onsite"],
            isConnected: false,
            hourlyRate: "$120"
        },
        {
            id: 8,
            name: "Sophie Martin",
            role: "student",
            bio: "Art enthusiast diving into oil painting and color theory.",
            interests: ["Oil Painting", "Color Theory", "Art History"],
            location: "Paris, France",
            preferredMode: "onsite",
            isConnected: false
        },
        {
            id: 9,
            name: "Ahmed Hassan",
            role: "mentorpreneur",
            bio: "Arabic calligraphy artist teaching traditional techniques while learning 3D modeling.",
            rating: 4.6,
            reviews: 42,
            expertise: ["Arabic Calligraphy", "Islamic Art", "Traditional Painting"],
            learning: ["3D Modeling", "Blender", "Digital Art"],
            location: "Dubai, UAE",
            teachingMode: ["online"],
            isConnected: false,
            hourlyRate: "$75"
        },
        {
            id: 10,
            name: "Lisa Chen",
            role: "mentor",
            bio: "Business consultant specializing in startup growth and entrepreneurship mentoring.",
            rating: 4.9,
            reviews: 156,
            expertise: ["Startup Strategy", "Business Planning", "Fundraising"],
            location: "Singapore",
            teachingMode: ["online", "onsite"],
            isConnected: true,
            hourlyRate: "$200"
        },
        {
            id: 11,
            name: "Marcus Johnson",
            role: "student",
            bio: "Corporate professional exploring creative writing and screenplay development.",
            interests: ["Creative Writing", "Screenplay Writing", "Storytelling"],
            location: "London, UK",
            preferredMode: "online",
            isConnected: false
        },
        {
            id: 12,
            name: "Nina Petrova",
            role: "mentorpreneur",
            bio: "Ballet instructor teaching classical dance while learning modern choreography.",
            rating: 4.8,
            reviews: 94,
            expertise: ["Ballet", "Dance Pedagogy", "Performance"],
            learning: ["Contemporary Dance", "Choreography"],
            location: "Moscow, Russia",
            teachingMode: ["onsite"],
            isConnected: false,
            hourlyRate: "$70"
        }
    ];

    const getRoleIcon = (role) => {
        switch (role) {
            case 'mentor':
                return <Briefcase className="w-5 h-5 text-blue-600" />;
            case 'student':
                return <GraduationCap className="w-5 h-5 text-green-600" />;
            case 'mentorpreneur':
                return <Users className="w-5 h-5 text-purple-600" />;
            default:
                return null;
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'mentor':
                return 'bg-blue-100 text-blue-800';
            case 'student':
                return 'bg-green-100 text-green-800';
            case 'mentorpreneur':
                return 'bg-purple-100 text-purple-800';
            default:
                return '';
        }
    };

    return <>
        <main className="min-h-screen bg-gray-200 p-5">
            <Header />
            <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-xl shadow-sm">
                    <section className="w-full flex justify-between items-center">
                        <div className="p-6 border-b border-gray-100">
                            <h1 className="text-2xl font-semibold text-slate-800">Find People</h1>
                            <p className="mt-2 text-gray-600">Connect with mentors and students in your field</p>
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

                    <div className="flex flex-col gap-2">
                        {people.map((person) => (
                            <div key={person.id} className="p-6 bg-white hover:bg-gray-50 transition-colors rounded-xl">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <UserCircle className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h2 className="text-lg font-medium text-gray-900">{person.name}</h2>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(person.role)}`}>
                                                    <span className="mr-1">{getRoleIcon(person.role)}</span>
                                                    {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{person.bio}</p>
                                            {person.expertise && (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {person.expertise.map((skill) => (
                                                        <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {person.rating && <div className="mt-2 flex items-center">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(person.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        fill={i < Math.floor(person.rating) ? 'currentColor' : 'none'}
                                                    />)}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {person.rating} ({person.reviews} reviews)
                                                </span>
                                            </div>}
                                        </div>
                                    </div>
                                    <button
                                        className={`group px-4 py-2 rounded-3xl flex items-center text-sm font-medium text-slate-100 ${person.isConnected
                                            ? 'bg-slate-400 text-gray-700'
                                            : 'bg-gradient-to-br from-orange-300 to-blue-400'} transition-all`}>
                                        {person.isConnected ? 'Connected' : 'Connect'}
                                        {!person.isConnected && <div className="ml-2 w-2 aspect-square bg-white rounded-full group-hover:w-4 transition-all"></div>}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>
};

export default PeopleFinder;