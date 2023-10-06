import { useDisclosure, Button, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, Modal, ModalFooter, Text, Heading, Center, Box, Input, useToast, } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";


export const Register = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()


    const handleSubmit = () => {
        axios.post(`http://localhost:8080/users/register`, { name,email, password })
            .then((res) => {
                if(res.data.msg=='User already present, please login!!!'){
                    toast({ title: res.data.msg, status: 'info', duration: 3000, isClosable: true, position: 'top', })
                } else{
                    toast({ title: res.data.msg, status: 'success', duration: 3000, isClosable: true, position: 'top', })
                    onClose()
                }

            }).catch((err) => {
                toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
            })
    }


    return (
        <Box>
            <Button w={'90%'} h={'45px'} m={'10px auto'} display={'flex'} justifyContent={'center'} alignItems={'center'} bg={'orangered'} color={'white'} onClick={onOpen}>
                Register
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ width: "370px" }}>
                    <Heading fontSize={'30px'} fontWeight={'medium'} m={'15px auto'}>Register</Heading>
                    <ModalCloseButton />

                    <ModalBody>
                        <Input onChange={(e) => setName(e.target.value)} required margin={'7px auto'} h={'47px'} border={'1px solid grey'} type="text" placeholder="Name" />
                        <Input onChange={(e) => setEmail(e.target.value)} required margin={'7px auto'} h={'47px'} border={'1px solid grey'} type="email" placeholder="Email" />
                        <Input onChange={(e) => setPassword(e.target.value)} required margin={'7px auto'} h={'47px'} border={'1px solid grey'} type="password" placeholder="Password" />
                        <Button onClick={handleSubmit} bg={'orange'} color={'whiteAlpha.900'} w={'100%'} m={'10px auto'} h={'45px'}>Submit</Button>
                    </ModalBody>

                    <ModalFooter>
                        <Box w={'100%'} textAlign={'center'}>Aready Have an account, Login</Box>
                    </ModalFooter>



                </ModalContent>
            </Modal>
            {/* <ToastContainer/> */}
        </Box>
    )
}
