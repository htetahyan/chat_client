import {useFormik} from "formik";

import * as Yup from "yup";
import React from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Textarea,
    useDisclosure
} from "@nextui-org/react";
import {Pencil2Icon, PlusIcon} from "@radix-ui/react-icons";
import {CloseIcon} from "@nextui-org/shared-icons";
import {useCreateSnippetMutation, useGetAllSnippetQuery} from "~/actions/query/GeneralApiQuery";

const SnippetCreateTrigger = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div className="w-full h-[10vh] mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Snippets</h1>
    <Button onPress={onOpen}>
        <span className="mr-2">Create Snippet</span>
        <Pencil2Icon className="text-blue-500" />
    </Button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
isDismissable={false}            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add a new snippet </ModalHeader>
                         <CreateSnippetForm onClose={onClose}/>
                        </>
                    )}
                </ModalContent>
            </Modal>
</div>
    );
};

export default SnippetCreateTrigger;
export const CreateSnippetForm = ({ onClose }: { onClose: () => void }) => {
    const [createSnippet, { isLoading }] = useCreateSnippetMutation();
    const formik = useFormik({
        initialValues: {
            name: '',
            content: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            content: Yup.string().required('Content is required'),
        }),
        onSubmit: async (values) => {
         await createSnippet(values).unwrap().finally( () => onClose() );
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <ModalBody>
                <Input
                    type="text"
                    label="Snippet Name"
                    name="name"  // Set the name to match the key in initialValues
                    color={ formik.touched.name && formik.errors.name ? "danger" : "default" }
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    className="w-full"
                />
                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm ml-2">{formik.errors.name}</p>}
                <Textarea
                    name="content"  // Set the name to match the key in initialValues
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    disableAutosize
                    color={ formik.touched.content && formik.errors.content ? "danger" : "default" }
                    label="Snippet Content"
                    classNames={{
                        input: "resize-y min-h-[40px]",
                    }}
                    className="w-full mt-2"
                />
                {formik.touched.content && formik.errors.content && <p className="text-red-500 text-sm ml-2">{formik.errors.content}</p>}

            </ModalBody>
            <ModalFooter className="flex justify-between">
                <Button
                    color="danger"
                    startContent={<CloseIcon className="w-4 h-4" />}
                    variant="light"
                    onPress={onClose}
                >
                    Close
                </Button>
                <Button
                    color="primary"
                    startContent={<PlusIcon className="w-4 h-4" />}
                    className="shadow-lg shadow-indigo-500/20"
                    type={'submit'}
                >
                    Submit
                </Button>
            </ModalFooter>
        </form>
    );
};
