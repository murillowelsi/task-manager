'use client'

import useNewTaskModal from '@/app/hooks/useNewTaskModal'
import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import { categories } from '../navbar/Categories'
import Modal from './Modal'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const NewTaskModal = () => {
  const newTaskModal = useNewTaskModal()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your task?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-3">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={newTaskModal.isOpen}
      onClose={newTaskModal.onClose}
      onSubmit={newTaskModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Create your task!"
      body={bodyContent}
    />
  )
}

export default NewTaskModal