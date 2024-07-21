/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Calendar, Cctv, Plus, User } from 'lucide-react'



const MeetingList = () => {
  const { toast } = useToast()
  const {user} = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetail, setCallDetail] = useState<Call>()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const router = useRouter();

  const createMeeting = async () => {
    if(!client || !user) return;

    try {
      if(!values.dateTime){
        toast({
          variant: "destructive",
          title: "Please select a date and time",
        })
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id)

      if(!call) throw new Error('Failed to create call')

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instatn meeting';

      // Upsert behavior
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetail(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`)
        toast({
          title: "Meeting created successfully",
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        variant:"destructive",
        title: "Failed to create meeting",
      })
    }
  }

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-7 xl:grid-cols-4">
      <HomeCard 
      icon= {<Plus size={40} />}
      title = 'New Meeting'
      discription='Start an instant meeting'
      handleClick = {()=>{setMeetingState('isInstantMeeting')}}
      className = 'bg-[#fe742d]'
      />
      <HomeCard 
      icon= {<User size={40} />}
      title = 'Join Meeting'
      discription='via invitation link'
      handleClick = {()=>{setMeetingState('isJoiningMeeting')}}
      className = 'bg-[#0d78f9]'
      />
      <HomeCard 
      icon= {<Calendar size={40} />}
      title = 'Schedule Meeting'
      discription='plan your meeting'
      handleClick = {()=>{setMeetingState('isScheduleMeeting')}}
      className = 'bg-[#810cf9]'
      />
      <HomeCard 
      icon= {<Cctv size={40} />}
      title = 'View Recording'
      discription='Meeting Recording'
      handleClick = {()=> router.push('/recordings')}
      className = 'bg-[#f8a80c]'
      />

{!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-[#252A41] p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/images/checked.svg'}
          buttonIcon="/images/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    </section>
  )
}

export default MeetingList