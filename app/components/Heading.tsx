'use client'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2-xl font-bold text-zinc-300">{title}</div>
      <div className="mt-2 font-light text-neutral-300">{subtitle}</div>
    </div>
  )
}

export default Heading
