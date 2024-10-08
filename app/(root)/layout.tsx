import { ReactNode } from 'react'


import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'

export default async function SetupLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  })

  
  if (store) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}