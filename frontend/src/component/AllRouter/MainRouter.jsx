import { Routes, Route } from "react-router-dom"
import { Home } from "../../pages/Home/Home"
import { Box } from "@chakra-ui/react"
import { LeftSidebar } from "../LeftSidebar/LeftSidebar"
import { RightSidebar } from "../RightSidebar/RightSidebar"
import { CreatePost } from "../../pages/CreatePost/CreatePost"



export const MainRouter = () => {


    return (
        <Box bg={'black'} display={'flex'} justifyContent={'space-between'} height={'100vh'} overflow={'scroll'}>
            <Box w={'20%'}>
                <LeftSidebar />
            </Box>
            <Box bg={'#1E1E1E'} w={'59%'} overflow={'scroll'} css={{ '-ms-overflow-style': 'none', scrollbarWidth: 'none' }}>
                <style>{`::-webkit-scrollbar {display: none;}`}</style>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/CreatePost' element={<CreatePost />}></Route>
                </Routes>
            </Box>
            <Box w={'20%'}>
                <RightSidebar />
            </Box>
        </Box>
    )
}