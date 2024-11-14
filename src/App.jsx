 import Home from "./pages/Home"
 import { BrowserRouter, Routes, Route} from "react-router-dom"
 import Cart from "./pages/Cart"
 import Layout from "./components/Layout"
 import NoPage from "./pages/NoPage"
 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="Cart"element={<Cart/>}/>
          <Route path="*"element={<NoPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>


  )
}

export default App
