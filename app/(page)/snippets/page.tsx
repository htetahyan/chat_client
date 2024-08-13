'use client'
import React from 'react';

import SnippetComponents from "~/components/snippets/SnippetComponents";
import SnippetCreateTrigger from "~/components/snippets/SnippetCreateTrigger";

const Page = () => {
    return (
        <div className="w-[90vw] px-4 mx-auto">
            <SnippetCreateTrigger/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
             <SnippetComponents/>
            </div>
        </div>
    );
};

export default Page;
