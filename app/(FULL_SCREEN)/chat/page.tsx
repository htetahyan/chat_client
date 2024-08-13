import React from 'react';
import {Button, Input} from "@nextui-org/react";
import {EdusnLogo, Send_icon} from "~/utils/exporter";
import Image from "next/image";
import {Switch} from "@nextui-org/switch";
const Page = () => {
    return (
        <div className="px-2 h-screen ">

            <Button color={'secondary'} className={'h-[5%] w-fit p-2 mb-[2.5%] mt-[2.5%] '}>Back</Button>
            <div className="flex items-center justify-between w-full h-[10%] ">
                <Image src={EdusnLogo} alt="logo" className={'h-8 w-auto'}/>
                <Switch color={'secondary'}/>

            </div>
            <div className={'h-[80%]  p-4 relative'}>
             <div>  <div className="mb-2 p-2 bg-white rounded shadow self-start">
                    "Hello, how are you today?"
                </div>
             
             </div>
                <div className="mb-2 p-2 bg-blue-200 rounded shadow self-end text-right">
                    "I'm doing well, thanks for asking!"
                </div>

                <div className={'fixed bottom-2 w-full flex items-end '}><Input/>
                    <Button>
               <Image src={Send_icon} alt={'send_icon'} className={'w-6 h-6'} />
                    </Button>
                </div>
            </div>


        </div>
    );
};

export default Page;
