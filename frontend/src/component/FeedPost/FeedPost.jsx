import { Box, Image, useToast } from "@chakra-ui/react"
import './FeedPost.css'
import comment from '../../assets/comment.png'
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const FeedPost = ({ ele, like, GetPostData }) => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};
    const navigate = useNavigate()
    const toast = useToast();

    console.log(like)

    const handleLiked = (like_id) => {
        axios.patch(`http://localhost:8080/liked_post/liked`,{like_id}, {
            headers: { "Authorization": weblink.token }
        })
            .then((res) => {
                console.log(res.data);
                GetPostData()
                // toast({ title: res.data.msg, status: 'success', duration: 4000, isClosable: true, position: 'top', })
            })
            .catch(() => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }

    return (
        <Box m={'1cm auto'} boxSize={'full'} p={'7px'} borderBottom={'1px solid grey'}>
            <Box m={'10px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box display={'flex'} justifyContent={'space-between'} gap={'10px'} alignItems={'center'}>
                    <Box fontWeight={'bold'} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'43px'} h={'43px'} bg={'orangered'} borderRadius={'50%'}>{ele.userName[0]}</Box>
                    <Box>{ele.userName}</Box>
                </Box>

                <Box>{ele.postDate}</Box>
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
                <Box>{ele.postDescription}</Box>

                <Box mt={'10px'} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                        <Image onClick={() => handleLiked(like._id)} cursor={'pointer'} w={'30px'} src={'https://cdn-icons-png.flaticon.com/128/2107/2107845.png'} alt='like' />
                        <Box >{like['allLikesLength'] - 1} Likes</Box>
                    </Box>
                    <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                        <Box>{'13'} Comments</Box>
                        <Image w={'30px'} src={comment} alt='like' />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}