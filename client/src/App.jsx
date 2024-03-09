import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {createContext, useState} from "react"
import './stylesheets/App.css'

import WelcomePage from "./components/WelcomePage"
import Login from "./components/Login"
import Signup  from "./components/Signup"
import Home from "./components/Home"
import EditProfile from "./components/EditProfile"

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path="/" element={<WelcomePage/>}></Route>
          <Route path="/log-in" element={<Login/>}></Route>
          <Route path="/sign-up" element={<Signup/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/profile" element={<EditProfile/>}></Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  )
}

export default App
