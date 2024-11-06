'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const { user, token, setUser, setToken } = useAuthStore()
  const router = useRouter()

  const logout = () => {
    // Clear the user and token from Zustand store
    setUser(null)
    setToken(null)

    // Remove the authToken cookie
    document.cookie = 'authToken=; Max-Age=0; path=/;'

    // Redirect to home
    router.push('/')
  }

  return { user, token, logout }
}
