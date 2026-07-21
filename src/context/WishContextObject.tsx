import { createContext } from 'react'
import type { WishContextType } from '../types/wish'

export const WishContext = createContext<WishContextType | null>(null)
