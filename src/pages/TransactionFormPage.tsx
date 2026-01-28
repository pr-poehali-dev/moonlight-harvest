import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

const categories = [
  { id: "1", name: "Продукты", type: "expense" },
  { id: "2", name: "Транспорт", type: "expense" },
  { id: "3", name: "Развлечения", type: "expense" },
  { id: "4", name: "Зарплата", type: "income" },
  { id: "5", name: "Фриланс", type: "income" },
]

export function TransactionFormPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("category")

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    categoryId: categoryId || "",
    date: new Date(),
    note: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transaction data:", formData)
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
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-2xl font-bold ml-4">Новая транзакция</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Например: Супермаркет"
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
                  placeholder="0"
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
                  <SelectValue placeholder="Выберите категорию" />
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
              <Label htmlFor="note">Заметка (необязательно)</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="Добавьте заметку..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Сохранить
            </Button>
          </div>
        </form>
      </motion.div>
    </main>
  )
}
