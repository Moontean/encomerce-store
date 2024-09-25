import { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}