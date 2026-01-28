import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  id: string
  title: string
  iconName: string
  color: string
  type: "income" | "expense"
}

const initialCategories: Category[] = [
  { id: "1", title: "Зарплата", iconName: "Briefcase", color: "text-emerald-600", type: "income" },
  { id: "2", title: "Фриланс", iconName: "Code", color: "text-blue-600", type: "income" },
  { id: "3", title: "Продукты", iconName: "ShoppingCart", color: "text-orange-600", type: "expense" },
  { id: "4", title: "Транспорт", iconName: "Car", color: "text-purple-600", type: "expense" },
  { id: "5", title: "Развлечения", iconName: "Smile", color: "text-pink-600", type: "expense" },
]

const iconOptions = [
  "Briefcase", "Code", "ShoppingCart", "Car", "Smile", "Home", "Coffee", 
  "Heart", "Gift", "Plane", "Book", "Music", "Film", "Utensils"
]

const colorOptions = [
  { label: "Зелёный", value: "text-emerald-600" },
  { label: "Синий", value: "text-blue-600" },
  { label: "Оранжевый", value: "text-orange-600" },
  { label: "Фиолетовый", value: "text-purple-600" },
  { label: "Розовый", value: "text-pink-600" },
  { label: "Красный", value: "text-rose-600" },
]

export function CategoriesPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    iconName: "ShoppingCart",
    color: "text-gray-700",
    type: "expense" as "income" | "expense"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...editingCategory, ...formData }
          : cat
      ))
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData
      }
      setCategories([...categories, newCategory])
    }
    
    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData({ title: "", iconName: "ShoppingCart", color: "text-gray-700", type: "expense" })
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      title: category.title,
      iconName: category.iconName,
      color: category.color,
      type: category.type
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id))
  }

  const incomeCategories = categories.filter(cat => cat.type === "income")
  const expenseCategories = categories.filter(cat => cat.type === "expense")

  return (
    <main className="relative min-h-screen px-6 py-10">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mx-auto max-w-[600px]"
      >
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-2xl font-bold">Категории</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" onClick={() => {
                setEditingCategory(null)
                setFormData({ title: "", iconName: "ShoppingCart", color: "text-gray-700", type: "expense" })
              }}>
                <Icon name="Plus" size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Редактировать категорию" : "Новая категория"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Например: Продукты"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Тип</Label>
                  <Select value={formData.type} onValueChange={(value: "income" | "expense") => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Доход</SelectItem>
                      <SelectItem value="expense">Расход</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="icon">Иконка</Label>
                  <Select value={formData.iconName} onValueChange={(value) => setFormData({...formData, iconName: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(icon => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                            <Icon name={icon} size={16} />
                            {icon}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Цвет</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({...formData, color: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map(color => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${color.value.replace('text-', 'bg-')}`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  {editingCategory ? "Сохранить" : "Создать"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-emerald-600">Доходы</h2>
            <div className="space-y-2">
              {incomeCategories.map(category => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${category.color}`}>
                      <Icon name={category.iconName} size={20} />
                    </div>
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                      <Icon name="Trash2" size={16} className="text-rose-600" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-rose-600">Расходы</h2>
            <div className="space-y-2">
              {expenseCategories.map(category => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${category.color}`}>
                      <Icon name={category.iconName} size={20} />
                    </div>
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                      <Icon name="Trash2" size={16} className="text-rose-600" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
