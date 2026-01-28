import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

const categories = [
  { id: "1", name: "Продукты", type: "expense" },
  { id: "2", name: "Транспорт", type: "expense" },
  { id: "3", name: "Развлечения", type: "expense" },
  { id: "4", name: "Зарплата", type: "income" },
  { id: "5", name: "Фриланс", type: "income" },
]

export function TransactionDetailPage() {
  const navigate = useNavigate()
  const { transactionId } = useParams()
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    title: "Пятёрочка",
    amount: "2340",
    categoryId: "1",
    date: new Date("2026-01-27"),
    note: "Продукты на неделю"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated transaction:", formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    console.log("Deleting transaction:", transactionId)
    navigate("/")
  }

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
            onClick={() => navigate(-1)}
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-2xl font-bold">Транзакция</h1>
          {!isEditing && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Icon name="Pencil" size={20} />
            </Button>
          )}
          {isEditing && <div className="w-10" />}
        </div>

        {!isEditing ? (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{formData.title}</h2>
                  <p className="text-sm text-gray-500">
                    {format(formData.date, "d MMMM yyyy", { locale: ru })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-rose-600">- {formData.amount} ₽</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Категория</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <Icon name="ShoppingCart" size={16} />
                    </div>
                    <p className="font-medium">
                      {categories.find(c => c.id === formData.categoryId)?.name}
                    </p>
                  </div>
                </div>

                {formData.note && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Заметка</p>
                    <p className="text-gray-700">{formData.note}</p>
                  </div>
                )}
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Icon name="Trash2" size={20} className="mr-2" />
                  Удалить транзакцию
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить транзакцию?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие нельзя отменить. Транзакция будет удалена навсегда.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700">
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div>
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount">Сумма</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="pr-12"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                </div>
              </div>

              <div>
                <Label htmlFor="category">Категория</Label>
                <Select 
                  value={formData.categoryId} 
                  onValueChange={(value) => setFormData({...formData, categoryId: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-xs font-semibold text-emerald-600">Доходы</div>
                    {categories.filter(c => c.type === "income").map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                    <div className="px-2 py-1.5 text-xs font-semibold text-rose-600 mt-2">Расходы</div>
                    {categories.filter(c => c.type === "expense").map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Дата</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Icon name="Calendar" className="mr-2 h-4 w-4" />
                      {format(formData.date, "d MMMM yyyy", { locale: ru })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData({...formData, date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="note">Заметка</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </Button>
              <Button type="submit" className="flex-1">
                Сохранить
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </main>
  )
}
