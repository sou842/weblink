import { Box, Image, Text } from "@chakra-ui/react"
import { FeedPost } from "../FeedPost/FeedPost"

export const Feed = () => {

    const feedData = [{
        userName: 'Animesh Ghoroi',
        date: '5 Oct, 2023',
        postImgL: 'https://drive.google.com/uc?id=1k4UbjLCu5I1e0fsr8kjhM3Yw6CByzZE2',
        postURL: 'https://sou842.github.io/',
        description: 'This is my first project. This is a E-commerce website you can buy any clothes for man, women and kids...',
        LikeCount: '120',
        commentCount: '13'
    }, {
        userName: 'Sourav Samanta',
        date: '6 Oct, 2023',
        postImgL: 'https://drive.google.com/uc?id=1Po8H0nH_09TI5phJIJIkKCGMow3Usd9l',
        postURL: 'https://sou842.github.io/',
        description: 'This is my first project. This is a E-commerce website you can buy any clothes for man, women and kids...',
        LikeCount: '120',
        commentCount: '13'
    }]

    return (
        <Box color={'whiteAlpha.900'} >

            <Box w={'85%'} m={'auto'} bg={'#1E1E1E'}>

                {feedData && feedData?.map((ele, index) => (
                    <Box key={index}>
                        <FeedPost {...ele} />
                    </Box>
                ))}


            </Box>

        </Box>
    )
}