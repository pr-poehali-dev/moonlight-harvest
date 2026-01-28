import { motion } from "framer-motion"

interface Transaction {
  label: string
  amount: string
}

interface SocialFooterProps {
  transactions: Transaction[]
}

export function SocialFooter({ transactions }: SocialFooterProps) {
  return (
    <div
      className="rounded-[20px] px-5 py-5 w-full"
      style={{
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        boxShadow: `
          inset 0 1px 1px rgba(255, 255, 255, 0.8),
          inset 0 -1px 1px rgba(255, 255, 255, 0.1),
          0 0 0 1px rgba(255, 255, 255, 0.5),
          0 2px 8px rgba(0, 0, 0, 0.04),
          0 8px 24px rgba(0, 0, 0, 0.06)
        `,
        border: "1px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Последние транзакции</h3>
      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{transaction.label}</span>
            <span className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}