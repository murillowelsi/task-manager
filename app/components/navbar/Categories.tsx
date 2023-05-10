'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { GiRunningShoe } from 'react-icons/gi'
import {
  RiAlarmLine,
  RiBookLine,
  RiBriefcaseLine,
  RiCalendar2Line,
  RiHome2Line,
  RiLightbulbFlashLine,
  RiMedalLine,
  RiMoneyDollarBoxLine,
  RiNotification2Line,
  RiPhoneLine,
  RiPlaneLine,
  RiProjector2Line,
  RiUserLine,
} from 'react-icons/ri'
import CategoryBox from '../CategoryBox'
import Container from '../Container'

export const categories = [
  {
    label: 'Work',
    icon: RiBriefcaseLine,
    description: 'Tasks related to your work or job.',
  },
  {
    label: 'Personal',
    icon: RiUserLine,
    description:
      'Tasks related to your personal life, such as appointments or hobbies.',
  },
  {
    label: 'Home',
    icon: RiHome2Line,
    description: 'Tasks related to taking care of your home or living space.',
  },
  {
    label: 'Health & fitness',
    icon: GiRunningShoe,
    description: 'Tasks related to your health and fitness goals.',
  },
  {
    label: 'Financial',
    icon: RiMoneyDollarBoxLine,
    description:
      'Tasks related to managing your finances, such as paying bills or saving money.',
  },
  {
    label: 'Travel',
    icon: RiPlaneLine,
    description: 'Tasks related to planning or preparing for travel.',
  },
  {
    label: 'School',
    icon: RiBookLine,
    description: 'Tasks related to school or academic assignments.',
  },
  {
    label: 'Projects',
    icon: RiProjector2Line,
    description:
      'Tasks related to managing projects, either personal or professional.',
  },
  {
    label: 'Deadlines',
    icon: RiAlarmLine,
    description: 'Tasks with specific deadlines or due dates.',
  },
  {
    label: 'Calls/emails',
    icon: RiPhoneLine,
    description: 'Tasks related to making calls or sending emails.',
  },
  {
    label: 'Meetings',
    icon: RiCalendar2Line,
    description: 'Tasks related to attending or organizing meetings.',
  },
  {
    label: 'Reminders',
    icon: RiNotification2Line,
    description:
      'Tasks that serve as reminders for important events or deadlines.',
  },
  {
    label: 'Goals',
    icon: RiLightbulbFlashLine,
    description: 'Tasks related to achieving personal or professional goals.',
  },
  {
    label: 'Self-improvement',
    icon: RiMedalLine,
    description: 'Tasks related to self-improvement or personal development.',
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
