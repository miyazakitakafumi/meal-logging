export type MealType = '朝食' | '昼食' | '夕食'

export interface Meal {
  id: string
  meal_name: string
  meal_date: string
  meal_type: MealType
  created_at?: string
}

export interface MealFormData {
  meal_name: string
  meal_date: string
  meal_type: MealType
}
