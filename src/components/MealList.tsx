import type { Meal } from '../types'
import MealCard from './MealCard'

type MealListProps = {
  meals: Meal[]
  onEdit: (meal: Meal) => void
  onDelete: (id: string) => void
}

const MealList = ({ meals, onEdit, onDelete }: MealListProps) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">まだ献立が登録されていません</p>
        <p className="text-sm text-gray-400 mt-2">上のフォームから献立を登録してください</p>
      </div>
    )
  }

  // 日付でグループ化
  const groupedMeals = meals.reduce((groups, meal) => {
    const date = meal.meal_date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(meal)
    return groups
  }, {} as Record<string, Meal[]>)

  // 日付でソート（新しい順）
  const sortedDates = Object.keys(groupedMeals).sort((a, b) => b.localeCompare(a))

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            {new Date(date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'short',
            })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedMeals[date]
              .sort((a, b) => {
                const order = { '朝食': 1, '昼食': 2, '夕食': 3 }
                return order[a.meal_type] - order[b.meal_type]
              })
              .map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MealList
