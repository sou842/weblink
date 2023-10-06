import { Box, Image, Text, useToast } from "@chakra-ui/react"
import { FeedPost } from "../FeedPost/FeedPost"
import { useEffect, useState } from "react"
import axios from "axios";

export const Feed = () => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};
    const [feedData,setFeedData] = useState([])
    const toast = useToast();


    useEffect(() => {
        axios.get(`http://localhost:8080/posts/`, {
            headers: { "Authorization": weblink.token }
        })
            .then((res) => {
                // console.log(res.data.msg)
                setFeedData(res.data.msg)
            })
            .catch(() => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }, [])

    console.log(feedData)

    return (
        <Box color={'whiteAlpha.900'} >

            <Box w={'85%'} m={'auto'} bg={'#1E1E1E'}>

                {feedData!=0 && feedData?.map((ele, index) => (
                    <Box key={index}>
                        <FeedPost {...ele} />
                    </Box>
                ))}


            </Box>

        </Box>
    )
}