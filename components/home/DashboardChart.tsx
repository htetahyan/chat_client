// components/home/Dashboard.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Dummy data for demonstration
  const dummyData = {
    totalUsers: 1200,
    unreadMessages: 340,
    sessions: [40, 30, 37, 35, 32, 28, 27, 10],
    engagedSessions: 1158,
    engagementRate: '24.31%',
    sessionsPerUser: 35.55,
    activeUsers: 982,
    newUsers: 841,
    views: 681,
    conversions: 931
  };

  const chartData = {
    labels: ['Email', 'Referral', 'Paid Search', 'Other', 'Direct', 'Social', 'Display', 'Organic Search'],
    datasets: [
      {
        data: dummyData.sessions,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#C9CBCF', '#FF5733'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-[90vw] p-8 bg-gray-100 min-h-screen'>
      <div className='max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold mb-4'>EDUSN Chat Dashboard</h1>
        <p className='text-gray-700 mb-6'>
          Welcome to the EDUSN Chat Dashboard. Here you can see some statistics and insights about your chat.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-medium mb-2'>Engaged Sessions</h2>
            <div className='text-3xl font-bold text-blue-600'>{dummyData.engagedSessions}</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-medium mb-2'>Engagement Rate</h2>
            <div className='text-3xl font-bold text-green-600'>{dummyData.engagementRate}</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-medium mb-2'>Active Users</h2>
            <div className='text-3xl font-bold text-red-600'>{dummyData.activeUsers}</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-medium mb-2'>New Users</h2>
            <div className='text-3xl font-bold text-orange-600'>{dummyData.newUsers}</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-medium mb-2'>Views</h2>
            <div className='text-3xl font-bold text-pink-600'>{dummyData.views}</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-medium mb-2'>Conversions</h2>
            <div className='text-3xl font-bold text-indigo-600'>{dummyData.conversions}</div>
          </div>
        </div>

        <div className='p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 mb-4 md:mb-0'>
            <h2 className='text-xl font-medium mb-2'>Sessions Overview</h2>
            <div className='text-3xl font-bold text-gray-800'>
              Here you can monitor key metrics and manage your application efficiently.
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <Doughnut
              data={chartData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
