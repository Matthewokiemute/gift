import CreateGiftForm from '@/components/CreateGiftForm'
import PageLayout from '@/components/PageLayout'
import React from 'react'

const createGift = () => {
  return (
    <PageLayout>
        <h1 className="text-3xl font-bold text-center mt-4 mb-2 text-slate-600">Create a Gift Link</h1>
        <CreateGiftForm />
    </PageLayout>
  )
}

export default createGift