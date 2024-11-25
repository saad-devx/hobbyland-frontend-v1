import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

import pfp1 from '@/../public/images/pfp1.webp';
import pfp2 from '@/../public/images/pfp2.webp';
import pfp3 from '@/../public/images/pfp3.webp';
import pfp4 from '@/../public/images/pfp4.webp';
import pfp5 from '@/../public/images/pfp5.webp';
import pfp6 from '@/../public/images/pfp6.webp';

const testimonials = [
    {
        content: "Thank you so much! You did an incredible job that went above and beyond all my expectations! I'm really glad I put my trust in you! I look forward to working with you again in the future!",
        author: "Sarah Johnson",
        image: pfp4
    },
    {
        content: "Incredible user experience and top-notch support. The results exceeded my expectations completely!",
        author: "Michael Chen",
        image: pfp2
    },
    {
        content: "Game-changing solution for our team. The attention to detail and care was absolutely remarkable!",
        author: "Emma Davis",
        image: pfp6
    },
    {
        content: "Outstanding service and exceptional quality. I couldn't be happier with the results!",
        author: "Alex Thompson",
        image: pfp1
    },
    {
        content: "The best decision I've made. The work quality exceeded all my expectations!",
        author: "Rachel Kim",
        image: pfp5
    },
    {
        content: "Revolutionary approach and amazing results. Looking forward to working together again!",
        author: "David Martinez",
        image: pfp3
    }
];

const TestimonialCard = ({ content, author, image }) => (
    <div className="relative w-96 h-60 p-8 mx-4 flex flex-col justify-between items-center rounded-[2.5rem] bg-white ">
        <div className="absolute left-[10%] -top-1/2 translate-y-1/2 rounded-[10rem] w-28 aspect-square border-[8px] border-zinc-100 overflow-hidden">
            <Image src={image} className="w-full h-full object-cover object-center" />
        </div>

        <div className="w-full flex flex-col items-end text-right text-xs font-semibold uppercase">
            {author}
            <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Icon key={i} icon="ph:star-four-fill" className='text-amber-400' />)}
            </div>
        </div>

        <div className="">
            <p className="max-h-40 overflow-hidden text-ellipsis"><Icon icon="gg:quote" className='text-4xl text-slate-700 translate-y-[20%]' />{content}</p>
        </div>
    </div>
);

const InfiniteScrollTestimonials = () => {
    return (
        <div className="py-20 bg-zinc-100 rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-28">
                    What Our Users Say
                </h2>

                <div className="relative mb-10">
                    <div className="animate-scroll-right flex">
                        {[...testimonials, ...testimonials].map((testimonial, idx) => (
                            <div key={idx} className="inline-block">
                                <TestimonialCard {...testimonial} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="animate-scroll-left flex">
                        {[...testimonials, ...testimonials].map((testimonial, idx) => (
                            <div key={idx} className="inline-block">
                                <TestimonialCard {...testimonial} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-right {
          animation: scrollRight 40s linear infinite;
        }

        .animate-scroll-left {
          animation: scrollLeft 40s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default InfiniteScrollTestimonials;