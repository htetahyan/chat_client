import React from 'react';
import Image from "next/image";
import {EdusnLogo} from "~/utils/exporter";
import {Button} from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
    return (
        <div className={'flex w-full p-2 px-4 h-[8vh] justify-between items-center'}>
            <Image src={EdusnLogo} alt={'Logo'} className={'h-12 w-auto'}/>
           <Link href={'/login'} prefetch={true} about={' login Page '}> <Button variant={'bordered'} color={'secondary'}>Login</Button>
           </Link>
        </div>
    );
};

export default Header;