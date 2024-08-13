'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '@nextui-org/react';
import { useGetFilesFromUserQuery } from '~/actions/query/ChatRoomApi';

const ChatDocs = ({ receiverId }: { receiverId: number }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data } = useGetFilesFromUserQuery({ chatId: `${receiverId}_CS`, page: 0, limit: 10 });
  const { messages = [] } = data || {};

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : messages.length - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < messages.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="max-w-[40vw] w-[40vw] h-screen relative overflow-y-scroll bg-[#0e1129]">
      <div className='w-full bg-gray-100 h-[5vh] p-2'>
        <h1 className="text-2xl text-center font-bold mb-4">Images</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4 rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => openLightbox(index)}>
            <Image
              src={msg.url}
              alt='doc'
              className='object-cover  hover:opacity-90'
              width={300} // Set width to desired size
              height={300} // Set height to desired size
              layout='intrinsic'
            />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-screen-lg max-h-screen">
            <Button
              className="absolute top-4 right-4 z-10 text-white"
              color='danger'
              onClick={closeLightbox}
            >
              Close
            </Button>
            <button
              className="absolute -left-10 z-10 top-1/2 transform -translate-y-1/2 text-white"
              onClick={prevImage}
            >
              <ChevronLeftIcon width={32} height={32} />
            </button>
            <button
              className="absolute -right-10 z-10 top-1/2 transform -translate-y-1/2 text-white"
              onClick={nextImage}
            >
              <ChevronRightIcon width={32} height={32} />
            </button>
            <Image
              src={messages[currentImageIndex]?.url || ''}
              alt='doc'
              className='object-contain'
              layout='fill'
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatDocs;
