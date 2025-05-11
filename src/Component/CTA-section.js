import { Icon } from "@iconify/react";
import Link from "next/link";

const CTASection = () => {
    return <div className="w-full mt-5 bg-gray-900 rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 max-w-6xl mx-auto relative">
            <div className="w-1/2 relative h-64">
                <div className="absolute w-64 h-64 bg-white/10 rounded-full left-0 top-0 shadow-2xl" />
                <div className="absolute w-48 h-48 bg-white/20 rounded-full left-12 top-4 shadow-2xl" />
                <div className="absolute w-32 h-32 bg-white/30 rounded-full left-24 top-8 shadow-2xl" />
                <div className="absolute w-24 h-24 bg-white/40 rounded-full left-32 top-12 shadow-2xl" />
            </div>

            <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold text-white">
                    Join Hobbyland
                </h2>
                <p className="text-gray-300 text-lg">
                    Join this growing community and thrive together. We&apos;re excited to have you on board.
                </p>

                <button>
                    <Link href="/signup" className="group flex items-center px-8 py-3 bg-gradient-to-br from-orange-500 to-blue-600 transition-all rounded-full text-white font-semibold">
                        <div className="mr-2 w-2 aspect-square bg-white rounded-full group-hover:w-6 transition-all"></div>
                        Sign Up Now
                    </Link>
                </button>
            </div>
        </div>
    </div>
};

export default CTASection;