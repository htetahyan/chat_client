import React from 'react';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ArchiveIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

interface MessagePopoverContentProps {
    id: number;
    type: string;
}

export const MessagePopoverContent: React.FC<MessagePopoverContentProps> = ({ id,type }) => {
    return (
  
            <Listbox
             className="w-fit max-w-[260px] bg-slate-100 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
                aria-label="Actions"
                onAction={(key) => alert(key)}
            >
                <ListboxItem key="new" startContent={<ArchiveIcon className='h-6 w-6' />}
                    description="Save the file or Message to your archive"
                >Save To Archive</ListboxItem>
                <ListboxItem showDivider key="edit" description="Edit your message" startContent={<Pencil2Icon className='h-6 w-6' />}>Edit message</ListboxItem>
                <ListboxItem key="delete" className="text-danger" color="danger"
                    description={`Permanently delete the ${ type ==="text" ? "message" : "file"}`}
                    startContent={<TrashIcon className='h-6 w-6' />}
                >
                    Delete {type ==="text" ? "message" : "file"}
                </ListboxItem>
            </Listbox>

    );
};
