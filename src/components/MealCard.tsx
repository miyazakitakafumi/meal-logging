import type { Meal } from '../types'

interface MealCardProps {
  meal: Meal
  onEdit: (meal: Meal) => void
  onDelete: (id: string) => void
}

const MealCard = ({ meal, onEdit, onDelete }: MealCardProps) => {
  const getMealTypeColor = (type: string) => {
    switch (type) {
      case '朝食':
        return 'bg-yellow-100 text-yellow-800'
      case '昼食':
        return 'bg-green-100 text-green-800'
      case '夕食':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{meal.meal_name}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getMealTypeColor(meal.meal_type)}`}>
          {meal.meal_type}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        {new Date(meal.meal_date).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(meal)}
          className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          編集
        </button>
        <button
          onClick={() => {
            if (window.confirm('この献立を削除しますか？')) {
              onDelete(meal.id)
            }
          }}
          className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium"
        >
          削除
        </button>
      </div>
    </div>
  )
}

export default MealCard
