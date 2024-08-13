"use client"
import React from 'react';
import Image from "next/image";
import { EdusnLogo } from "~/utils/exporter";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { useFormik } from 'formik';
import { useMutation} from '@tanstack/react-query'
import * as Yup from 'yup';
import {loginAction} from "~/actions/AuthActions";
import {useLoginMutation} from "~/actions/query/AuthApiQuery";

const loginSchema = Yup.object().shape({
    phone: Yup.string().matches(/^[0-9]{10,}$/, 'Phone number is not valid').required('Required'),
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
});

const Page = () => {

    const [login,{isLoading}]=useLoginMutation()

    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {

   await login(values);
        },
    });

    return (
        <div className={'w-screen flex h-screen lg:h-fit items-center justify-center'}>
            <div className={'h-fit w-[90%] p-2 lg:grid lg:grid-cols-2'}>
                <Image className={'justify-self-center w-auto mx-0 my-auto'} src={EdusnLogo} alt={'edusn Logo'} />
                <div className={'h-full flex justify-center items-center'}>
                    <div className={'lg:h-[60%] w-full p-4 h-fit lg:p-8'}>
                        <h1 className={'font-bold text-center text-2xl lg:text-3xl'}>
                            Login to Your Account
                        </h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={'grid grid-cols-1 gap-4 lg:gap-8 mt-5 lg:mt-20'}>
                                <label htmlFor={'phone'}>Phone</label>
                                <Input
                                    placeholder={'Phone'}
                                    type='tel'
                                    autoComplete={'off'}
                                    inputMode={'tel'}
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className="text-red-500">{formik.errors.phone}</div>
                                ) : null}

                                <label htmlFor={'password'}>Password</label>
                                <Input
                                    placeholder={'Password'}
                                    type='password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500">{formik.errors.password}</div>
                                ) : null}

                                <div className={'flex items-center justify-between'}>
                                    <div>
                                        <Checkbox color={'secondary'} />
                                        <span className={'text-gray-500'}>remember me</span>
                                    </div>
                                    <p className={'text-[#7F265B] font-normal'}>Forgot password?</p>
                                </div>
                                <Button
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    className={'lg:w-[30%] w-full justify-self-end'} size={'md'} color={'secondary'} type='submit'>
                                    Submit
                                </Button>
                            </div>
                            <div className={'grid grid-cols-1 gap-4 lg:gap-8 mt-5 lg:mt-10'}>
                                <h2 className={'text-[#7F265B] cursor-pointer'}>Don&rsquo;t have an account?</h2>
                                <Button type={'button'}>Login as a guest user</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
