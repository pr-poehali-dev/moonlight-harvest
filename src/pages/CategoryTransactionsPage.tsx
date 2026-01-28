import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Transaction {
  id: string
  title: string
  amount: number
  date: string
  category: string
}

const mockTransactions: Transaction[] = [
  { id: "1", title: "Пятёрочка", amount: -2340, date: "2026-01-27", category: "Продукты" },
  { id: "2", title: "Перекрёсток", amount: -1580, date: "2026-01-26", category: "Продукты" },
  { id: "3", title: "Магнит", amount: -980, date: "2026-01-25", category: "Продукты" },
  { id: "4", title: "Лента", amount: -3200, date: "2026-01-24", category: "Продукты" },
  { id: "5", title: "Ашан", amount: -4500, date: "2026-01-23", category: "Продукты" },
]

export function CategoryTransactionsPage() {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? "+ " : "- "
    return sign + Math.abs(amount).toLocaleString('ru-RU') + " ₽"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  }

  const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0)

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
          <div className="text-center">
            <h1 className="text-2xl font-bold">Продукты</h1>
            <p className="text-sm text-gray-600">{mockTransactions.length} транзакций</p>
          </div>
          <Button 
            size="icon"
            onClick={() => navigate("/transactions/new?category=" + categoryId)}
          >
            <Icon name="Plus" size={20} />
          </Button>
        </div>

        <Card className="p-6 mb-6 bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-orange-600">
                <Icon name="ShoppingCart" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Всего потрачено</p>
                <p className="text-2xl font-bold text-orange-600">{formatAmount(totalAmount)}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Транзакции</h2>
          <div className="space-y-2">
            {mockTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/transactions/${transaction.id}`)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`font-semibold ${transaction.amount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {formatAmount(transaction.amount)}
                  </p>
                  <Icon name="ChevronRight" size={20} className="text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}
