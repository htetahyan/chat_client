'use client'
import React, {LegacyRef, MutableRefObject, useRef, useState} from 'react';
import {Button, Chip, Input, Textarea, Tooltip} from "@nextui-org/react";
import {DrawingPinIcon, Link1Icon, Link2Icon, PaperPlaneIcon, Pencil2Icon} from "@radix-ui/react-icons";
import {useSendFileToUserMutation, useSendToUserMutation} from "~/actions/query/ChatRoomApi";
import {useDispatch} from "react-redux";
import {addToQueue, Message} from "~/actions/query/MessageSlice";
import { toast } from 'sonner';

const SendMessage = ({receiverId}:{receiverId:number}) => {
    const [message,setMessages]=useState("")
    const [sendMessage,{isLoading}]=useSendToUserMutation()
    const [sendFile,{isLoading:isFileSending}]=useSendFileToUserMutation()
    const fileInputRef = useRef<HTMLInputElement | any>();
const dispatch=useDispatch();
const [file, setFile] = useState<any>(null);
    const send=async()=>{
if(message.length===0 && file===null){
    toast.warning("Sending \"\" is not allowed")
    return;
}
const data:Message ={
    content:file ?file.name :message,
    receiverId:receiverId,
    tempId: new Date().getTime(),
    status:'PENDING'
}
if(file){
 const formData = new FormData();
 formData.append("file", file);
 const jsonData = JSON.stringify(data);
 const jsonBlob = new Blob([jsonData],{type:"application/json"});
 formData.append("message", jsonBlob);

 dispatch(addToQueue(data))

 await sendFile(formData).unwrap()
}else{
    dispatch(addToQueue(data))
    await sendMessage(data).unwrap()
}
     
    }
  
    const onFileChange=(e:any)=>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    return (
        <div className={'w-full min-h-[10vh] px-1  relative h-fit p-2 '}>
            {<div className={'absolute -top-[10vh] border-gray-500 w-full flex items-center justify-between '}>
                <SearchSnippets/>
            </div>
            }
            <Tooltip content={'Snippet'} >
            <DrawingPinIcon className={'w-6 h-6 cursor-pointer hover:opacity-65 '} onClick={()=> toast.info("Coming Soon!")}/>
                </Tooltip >
            <footer
                className={`bg-white  flex w-full items-center justify-between will-change-transform transition-transform mt-5 ${file ? "h-fit" : "h-fit]"}`}>

                {file ? <Chip className='p-4' onClose={() => setFile(null)}>{file.name}</Chip> :
                    <textarea
                        color='primary'

                        onChange={(e) => setMessages(e.target.value)}
                        value={message}
                        className={'flex-grow h-auto border-1 outline-2 outline-blue-700 max-h-[120px] p-2 relative rounded mr-4 overflow-y-auto resize-none'}
                        placeholder="Type your message..."
                    />
                }
                {!file &&
                    <Link2Icon onClick={() => fileInputRef!.current!.click()} className={'text-black h-12 w-12 mr-2'}/>}
                <input
                    type="file"
                    accept="*/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            if (file.name.includes('.')) {
                                setFile( file)
                            } else {
toast.warning("Directory not allowed! Please select a file!")                         }
                        }
                    }}
                    hidden
                />


                <Button isLoading={isLoading || isFileSending} onClick={send} color={'primary'} isIconOnly={true}
                        endContent={<PaperPlaneIcon className={'text-white h-12'}/>}>

                </Button>
            </footer>

        </div>
    );
};

export default SendMessage;
const SearchSnippets = () => {
return (
    <></>
)
}