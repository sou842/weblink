import { useDisclosure, Button, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, Modal, ModalFooter, Text, Heading, Center, Box, Input, useToast, } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';



export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast();
    const weblink = JSON.parse(localStorage.getItem('weblink')) || {};


    const handleSubmit = () => {
        axios.post(`http://localhost:8080/users/login`, { email, password })
            .then((res) => {

                if (res.data.msg == 'User has been logged in') {
                    console.log(res.data)
                    toast({ title: res.data.msg, status: 'success', duration: 4000, isClosable: true, position: 'top', })

                    weblink['token'] = res.data.token
                    weblink['userName'] = res.data.userName
                    localStorage.setItem('weblink', JSON.stringify(weblink))

                    onClose()
                } else if (res.data.msg == 'Incorrect Password') {
                    toast({ title: res.data.msg, status: 'warning', duration: 4000, isClosable: true, position: 'top', })
                } else {
                    toast({ title: res.data.msg, status: 'info', duration: 4000, isClosable: true, position: 'top', })
                }

            }).catch((err) => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }



    return (
        <Box>
            <Button w={'90%'} h={'45px'} m={'10px auto'} display={'flex'} justifyContent={'center'} alignItems={'center'} bg={'orangered'} color={'white'} onClick={onOpen}>
                Login
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ width: "370px" }}>
                    <Heading fontSize={'30px'} fontWeight={'medium'} m={'15px auto'}>LOGIN</Heading>
                    <ModalCloseButton />



                    <ModalBody>
                        {/* <Input margin={'7px auto'} h={'47px'} border={'1px solid grey'} type="Name" placeholder="Name"/> */}
                        <Input onChange={(e) => setEmail(e.target.value)} required margin={'7px auto'} h={'47px'} border={'1px solid grey'} type="email" placeholder="Email" />
                        <Input onChange={(e) => setPassword(e.target.value)} required margin={'7px auto'} h={'47px'} border={'1px solid grey'} type="password" placeholder="Password" />
                        <Button onClick={handleSubmit} bg={'orange'} color={'whiteAlpha.900'} w={'100%'} m={'10px auto'} h={'45px'}>Submit</Button>
                    </ModalBody>

                    <ModalFooter>
                        <Text w={'100%'} textAlign={'center'}>Don't Have account, Register</Text>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </Box>
    )
}


// <Box>
// <Button color={'white'} colorScheme="black" variant="link" onClick={onOpen}>
//     Login
// </Button>

// <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
//     <ModalOverlay />
//     <ModalContent style={{ width: "370px" }}>
//         <Center >
//             <Image
//                 width={300}
//                 src={logo}
//                 alt="error"
//             />
//         </Center>

//         {/* <ModalCloseButton /> */}
//         <ModalBody>
//             <Heading style={{ margin: "25px 0px 20px 0px" }} size="md">
//                 Login
//             </Heading>
//             {/* <LoginForm onclose={onClose} /> */}
//         </ModalBody>

//         <ModalFooter>
//             <Text fontSize="md">
//                 Not registered yet?
//                 <span onClick={onClose} style={{ color: "#8c52ff" }} to="/signup">
//                     Create an Account
//                 </span>
//             </Text>
//         </ModalFooter>
//     </ModalContent>
// </Modal>
// {/* <ToastContainer/> */}
// </Box>