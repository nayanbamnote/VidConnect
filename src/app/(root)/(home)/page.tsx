import MeetingList from '@/components/MeetingList';
import React from 'react'

const home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format(now);

  return (
    <div className=''>
      <div className='h-[300px] w-full bg-hero bg-cover flex flex-col justify-between pl-5 py-7 rounded-3xl '>
        <div className='bg-[#5a6270] w-fit text-xl p-1 rounded-lg'>
          Upcoming Meeting at 12:30
        </div>

        <div className='flex flex-col'>
          <div className='lg:text-7xl text-4xl font-extrabold'>{time}</div>
          <div className='text-xl'>{date}</div>
        </div>

      </div>

      <MeetingList />
    </div>
  )
}

export default home