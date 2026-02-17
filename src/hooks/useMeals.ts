import { useState, useCallback, useEffect } from 'react'
import type { Meal, MealFormData, MealRepository } from '../types'

export const useMeals = (repository: MealRepository) => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await repository.findAll()
      setMeals(data)
    } catch (err) {
      console.error('Error fetching meals:', err)
      setError(err instanceof Error ? err.message : '献立の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [repository])

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals])

  const addMeal = async (data: MealFormData) => {
    try {
      await repository.create(data)
      await fetchMeals()
    } catch (err) {
      console.error('Error adding meal:', err)
      throw err
    }
  }

  const updateMeal = async (id: string, data: MealFormData) => {
    try {
      await repository.update(id, data)
      await fetchMeals()
    } catch (err) {
      console.error('Error updating meal:', err)
      throw err
    }
  }

  const deleteMeal = async (id: string) => {
    try {
      await repository.delete(id)
      await fetchMeals()
    } catch (err) {
      console.error('Error deleting meal:', err)
      throw err
    }
  }

  return {
    meals,
    loading,
    error,
    fetchMeals,
    addMeal,
    updateMeal,
    deleteMeal,
  }
}
