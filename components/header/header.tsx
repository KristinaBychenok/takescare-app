'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import { BugIcon, CalendarPlusIcon, GlobeIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { usePathname, useRouter } from 'next/navigation'
import { getCookie } from '@/lib/utils'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

const langs = [
  {
    value: 'en',
    label: 'EN',
  },
  {
    value: 'pl',
    label: 'PL',
  },
]

export const Header = () => {
  const router = useRouter()
  const path = usePathname()
  const t = useTranslations('header')

  const handleChangeLang = (value: string) => {
    document.cookie = `locale=${value}; path=${path}`
    router.refresh()
  }

  const defaultLang = useMemo(() => getCookie('locale') || 'pl', [])

  return (
    <div className="w-full bg-white flex flex-row py-6 px-16 fixed items-center justify-between">
      <div>
        <Image src={'/TC-logo.png'} alt="logo" width={191} height={48}></Image>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <Button
          variant={'outline'}
          className="text-[#D61C00] border border-[#D61C00] shadow-none"
        >
          <BugIcon />
          {t('reportButton')}
        </Button>
        <Button
          variant={'outline'}
          className="text-white bg-blue-bright border-none shadow-none"
        >
          <CalendarPlusIcon />
          {t('appointmentButton')}
        </Button>
        <div>
          <Select
            onValueChange={(v) => handleChangeLang(v)}
            defaultValue={defaultLang}
          >
            <SelectTrigger className="text-blue-bright gap-2 border-none shadow-none">
              <GlobeIcon />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {langs.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
