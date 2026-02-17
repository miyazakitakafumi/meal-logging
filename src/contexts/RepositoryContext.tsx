import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { MealRepository } from '../types'
import { createMealRepository } from '../repositories/mealRepository'

const RepositoryContext = createContext<MealRepository | null>(null)

type RepositoryProviderProps = {
  children: ReactNode
  repository?: MealRepository
}

export const RepositoryProvider = ({ children, repository }: RepositoryProviderProps) => {
  const repo = repository || createMealRepository()
  
  return (
    <RepositoryContext.Provider value={repo}>
      {children}
    </RepositoryContext.Provider>
  )
}

export const useRepository = (): MealRepository => {
  const context = useContext(RepositoryContext)
  if (!context) {
    throw new Error('useRepository must be used within RepositoryProvider')
  }
  return context
}
