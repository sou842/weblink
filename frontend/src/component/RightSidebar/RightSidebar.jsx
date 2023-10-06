import { Box } from "@chakra-ui/react"
import { Login } from "../../pages/Login/Login"
import { Register } from "../../pages/Register/Register"




export const RightSidebar = () => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};



    return (
        <Box bg={'#1E1E1E'} color={'whiteAlpha.900'} h={'100vh'} border={'1px solid #1E1E1E'}>
            <Box>
                <Box m={'1cm auto'} fontWeight={'bold'} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100px'} h={'100px'} bg={'orange'} borderRadius={'50%'}>A</Box>
            
            {/* {weblink.token&& } */}
                <Box>
                    <Login/>
                    <Register/>
                </Box>

            </Box>
        </Box>
    )
}