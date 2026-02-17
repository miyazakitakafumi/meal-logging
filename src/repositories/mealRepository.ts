import { supabase } from '../lib/supabaseClient'
import type { Meal, MealFormData, MealRepository } from '../types'

export const createMealRepository = (): MealRepository => {
  const findAll = async (): Promise<Meal[]> => {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .order('meal_date', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw new Error(`献立の取得に失敗: ${error.message}`)
    return data || []
  }

  const create = async (meal: MealFormData): Promise<void> => {
    const { error } = await supabase
      .from('meals')
      .insert([meal])

    if (error) throw new Error(`献立の登録に失敗: ${error.message}`)
  }

  const update = async (id: string, meal: MealFormData): Promise<void> => {
    const { error } = await supabase
      .from('meals')
      .update(meal)
      .eq('id', id)

    if (error) throw new Error(`献立の更新に失敗: ${error.message}`)
  }

  const deleteById = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`献立の削除に失敗: ${error.message}`)
  }

  return {
    findAll,
    create,
    update,
    delete: deleteById,
  }
}
