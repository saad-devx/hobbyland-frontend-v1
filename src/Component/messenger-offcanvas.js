import React, { useState } from 'react';
import {
    X, SearchIcon, MessagesSquare, StarIcon, Clock, Settings,
    ChevronRight, SendHorizontal, ChevronLeft,
    Video, Phone, Maximize2,
    Paperclip, Smile, MoreVertical
} from 'lucide-react';

const messages = [
    { id: 1, text: "Hi there!", sent: false, time: "10:30 AM" },
    { id: 2, text: "Hello! How can I help?", sent: true, time: "10:31 AM" },
]

const MessengerOffcanvas = ({ show = false, setShow }) => {
    const [activeTab, setActiveTab] = useState('recent');
    const [showChat, setShowChat] = useState(false);

    return (
        <div className={`fixed z-[70] top-0 right-0 h-screen w-[40%] bg-white transform transition-all duration-300 ease-in-out ${show ? 'translate-x-0' : 'translate-x-full'} shadow-[-8px_0_30px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden`}>
            <div className="relative h-48 bg-gradient-to-br from-orange-400 to-blue-500 rounded-bl-[6rem]">
                <button onClick={() => { setShow(false); setShowChat(false) }} className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                    <X size={20} />
                </button>
                <div className="absolute bottom-12 left-6">
                    <h2 className="text-white text-2xl font-semibold">Messages</h2>
                    <p className="text-white/80 text-sm">Connect with your network</p>
                </div>
            </div>

            <div className="px-6 -mt-6 mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full py-3 px-5 pr-12 rounded-3xl bg-white shadow-lg focus:outline-none outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    />
                    <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <section className={`absolute z-[75] bottom-0 -left-full right-0 w-full h-full flex flex-col bg-white/20 backdrop-blur origin-top ${!showChat ? " pointer-events-none" : 'translate-x-full'} overflow-hidden transition-all duration-300`}>
                <div className="p-3 border-b border-gray-100 bg-white/50 backdrop-blur-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setShowChat(false)} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                                <ChevronLeft className="text-gray-600" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-lg font-semibold">
                                        E
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Elizabeth</h3>
                                    <p className="text-sm text-gray-500">Active now</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                                <Phone size={20} />
                            </button>
                            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                                <Video size={20} />
                            </button>
                            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                                <Maximize2 size={20} />
                            </button>
                            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="h-full flex flex-col"> */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {messages.map((message) => <div key={message.id} className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] group ${message.sent ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 rounded-2xl ${message.sent
                                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                                : 'bg-white shadow-sm border border-gray-100 text-gray-800'
                                }`}>
                                <p className="leading-relaxed">{message.text}</p>
                                <span className={`text-xs mt-2 block ${message.sent ? 'text-white/70' : 'text-gray-400'}`}>
                                    {message.time}
                                </span>
                            </div>
                        </div>
                    </div>)}
                </div>

                <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                            <Paperclip size={20} />
                        </button>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-gray-400 transition-all"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
                                <Smile size={20} />
                            </button>
                        </div>
                        <button className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20">
                            <SendHorizontal size={20} />
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </section>

            <div className="px-6 mb-4">
                <div className="flex space-x-2 bg-gray-50 p-1 rounded-xl">
                    {[
                        { id: 'recent', icon: Clock, label: 'Recent' },
                        { id: 'starred', icon: StarIcon, label: 'Starred' },
                        { id: 'all', icon: MessagesSquare, label: 'All' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-white shadow-sm text-slate-800'
                                : 'text-gray-500 hover:bg-white/50'}`}>
                            <tab.icon size={16} className="mx-auto mb-1" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <div key={i} onClick={() => setShowChat(true)} className="group mb-4 p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-400 flex items-center justify-center text-white font-medium">
                                {String.fromCharCode(65 + i)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">User {i + 1}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">Hey! how are you...</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">2m ago</span>
                                <ChevronRight className='text-slate-500 group-hover:translate-x-2 transition-all' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 border-t border-gray-100">
                <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-100 rounded-3xl flex items-center justify-center space-x-2 transition-colors">
                    <Settings size={18} className="text-gray-600" />
                    <span className="font-medium text-gray-600">Settings</span>
                </button>
            </div>
            {/* </section> */}
        </div>
    );
};

export default MessengerOffcanvas;