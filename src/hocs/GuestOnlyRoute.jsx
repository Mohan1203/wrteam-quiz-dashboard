'use client'

// Next Imports
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const GuestOnlyRoute = ({ children, lang }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const session = useSelector((state) => state.User.token)

  useEffect(() => {
    if (session) {
      router.replace(getLocalizedUrl(themeConfig.homePageUrl, lang))
    }
    setIsLoading(false)
  }, [session, router, lang])

  if (isLoading) {
    return null // or a loading spinner
  }

  return <>{children}</>
}

export default GuestOnlyRoute
