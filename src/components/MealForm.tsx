import { useState, useEffect } from 'react'
import type { Meal, MealFormData, MealType } from '../types'

type MealFormProps = {
  onSubmit: (data: MealFormData) => void
  editingMeal?: Meal | null
  onCancel?: () => void
}

const MealForm = ({ onSubmit, editingMeal, onCancel }: MealFormProps) => {
  const [mealName, setMealName] = useState('')
  const [mealDate, setMealDate] = useState('')
  const [mealType, setMealType] = useState<MealType>('昼食')

  useEffect(() => {
    if (editingMeal) {
      setMealName(editingMeal.meal_name)
      setMealDate(editingMeal.meal_date)
      setMealType(editingMeal.meal_type)
    } else {
      // 新規登録時は今日の日付を設定
      setMealDate(new Date().toISOString().split('T')[0])
    }
  }, [editingMeal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mealName.trim() || !mealDate) return

    onSubmit({
      meal_name: mealName.trim(),
      meal_date: mealDate,
      meal_type: mealType,
    })

    // フォームをリセット
    if (!editingMeal) {
      setMealName('')
      setMealDate(new Date().toISOString().split('T')[0])
      setMealType('昼食')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-stone-200">
      <h2 className="text-xl font-bold mb-4 text-stone-700">
        {editingMeal ? '献立を編集' : '献立を登録'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="mealName" className="block text-sm font-medium text-stone-600 mb-1">
            料理名
          </label>
          <input
            type="text"
            id="mealName"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            placeholder="例: カレーライス"
            required
          />
        </div>

        <div>
          <label htmlFor="mealDate" className="block text-sm font-medium text-stone-600 mb-1">
            日付
          </label>
          <input
            type="date"
            id="mealDate"
            value={mealDate}
            onChange={(e) => setMealDate(e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            required
          />
        </div>

        <div>
          <label htmlFor="mealType" className="block text-sm font-medium text-stone-600 mb-1">
            食事の種類
          </label>
          <select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value as MealType)}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          >
            <option value="朝食">朝食</option>
            <option value="昼食">昼食</option>
            <option value="夕食">夕食</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-amber-200 text-amber-800 px-4 py-2 rounded-md hover:bg-amber-300 transition-colors font-medium"
          >
            {editingMeal ? '更新' : '登録'}
          </button>
          {editingMeal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-stone-200 rounded-md hover:bg-stone-50 transition-colors"
            >
              キャンセル
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default MealForm
