
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Layout from "./components/Layout"
import NoPage from "./pages/NoPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Category from "./pages/Category"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route index element={<Home/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="/category/:category" element={<Category/>} />
        <Route path="*" element={<NoPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App
