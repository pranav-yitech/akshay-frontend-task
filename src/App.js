import { Route, Routes } from "react-router-dom"
import TableComponent from "./Components/DataTable"

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<TableComponent />} />
        <Route path="/administrator" element={<TableComponent />} />
        <Route path="/logger-search" element={<TableComponent />} />
      </Routes>
    </div>
  )
}

export default App
