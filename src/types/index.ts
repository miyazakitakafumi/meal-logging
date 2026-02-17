export type MealType = '朝食' | '昼食' | '夕食'

export type Meal = {
  id: string
  meal_name: string
  meal_date: string
  meal_type: MealType
  rank: number
  created_at?: string
}

export type MealFormData = {
  meal_name: string
  meal_date: string
  meal_type: MealType
  rank: number
}
