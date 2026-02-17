import { useState, useEffect, useCallback } from 'react'
import { supabase } from './lib/supabaseClient'
import type { Meal, MealType } from './types'
import MealForm from './components/MealForm'
import MealList from './components/MealList'

const App = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 献立を取得
  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('meal_date', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setMeals(data || [])
    } catch (err) {
      console.error('Error fetching meals:', err)
      setError('献立の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals])

  // 献立を追加
  const handleAddMeal = async (data: { meal_name: string; meal_date: string; meal_type: MealType }) => {
    try {
      const { error } = await supabase
        .from('meals')
        .insert([data])

      if (error) throw error
      await fetchMeals()
    } catch (err) {
      console.error('Error adding meal:', err)
      alert('献立の登録に失敗しました')
    }
  }

  // 献立を更新
  const handleUpdateMeal = async (data: { meal_name: string; meal_date: string; meal_type: MealType }) => {
    if (!editingMeal) return

    try {
      const { error } = await supabase
        .from('meals')
        .update(data)
        .eq('id', editingMeal.id)

      if (error) throw error
      await fetchMeals()
      setEditingMeal(null)
    } catch (err) {
      console.error('Error updating meal:', err)
      alert('献立の更新に失敗しました')
    }
  }

  // 献立を削除
  const handleDeleteMeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchMeals()
    } catch (err) {
      console.error('Error deleting meal:', err)
      alert('献立の削除に失敗しました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🍽️ 献立記録アプリ</h1>
          <p className="text-gray-600 mt-2">毎日の食事を記録しましょう</p>
        </header>

        <MealForm
          onSubmit={editingMeal ? handleUpdateMeal : handleAddMeal}
          editingMeal={editingMeal}
          onCancel={() => setEditingMeal(null)}
        />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
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
