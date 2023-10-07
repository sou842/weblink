import { useDisclosure, Button, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, Modal, ModalFooter, Text, Heading, Center, Box, Input, useToast, Spinner, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import send from '../../assets/send.png'
import comment_img from '../../assets/comment.png'



export const Comments = ({ postId }) => {
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [comment, setComment] = useState('')
    const [massage, setMassage] = useState([])
    const [loading, setLoading] = useState(false);
    const toast = useToast();


    const handleSubmit = (postId) => {
        if (comment != '') {
            axios.post(`http://localhost:8080/comments/add`, { postId, comment }, {
                headers: { "Authorization": weblink.token }
            })
                .then((res) => {
                    Getcomment()
                    setComment('')
                }).catch((err) => {
                    toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
                })
        }

    }

    const Getcomment = () => {
        onOpen()
        setLoading(true)
        axios.get(`http://localhost:8080/comments/get/${postId}`, {
            headers: { "Authorization": weblink.token }
        })
            .then((res) => {
                // console.log(res.data)
                setMassage(res.data)
                setLoading(false)
                // toast({ title: 'ggg', status: 'warning', duration: 2000, isClosable: true, position: 'top', })

            }).catch((err) => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }


    // const massage = [
    //     { comment: 'This is my first project. This is a E-commerce website you can buy any clothes for man, women and kids...', date: '10 Oct, 2023' },
    //     { comment: 'This is my first project. This is a E-commerce website you can buy any clothes for man, women and kids...', date: '10 Oct, 2023' },
    //     { comment: 'This is my first project...', date: '10 Oct, 2023' },
    //     { comment: 'This is my first project. This is a E-commerce website you can buy any clothes for man, women and kids...', date: '10 Oct, 2023' },
    //     { comment: 'This is my first project. This is a E-commerce website you can buy any clothes for man, women and kids...', date: '10 Oct, 2023' }

    // ]



    return (
        <Box>
            <Text cursor={'pointer'} onClick={Getcomment}>
                <Image w={'30px'} src={comment_img} alt='like' />
            </Text>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={['95%', '500px', '650px']}>
                    <Heading fontSize={'30px'} fontWeight={'medium'} m={'15px auto'}>
                        Comments
                    </Heading>
                    <ModalCloseButton />



                    <ModalBody>

                        <Box minH={'250px'} maxH={'300px'} overflow={'scroll'}>
                            {loading ?
                                <Box mt={'2cm'} textAlign={'center'}><Spinner color='orange' /></Box>
                                :
                                <Box>
                                    <Box>{massage.length == 0 && <Text mt={'2cm'} textAlign={'center'}>No Comment</Text>}</Box>

                                    {massage && massage.length != 0 && massage?.map((ele, index) => (
                                        <Box key={index} bg={'#F5F5F5'} p={'10px 10px 15px 10px'} m={'7px auto'} borderRadius={'7px'}>
                                            <Box mb={'5px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} color={'#E65100'}>
                                                <Text fontSize={'16px'} fontWeight={'bold'} color={'orangered'}>{ele.userName.split(' ')[0]}{' </>'}</Text>
                                                <Text fontSize={'13px'} color={'orangered'}>{ele.date}</Text>
                                            </Box>
                                            <Box fontSize={'15px'} color={'#616161'}>{ele.comment}</Box>
                                        </Box>
                                    ))}
                                </Box>
                            }
                        </Box>

                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={'5px'}>
                            <Input onChange={(e) => setComment(e.target.value)} value={comment} required margin={'7px auto'} h={'40px'} border={'1px solid grey'} type="text" placeholder="Comment" />
                            <Button w={'60px'} onClick={() => handleSubmit(postId)} bg={'orange'} color={'whiteAlpha.900'} m={'10px auto'} h={'40px'}>
                                <Image w={'20px'} src={send} alt='send' />
                            </Button>
                        </Box>
                    </ModalBody>


                </ModalContent>
            </Modal>
        </Box>
    )
}

