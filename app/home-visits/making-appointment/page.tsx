'use client'

import React, { useEffect } from 'react'
import { HomeVisitsComponent } from '@/components/appointment/home-visits/home-visits'
import { SidebarComponent } from '@/components/sidebar/sidebar'
import { NavComponent } from '@/components/nav/nav'
import { usePathname } from 'next/navigation'
import { getCookie } from '@/lib/utils'

// mock data
const homeVisitsLoadedData = {
  visitTypes: ['Home Visit', 'Clinic Visit', 'Telemedicine', 'Follow-Up'],
  specializations: [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'General Medicine',
    'Pediatrics',
  ],
  topics: [
    'Heart Health',
    'Back Pain',
    'Pediatric Care',
    'Diabetes Management',
    'Stress and Mental Health',
  ],
  languagesOfVisit: [
    'Polish',
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
  ],
}
// mock data
const patientHomeVisitsLoadedData = {
  countries: [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kazakhstan',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'North Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
  ],
  symptoms: [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Nausea',
    'Dizziness',
    'Shortness of Breath',
    'Sore Throat',
    'Muscle Pain',
    'Loss of Taste or Smell',
  ],
}

export default function HomeVisits() {
  const path = usePathname()
  useEffect(() => {
    const locale = getCookie('locale')

    if (!locale) {
      document.cookie = `locale=pl; path=${path}`
    }
  }, [path])

  return (
    <>
      <div className="hidden md:flex overflow-y-auto custom-scrollbar">
        <NavComponent />
      </div>
      <div
        id="scrollableSection"
        className="flex overflow-y-auto custom-scrollbar z-10 h-screen-minus-252"
      >
        <HomeVisitsComponent
          visitLoadedData={homeVisitsLoadedData}
          patientLoadedData={patientHomeVisitsLoadedData}
        />
      </div>
      <div className="hidden md:flex overflow-y-auto custom-scrollbar">
        <SidebarComponent />
      </div>
    </>
  )
}
