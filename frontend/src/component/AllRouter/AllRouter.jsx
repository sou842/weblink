import { Routes, Route } from "react-router-dom"
import { Home } from "../../pages/Home/Home"
import { Login } from "../../pages/Login/Login"
import { MainRouter } from "./MainRouter"



export const AllRouter = () =>{


return (
    <Routes>
        <Route path='/*' element={<MainRouter/>}></Route>
    </Routes>
)
}