'use client'
// Third-party Imports
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import {session} from 'next-auth'
// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

export default function AuthGuard({ children, locale }) {
  const [isLoading, setIsLoading] = useState(true)
  const session = useSelector((state) => state.User.token)

  useEffect(() => {
    setIsLoading(false)
  }, [session])

  if (isLoading) {
    return null // or a loading spinner
  }

  return <>{session ? children : <AuthRedirect lang={locale} />}</>
}
