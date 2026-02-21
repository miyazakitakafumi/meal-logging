export type MealType = '朝食' | '昼食' | '夕食'

export type Meal = {
  id: string
  meal_name: string
  meal_date: string
  meal_type: MealType
  rank: number
  isHallOfFame: boolean
  created_at?: string
}

export type MealFormData = {
  meal_name: string
  meal_date: string
  meal_type: MealType
  rank: number
  isHallOfFame: boolean
}

export type MealRepository = {
  findAll: () => Promise<Meal[]>
  create: (meal: MealFormData) => Promise<void>
  update: (id: string, meal: MealFormData) => Promise<void>
  delete: (id: string) => Promise<void>
}
