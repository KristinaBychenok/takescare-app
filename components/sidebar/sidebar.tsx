'use client'

import { useAppSelector } from '@/store/hooks'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { useTranslations } from 'next-intl'
import { convertToRoman } from '../appointment/home-visits/helpers'

const AccordionList = ({
  items,
  handleScroll,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  handleScroll: (
    event: React.MouseEvent<HTMLAnchorElement>,
    elId: string
  ) => void
}) => (
  <ul className="w-full">
    {items.map((i, itemIndex) => (
      <AccordionContent
        key={i.id || i.title + itemIndex}
        className="hover:bg-[#E4E5E7] w-full text-sm font-medium px-4 py-2 rounded"
        aria-labelledby={i.id}
      >
        <a
          href={i.url}
          onClick={(e) => handleScroll(e, i.id)}
          aria-label={i.title}
        >
          {i.title}
        </a>
      </AccordionContent>
    ))}
  </ul>
)

export const SidebarComponent = () => {
  const t = useTranslations('homeVisits.sidebar')
  const navMenu = useAppSelector((state) => state.homeVisitNav.nav)
  const storePatients = useAppSelector(
    (state) => state.homeVisitPatients.patients
  )

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    elId: string
  ) => {
    event.preventDefault()
    const container = document.getElementById('scrollableSection')
    const target = document.getElementById(elId)

    if (container && target) {
      const targetPosition = target.offsetTop - container.offsetTop
      container.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    }
  }

  const translateItems = (
    title: string,
    items: {
      title: string
      id: string
      url: string
    }[]
  ) => {
    if (title === 'patient') {
      return items.map((item) => ({
        ...item,
        title: t(`${title}.${item.id.split('-')[1]}`),
      }))
    }
    return items.map((item) => ({
      ...item,
      title: t(`${title}.${item.id}`),
    }))
  }

  return (
    <div className="flex relative h-fit bg-white w-[295px] p-6">
      <Accordion type="single" collapsible className="w-full h-full">
        <AccordionItem
          value="Go to"
          className="border-none"
          aria-labelledby="accordion-trigger-go-to"
        >
          <AccordionTrigger
            id="accordion-trigger-go-to"
            className="border-b border-grey-light hover:no-underline text-sm font-medium text-blue-dark"
            aria-controls="accordion-content-go-to"
          >
            {t('title')}
          </AccordionTrigger>
          <AccordionContent
            id="accordion-content-go-to"
            aria-labelledby="accordion-trigger-go-to"
          >
            <Accordion key={navMenu.visit.title} type="single" collapsible>
              <AccordionItem
                value={navMenu.visit.title}
                className="border-none"
                aria-labelledby={`accordion-trigger-${navMenu.visit.title}`}
              >
                <AccordionTrigger
                  className="hover:no-underline text-sm font-medium"
                  id={`accordion-trigger-${navMenu.visit.title}`}
                  aria-controls={`accordion-content-${navMenu.visit.title}`}
                >
                  {t('visit.title')}
                </AccordionTrigger>
                <AccordionList
                  items={translateItems('visit', navMenu.visit.items)}
                  handleScroll={handleScroll}
                />
              </AccordionItem>
            </Accordion>

            {navMenu.patients.map((menuItem, menuIndex) => (
              <Accordion
                key={menuItem.id || menuIndex}
                type="single"
                collapsible
              >
                <AccordionItem
                  value={menuItem.title}
                  className="border-none"
                  aria-labelledby={`accordion-trigger-${menuItem.title}`}
                >
                  <AccordionTrigger
                    className="hover:no-underline text-sm font-medium"
                    id={`accordion-trigger-${menuItem.title}`}
                    aria-controls={`accordion-content-${menuItem.title}`}
                  >
                    {`${t('patient.title')} ${
                      storePatients.length > 1
                        ? convertToRoman(menuIndex + 1)
                        : ''
                    }`}
                  </AccordionTrigger>
                  <AccordionList
                    items={translateItems('patient', menuItem.items)}
                    handleScroll={handleScroll}
                  />
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
