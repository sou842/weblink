import { Box, Button, Checkbox, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";



export const CreatePost = () => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};
    const toast = useToast();
    const [post, setPost] = useState({
        postImage: '',
        postVideo: '',
        postURL: '',
        postDescription: '',
        IsPrivate: false,
        postDate: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name == 'IsPrivate') {
            setPost((prevData) => ({ ...prevData, [name]: !post.IsPrivate }))
        } else {
            setPost((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = () => {
        axios.post(`http://localhost:8080/posts/add`, post, {
            headers: { "Authorization": weblink.token }
        })
            .then((res) => {
                console.log(res.data);
                toast({ title: res.data.msg, status: 'success', duration: 4000, isClosable: true, position: 'top', })
                setPost({ postImage: '', postVideo: '', postURL: '', postDescription: '', IsPrivate: false, postDate: '' })
            })
            .catch(() => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }


    return (
        <Box>
            <Box p={'1cm 10px 0 10px'}>
                <Box display={'flex'} gap={'10px'}>
                    <Input color={'white'} name="postImage" value={post.postImage} w={'100%'} h={'180px'} bg={'#191919'} border={'1px solid grey'} cursor={'pointer'} type="text" textAlign={'center'} placeholder="Image" onChange={handleChange} />
                    <Input color={'white'} name="postVideo" value={post.postVideo} w={'100%'} h={'180px'} bg={'#191919'} border={'1px solid grey'} cursor={'pointer'} type="text" textAlign={'center'} placeholder="Video" onChange={handleChange} />
                </Box>

                <Box>
                    <Input color={'white'} name="postURL" value={post.postURL} w={'100%'} h={'60px'} m={'15px 0 0 0'} border={'1px solid grey'} cursor={'pointer'} type="text" placeholder="Website Deployed Link" onChange={handleChange} />
                    <Input color={'white'} name="postDescription" value={post.postDescription} w={'100%'} h={'60px'} m={'15px 0'} border={'1px solid grey'} cursor={'pointer'} type="text" placeholder="Description" onChange={handleChange} />
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} m={'7px 5px'}>
                    <Button onClick={handleSubmit} w={'180px'}>POST</Button>
                    <Checkbox checked={post.IsPrivate} onChange={handleChange} name="IsPrivate" color={'grey'}>Private</Checkbox>
                </Box>
            </Box>
        </Box>
    )
}