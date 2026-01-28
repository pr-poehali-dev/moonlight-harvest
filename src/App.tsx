import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LinkBioPage } from "./pages/LinkBioPage"
import { CategoriesPage } from "./pages/CategoriesPage"
import { CategoryTransactionsPage } from "./pages/CategoryTransactionsPage"
import { TransactionFormPage } from "./pages/TransactionFormPage"
import { TransactionDetailPage } from "./pages/TransactionDetailPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LinkBioPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoryTransactionsPage />} />
        <Route path="/transactions/new" element={<TransactionFormPage />} />
        <Route path="/transactions/:transactionId" element={<TransactionDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App