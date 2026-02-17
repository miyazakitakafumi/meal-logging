import { useState } from 'react'
import type { Meal, MealFormData } from './types'
import { useRepository } from './contexts/RepositoryContext'
import { useMeals } from './hooks/useMeals'
import MealForm from './components/MealForm'
import MealList from './components/MealList'

const App = () => {
  const repository = useRepository()
  const { meals, loading, error, addMeal, updateMeal, deleteMeal } = useMeals(repository)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)

  const handleAddMeal = async (data: MealFormData) => {
    try {
      await addMeal(data)
    } catch (err) {
      alert(err instanceof Error ? err.message : '献立の登録に失敗しました')
    }
  }

  const handleUpdateMeal = async (data: MealFormData) => {
    if (!editingMeal) return

    try {
      await updateMeal(editingMeal.id, data)
      setEditingMeal(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : '献立の更新に失敗しました')
    }
  }

  const handleDeleteMeal = async (id: string) => {
    try {
      await deleteMeal(id)
    } catch (err) {
      alert(err instanceof Error ? err.message : '献立の削除に失敗しました')
    }
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-stone-700">🍽️ 献立記録アプリ</h1>
          <p className="text-stone-500 mt-2">毎日の食事を記録しましょう</p>
        </header>

        <MealForm
          onSubmit={editingMeal ? handleUpdateMeal : handleAddMeal}
          editingMeal={editingMeal}
          onCancel={() => setEditingMeal(null)}
        />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-400">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <MealList
            meals={meals}
            onEdit={setEditingMeal}
            onDelete={handleDeleteMeal}
          />
        )}
      </div>
    </div>
  )
}

export default App
