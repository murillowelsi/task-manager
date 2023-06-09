'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  register,
  disabled,
  formatPrice,
  required,
  type = 'text',
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          rounded-md
          border-2
          bg-transparent
          p-4
          pt-6
          font-light
          text-zinc-300
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70 
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
        text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:scale-100
        peer-focus:-translate-y-4    
        peer-focus:scale-75  
        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}  
      `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
