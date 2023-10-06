import { Box, Image, Text } from "@chakra-ui/react"
import './FeedPost.css'
import comment from '../../assets/comment.png'
import { useNavigate } from "react-router-dom"


export const FeedPost = (ele) =>{
    const navigate = useNavigate()
    // console.log(ele)

return (
    <Box m={'1cm auto'} boxSize={'full'} p={'7px'} borderBottom={'1px solid grey'}>
    <Box m={'10px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} justifyContent={'space-between'} gap={'10px'} alignItems={'center'}>
            <Box fontWeight={'bold'} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'43px'} h={'43px'} bg={'orangered'} borderRadius={'50%'}>{ele.userName[0]}</Box>
            <Text>{ele.userName}</Text>
            </Box>

            <Text>{ele.postDate}</Text>
        </Box>
        
        <Box bg={'black'} className="work">
            <img src={ele.postImage} alt='artkon' />
            <Box className="layer">
                {/* <h3>Social Media App</h3> */}
                {/* <p>Download it from play store.</p> */}
                <a href={ele.postURL}>@</a>
            </Box>
        </Box>

        <Box p={'10px'}>
            <Text>{ele.postDescription}</Text>

            <Box mt={'10px'} display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                    <Image w={'30px'} src={'https://cdn-icons-png.flaticon.com/128/2107/2107845.png'} alt='like' />
                    <Text>{'120'} Likes</Text>
                </Box>
                <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                    <Text>{'13'} Comments</Text>
                    <Image w={'30px'} src={comment} alt='like' />
                </Box>
            </Box>
        </Box>
    </Box>
)
}