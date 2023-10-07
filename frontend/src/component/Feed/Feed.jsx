import { Box, Image, Text, useToast } from "@chakra-ui/react"
import { FeedPost } from "../FeedPost/FeedPost"
import { useEffect, useState } from "react"
import axios from "axios";

export const Feed = () => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};
    const toast = useToast();
    const [feedData, setFeedData] = useState({ posts: [], likes: [] })

const GetPostData = () =>{
    console.log(weblink.userId)
    axios.get(`http://localhost:8080/posts/get/${weblink.userId}`, {
        headers: { "Authorization": weblink.token }
    })
        .then((res) => {
            // console.log(res.data)
            setFeedData((prevData) => ({ ...prevData, ['posts']: res.data.post }))
            setFeedData((prevData) => ({ ...prevData, ['likes']: res.data.like }))

        })
        .catch(() => {
            toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
        })
}

    useEffect(() => {
        GetPostData()
    }, [])

    console.log(feedData['posts'], feedData['posts'])

    return (
        <Box color={'whiteAlpha.900'} >

            <Box w={'85%'} m={'auto'} bg={'#1E1E1E'}>

                {feedData['posts'] && feedData['posts'].length != 0 && feedData['posts']?.map((ele, index) => (
                    <Box key={index}>
                        <FeedPost GetPostData={GetPostData} ele={ele} like={feedData.likes[index]} />
                    </Box>
                ))}


            </Box>

        </Box>
    )
}