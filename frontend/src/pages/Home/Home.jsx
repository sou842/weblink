import { Box } from "@chakra-ui/react"
import { LeftSidebar } from "../../component/LeftSidebar/LeftSidebar"
import { Feed } from "../../component/Feed/Feed"
import { RightSidebar } from "../../component/RightSidebar/RightSidebar"




export const Home = () => {


    return (
        <Box bg={'black'} display={'flex'} justifyContent={'space-between'} height={'100vh'} overflow={'scroll'}>
            <Box w={'20%'}>
                <LeftSidebar />
            </Box>
            <Box bg={'#1E1E1E'} w={'59%'} overflow={'scroll'} css={{ '-ms-overflow-style': 'none', scrollbarWidth: 'none' }}>
            <style>{`::-webkit-scrollbar {display: none;}`}</style>
                <Feed />
            </Box>
            <Box w={'20%'}>
                <RightSidebar />
            </Box>
        </Box>
    )
}