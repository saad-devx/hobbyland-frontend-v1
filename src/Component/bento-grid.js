import { useState } from 'react'
import Link from 'next/link'
import { Icon } from "@iconify/react";

export default function BentoGrid() {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const toggleFilter = (filter) => {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };


    return <section className="relative h-screen py-8 grid grid-cols-3 grid-rows-2 gap-5 bg-gradient-to-br overflow-hidden">
        <div className=" col-span-full flex justify-center items-center font-bold text-8xl text-slate-800 bento_bg_1 shadow-sm rounded-3xl border border-gray-300">
            Find <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your Interests
        </div>
        <div className="p-8 col-span-2 bento_bg_2 shadow-sm flex flex-col justify-between rounded-3xl">
            <span className="font-semibold text-xl text-fuchsia-950">Find the Gigs and Courses</span>

            <div>
                <div className="pl-4 mt-6 flex items-center gap-4 bg-gray-100 rounded-[2rem]">
                    <Icon icon="lucide:search" className="text-2xl text-slate-700" />
                    <div className="relative w-full">
                        <input
                            id="search-input"
                            type="text"
                            placeholder="Type to search..."
                            className="w-full h-12 pl-12 pr-24 text-gray-800 bg-white rounded-full border border-gray-200 
                outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                shadow-sm hover:shadow-md transition-shadow duration-200"
                        />
                        <Link href="/market-place" className="absolute right-1 top-1/2 -translate-y-1/2 px-6 h-10 bg-slate-800 text-gray-100 rounded-full hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center">
                            Search
                        </Link>
                    </div>
                </div>

                <div className="w-full mt-10 flex justify-between items-center">
                    <span className="text-fuchsia-950">Learning scope</span>
                    <div className="flex flex-wrap gap-3">
                        {['Online', 'Physical', 'Hybrid'].map((filter) => <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 
                  ${selectedFilters.includes(filter) ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {filter}
                        </button>)}
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 col-span-1 flex flex-col justify-between bento_bg_3 shadow-sm rounded-3xl">
            <span className="font-semibold text-xl text-fuchsia-950">Find People</span>
            <div className="w-full mt-10 flex justify-between items-center">
                <div className="flex flex-wrap gap-3">
                    {['Mentor', 'Student', 'Mentorpreneur'].map((filter) => <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 
                      ${selectedFilters.includes(filter)
                                ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {filter}
                    </button>)}
                </div>
            </div>
            <div className="pl-4 mt-6 flex items-center gap-4 bg-gray-100 rounded-[2rem]">
                <Icon icon="lucide:search" className="text-2xl text-slate-700" />
                <input
                    id="search-input"
                    type="text"
                    placeholder="Type to search..."
                    className="w-full h-12 pl-12 pr-4 text-gray-800 bg-white rounded-full border border-gray-200 
                        outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        shadow-sm hover:shadow-md transition-shadow duration-200"/>
            </div>
            <Link href="/find-people" className="w-full py-2 text-center rounded-3xl bg-slate-800 hover:bg-blue-800 text-gray-100 backdrop-blur">Search</Link>
        </div>
    </section>
}
