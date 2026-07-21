import { createContext } from 'react'
import type { WatchedContextType } from '../types/watched'

export const WatchedContext = createContext<WatchedContextType | null>(null)
