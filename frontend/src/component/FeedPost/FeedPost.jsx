import { Box, Image, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Comments } from "../../pages/Comments/Comments"
import axios from "axios"
import './FeedPost.css'
import star_fill from '../../assets/star_fill.png'
import star_blank from '../../assets/star_blank.png'



export const FeedPost = ({ ele, like, GetPostData }) => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};
    const [isLike, setIsLike] = useState({ like: false, count: 0 });
    const navigate = useNavigate()
    const toast = useToast();

    // console.log(ele)

    const handleLiked = (like_id) => {
        setIsLike((prevData) => ({ ...prevData, ['like']: !isLike['like'] }))
        setIsLike((prevData) => ({ ...prevData, ['count']: isLike['like'] ? isLike['count'] - 1 : isLike['count'] + 1 }))

        axios.patch(`http://localhost:8080/posts/liked`, { like_id }, {
            headers: { "Authorization": weblink.token }
        })
            .then((res) => {
                console.log(res.data);
                GetPostData()
                // toast({ title: res.data.msg, status: 'warning', duration: 500, isClosable: true, position: 'top', })
            })
            .catch(() => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }

    useEffect(() => {

        if (ele['allLikes'][weblink.userId] == undefined) {
            setIsLike((prevData) => ({ ...prevData, ['like']: false }))
        } else {
            setIsLike((prevData) => ({ ...prevData, ['like']: true }))
        }
        setIsLike((prevData) => ({ ...prevData, ['count']: like['allLikesLength'] - 1 }))
    }, [])


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
                <img src={ele.postImage} alt='webLink' />
                <Box className="layer">
                    {/* <h3>Social Media App</h3> */}
                    {/* <p>Download it from play store.</p> */}
                    <a href={ele.postURL}>{'</>'}</a>
                </Box>
            </Box>

            <Box p={'10px'}>
                <Box>{ele.postDescription}</Box>

                <Box  m={'15px 7px 0 7px'} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                        {isLike['like'] ?
                            <Image onClick={() => handleLiked(like._id)} cursor={'pointer'} w={'30px'} src={star_fill} alt='like' />
                            :
                            <Image onClick={() => handleLiked(like._id)} cursor={'pointer'} w={'30px'} src={star_blank} alt='like' />
                        }
                        <Box >{isLike['count']} Likes</Box>
                    </Box>
                    <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                        <Box display={'flex'}><Comments postId={ele._id}/></Box>
                    </Box>
                </Box>
            </Box>


        </Box>
    )
}