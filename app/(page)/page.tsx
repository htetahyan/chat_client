// pages/Page.js

'use client';
import React from 'react';
import Dashboard from '~/components/home/DashboardChart';

const Page = () => {
  return <div className='h-screen overflow-y-scroll overflow-x-hidden'> <Dashboard />
  </div>;
};

export default Page;
