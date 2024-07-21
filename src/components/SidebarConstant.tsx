import { CalendarCheck, CalendarClock, Cctv, Home, Plus } from "lucide-react";

export const SidebarConstant = [
  {
    label: 'Home',
    route: '/',
    icon: <Home />,
  },
  {
    label: 'Upcoming',
    route: '/upcoming',
    icon: <CalendarClock />,
  },
  {
    label: 'Previous',
    route: '/previous',
    icon: <CalendarCheck />,
  },
  {
    label: 'Recording',
    route: '/recording',
    icon: <Cctv />,
  },
  {
    label: 'Personal Room',
    route: '/personal-room',
    icon: <Plus />,
  },
];

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];