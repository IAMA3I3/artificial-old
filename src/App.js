import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Navbar from "./components/Navbar"
import About from "./screens/About"
import Footer from "./components/Footer"
import Exhibition from "./screens/Exhibition"
import ScrollUpBtn from "./components/ScrollUpBtn"
import AdminRegister from "./screens/AdminRegister"
import AdminLogin from "./screens/AdminLogin"
import AdminDashboard from "./screens/AdminDashboard"
import ArtDetail from "./screens/ArtDetail"
import AddArts from "./screens/subscreens/AddArts"
import ManageArtDetail from "./screens/subscreens/ManageArtDetail"
import EditArt from "./screens/subscreens/EditArt"

const App = () => {

  const [darkMode, setDarkMode] = useState(undefined)
  const [offset, setOffset] = useState(0)

  const switchMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true")
      window.document.documentElement.classList.add("dark")
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false")
      window.document.documentElement.classList.remove("dark")
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true")
    }

    window.onscroll = () => {
      setOffset(window.scrollY)
    }
  }, [darkMode])

  return (
    <BrowserRouter>

      <Navbar offset={offset} switchMode={switchMode} darkMode={darkMode} />

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ArtDetail />} path="/art_detail/:id" />
        <Route element={<About />} path="/about" />
        <Route element={<Exhibition />} path="/exhibition" />
        <Route element={<AdminRegister />} path="/admin_register" />
        <Route element={<AdminLogin />} path="/admin_login" />
        <Route element={<AdminDashboard switchMode={switchMode} darkMode={darkMode} />} path="/admin_dashboard" />
        <Route element={<AddArts />} path="/add_art" />
        <Route element={<ManageArtDetail />} path="/manage_art_detail/:id" />
        <Route element={<EditArt />} path="/edit_art/:id" />
      </Routes>

      <Footer darkMode={darkMode} />

      <ScrollUpBtn offset={offset} />

    </BrowserRouter>
  )
}

export default App