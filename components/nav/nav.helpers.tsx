import {
  Briefcase,
  CalendarDaysIcon,
  ChartNoAxesColumnIcon,
  CircleHelpIcon,
  HeadsetIcon,
  HospitalIcon,
  HouseIcon,
  LayersIcon,
  LogOutIcon,
  NotepadTextIcon,
  SettingsIcon,
} from 'lucide-react'
import { ReactNode } from 'react'

export interface menuItem {
  value: string
  label: string
  href: string
  icon: ReactNode
}

export const menuItems: menuItem[] = [
  { value: 'homePage', label: 'Home page', href: '#/', icon: <HouseIcon /> },
  {
    value: 'onlineVisits',
    label: 'Online visits',
    href: '#/online-visits',
    icon: <HeadsetIcon />,
  },
  {
    value: 'homeVisits',
    label: 'Home visits',
    href: '/home-visits/making-appointment',
    icon: <Briefcase />,
  },
  {
    value: 'stationaryVisits',
    label: 'Stationary visits',
    href: '#/stationary-visits',
    icon: <HospitalIcon />,
  },
  {
    value: 'secondOpinion',
    label: 'Second opinion',
    href: '#/second-opinion',
    icon: <LayersIcon />,
  },
  {
    value: 'activityLog',
    label: 'Activity log',
    href: '#/activity-log',
    icon: <NotepadTextIcon />,
  },
  {
    value: 'specialistCalendar',
    label: 'Specialist calendar',
    href: '#/specialist-calendar',
    icon: <CalendarDaysIcon />,
  },
  {
    value: 'reports',
    label: 'Reports',
    href: '#/reports',
    icon: <ChartNoAxesColumnIcon />,
  },
]

export const menuSettingsItems: menuItem[] = [
  {
    value: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
  },
  { value: 'faq', label: 'FAQ', href: '/faq', icon: <CircleHelpIcon /> },
]

export const menuLogoutItems: menuItem[] = [
  {
    value: 'logOut',
    label: 'Log out',
    href: '/log-out',
    icon: <LogOutIcon />,
  },
]
