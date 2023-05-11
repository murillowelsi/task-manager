'use client'

import useNewTaskModal from '@/app/hooks/useNewTaskModal'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Heading from '../Heading'
import Input from '../Input'
import CategoryInput from '../inputs/CategoryInput'
import { categories } from '../navbar/Categories'
import Modal from './Modal'

enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
}

const NewTaskModal = () => {
  const newTaskModal = useNewTaskModal()
  const router = useRouter()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

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
      completed: false,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext()
    }

    setIsLoading(true)

    axios
      .post('/api/tasks', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        newTaskModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => setIsLoading(false))
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
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
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
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

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your task?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          disabled={isLoading}
          errors={errors}
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={newTaskModal.isOpen}
      onClose={newTaskModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Create your task!"
      body={bodyContent}
    />
  )
}

export default NewTaskModal
