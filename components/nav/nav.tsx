'use client'

import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {
  menuItem,
  menuItems,
  menuLogoutItems,
  menuSettingsItems,
} from './nav.helpers'
import { FC } from 'react'
import { useTranslations } from 'next-intl'

const NavMenuItem: FC<{ item: menuItem }> = ({ item }) => {
  const path = usePathname()
  const t = useTranslations('nav.elems')

  const isSelected = item.value === path.split('/')[1]

  return (
    <li
      className={cn(
        'hover:text-blue-default',
        isSelected && 'text-blue-bright'
      )}
    >
      <Link
        href={item.href}
        className={cn(
          'flex flex-row gap-2 w-full my-2 hover:text-blue-default'
        )}
      >
        {item.icon}
        <p
          className={cn(
            'text-base text-grey-dark font-medium w-full hover:text-blue-default',
            isSelected && 'text-blue-bright'
          )}
        >
          {t(item.value)}
        </p>
      </Link>
    </li>
  )
}

export const NavComponent = () => {
  return (
    <div className="flex flex-col relative h-fit bg-white w-[295px] p-6">
      <div className="flex flex-col pb-6">
        <Avatar className="pb-2">
          <AvatarImage
            src="/avatar.png"
            alt="Avatar Image"
            width={80}
            height={80}
            className="rounded-full w-[80px] h-[80px]"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-lg text-[#1A3F7A] font-bold">Name Surname</p>
        <p className="text-base text-grey-default font-normal">Operator</p>
        <p className="text-base text-grey-default font-normal">
          name@gmail.com
        </p>
      </div>
      <Separator />
      <ul className="flex flex-col py-6 w-full">
        {menuItems.map((menuItem) => (
          <NavMenuItem key={menuItem.value} item={menuItem} />
        ))}
      </ul>
      <Separator />
      <ul className="flex flex-col py-6 w-full">
        {menuSettingsItems.map((menuItem) => (
          <NavMenuItem key={menuItem.value} item={menuItem} />
        ))}
      </ul>
      <Separator />
      <ul className="flex flex-col py-6 w-full">
        {menuLogoutItems.map((menuItem) => (
          <NavMenuItem key={menuItem.value} item={menuItem} />
        ))}
      </ul>
    </div>
  )
}
