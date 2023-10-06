import { Box, Heading, Image } from "@chakra-ui/react"
import home from '../../assets/home.png'
import search from '../../assets/search.png'
import problem from '../../assets/problem.png'
import notification from '../../assets/notification.png'
import create from '../../assets/create.png'
import profile from '../../assets/profile.png'
import setting from '../../assets/setting.png'


export const LeftSidebar = () => {

    let data = [
        { name: 'Home', img: home },
        { name: 'Search', img: search },
        { name: 'Problem', img: problem },
        { name: 'Notification', img: notification },
        { name: 'Create', img: create },
        { name: 'Profile', img: profile },
        { name: 'Setting', img: setting }
    ]

    return (
        <Box bg={'#1E1E1E'} color={'whiteAlpha.900'} border={'1px solid #1E1E1E'} h={'100vh'}>
            <Box w={'80%'} m={'0.5cm auto 1cm auto'} display={'flex'} gap={'10px'}>
                <Heading fontSize={'20px'}>|||</Heading>
                <Heading color={'#00E676'} fontSize={'30px'}>WebLink</Heading>
            </Box>

            {data && data?.map((ele, index) => (
                <Box key={index}>
                    <Box w={'85%'} cursor={'pointer'} borderRadius={'15px'} m={'15px auto'} p={'7px 0 7px 15px'} display={'flex'} alignItems={'center'} gap={'20px'}>
                        <Box>
                            <Image w={'30px'} src={ele.img} alt="home" />
                        </Box>
                        <Box fontWeight={'medium'} fontSize={'20px'}>{ele.name}</Box>
                    </Box>
                </Box>
            ))}

        </Box>
    )
}