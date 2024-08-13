'use client'
import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import { CardStackIcon, ChatBubbleIcon, DrawingPinIcon, HamburgerMenuIcon, HomeIcon, MinusCircledIcon, PersonIcon } from '@radix-ui/react-icons';
import { EdusnLogo } from '~/utils/exporter';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
    {
        name: 'Home',
        path: '/',
        icon: <HomeIcon className="h-8 w-8 text-gray-500" />
    },
    {
        name: 'Chats',
        path: '/chats',
        icon: <ChatBubbleIcon className="h-8 w-8 text-gray-500" />
    },
    
    {
        name: 'Snippets',
        path: '/snippets',
        icon: <DrawingPinIcon className="h-12 w-12 text-gray-500" />
    },
    {
        name: 'Archive',
        path: '/archive',
        icon: <CardStackIcon className="h-8 w-8 text-gray-500" />
    },
  
    {
        name: 'Logout',
        path: '/logout',
        icon: <MinusCircledIcon className="h-8 w-8 text-red-500" />
    }
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const pathname = usePathname()
const router = useRouter()
useLayoutEffect(() => {
    menuItems.forEach((item) => {
        router.prefetch(item.path)
    })
})

    return (
        <div>
            {/* Header for small screens */}
            <div className="md:hidden flex items-center justify-between p-4 shadow-lg bg-white">
                <Image src={EdusnLogo} alt="logo" className={'h-8 w-auto'} />
                <button onClick={toggleMenu} className="text-gray-500">
                    <HamburgerMenuIcon className="h-8 w-8" />
                </button>
            </div>

            {/* Sidebar for medium to large screens */}
            <div className={`md:w-[10vw] bg-white w-full md:h-screen p-6 flex md:flex-col shadow-lg ${isOpen ? 'block' : 'hidden'} md:block`}>
                {/* Chat Icon */}
                <Image src={EdusnLogo} alt="logo" className={'h-16 w-auto'} />

                <div className='md:mb-8 w-full mt-20 '>
                    <ul className='md:space-y-10 md:grid justify-around items-center  w-full flex md:grid-cols-1'>
                        {menuItems.map((item, index) => (
                            <Button onClick={() => router.push(item.path)} 
                            onKeyDown={(e)=>{
                                if(e.key === 'Enter'){
                                    router.push(item.path)
                                }
                            }}
                            variant='ghost' className={item.path === pathname ? 'border-none w-full bg-slate-100' : 'border-none w-full'} key={index} startContent={item.icon}>
                                 
                                    <span className='ml-2'>{item.name}</span>
                            
                            </Button>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
