import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface BreadcrumbComponentProps {
  items: { value: string; label: string; href: string; isSelected: boolean }[]
}

export const BreadcrumbComponent: FC<BreadcrumbComponentProps> = ({
  items,
}) => {
  const t = useTranslations('homeVisits.breadcrumb')
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((i, index) => (
          <div key={i.value} className="flex flex-row gap-2 items-center">
            <BreadcrumbItem
              className={cn(
                'text-sm font-normal',
                i.isSelected ? 'text-grey-dark' : 'text-grey-default'
              )}
            >
              <BreadcrumbLink href={i.href}>{t(`${index}`)}</BreadcrumbLink>
            </BreadcrumbItem>
            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
