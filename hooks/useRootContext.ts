import { RootContextTypes } from '@/types'
import { createContext, useContext } from 'react'

export const RootContext = createContext<RootContextTypes | null>(null)

export const useRootContext = () => useContext(RootContext) as RootContextTypes
