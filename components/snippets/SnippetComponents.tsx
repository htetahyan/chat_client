
'use client';
import React from "react";
import {Input, Snippet, Tooltip} from "@nextui-org/react";
import {Pencil2Icon, TrashIcon} from "@radix-ui/react-icons";
import {useGetAllSnippetQuery} from "~/actions/query/GeneralApiQuery";

 const SnippetComponents = () => {
    const {data}=useGetAllSnippetQuery({})
    return (
        <div className="flex flex-col space-y-4">
            {data?.map((snippet: { id:number ; name: string; content: string; }, i: any)=>(
                <SnippetComponent key={i}  id={snippet.id} name={snippet.name} content={snippet.content}/>
            ))}
        </div>
    )
};
 export default SnippetComponents;

const SnippetComponent = ({id,name,content}:{id:number,name:string,content:string}) => {
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);
    const text=" Thank you for reaching out. The school fees for the upcoming term are [insert fee amount]. This\n" +
        "                    includes tuition, materials, and other essential services. Payment is due by [insert deadline date].\n" +
        "                    You can make payments via bank transfer or online through our school's payment portal.\n" +
        "\n" +
        "                    If you have any further questions or need assistance, feel free to contact us.\n" +
        "\n" +
        "                    Best regards, [Customer Service Representative's Name] [School Name] Customer Service"

    return (
        <div className="bg-white shadow-lg rounded-lg p-4" key={id}>
            <h2 className="text-xl font-semibold mb-2">{name}#</h2>

            <div className="flex justify-end space-x-2">
                <Tooltip title="Delete">
                    <TrashIcon className="cursor-pointer text-red-500 hover:text-red-700" />
                </Tooltip>
                <Tooltip title="Edit">
                    <Pencil2Icon  onClick={() => setIsEditorOpen(!isEditorOpen)} className="cursor-pointer text-blue-500 hover:text-blue-700" />
                </Tooltip>
            </div>
            { isEditorOpen ? <Input size={'lg'}  className={"h-fit w-full text-ellipsis whitespace-normal break-words "} value={content} readOnly />:
                <Snippet symbol={''} tooltipProps={ { content: 'Edit' }} className={'w-full'} >
                    <p className={'w-full text-ellipsis whitespace-normal break-words '}>{text}
                    </p>
                </Snippet>}

        </div>
    );
};
