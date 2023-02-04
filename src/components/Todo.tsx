import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    Input,
    Text,
    useToast,
    Icon,
    HStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { AiFillDelete } from "react-icons/ai";
  import { CiKeyboard } from "react-icons/ci";
  import { FaEdit } from "react-icons/fa";
  
  interface listing {
    text: string;
    completed: boolean;
  }

export default function Todo() {
    const [modifyingIndex, setModifyingIndex] = useState<number>(0);
    const [modalValue, setModalValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { onClose } = useDisclosure();
    const finalRef = React.useRef(null);
    const toast = useToast();
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState<Array<listing>>([
      {
        text: "task01",
        completed: false,
      },
    ]);
  
  
    const onClick = () => {
      if (task === "") {
        toast({
          title: "Enter your task",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      } else {
        setTaskList([
          ...taskList,
          {
            text: task,
            completed: false,
          },
        ]);
        setTask("");
      }
    };
    const onEnter = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (task === "") {
          toast({
            title: "Enter your task",
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        } else {
          setTaskList([
            ...taskList,
            {
              text: task,
              completed: false,
            },
          ]);
          setTask("");
        }
      }
    };
  
    const onDelete = (index: number) => {
      const updatedList = taskList.filter((value, i) => {
        return i !== index;
      });
      setTaskList([...updatedList]);
    };
  
    const onEdit = (item: listing, index: number) => {
      setIsOpen(true);
      setModalValue(item.text);
      setModifyingIndex(index);
    };
  
    const onUpdate = () => {
      const obj = {
        text: modalValue,
        completed: taskList[modifyingIndex].completed,
      };
      taskList[modifyingIndex] = obj;
      setIsOpen(false);
    };
  return (
    <div>
        <div>
      <Container
        maxW={"6xl"}
        mx="auto"
        px="20px"
        mt={{ base: "70px", lg: "90px" }}
        mb={{ base: "70px", lg: "90px" }}
      >
        <Box as="div">
          <Center
            as="p"
            fontSize={{ base: "30px", md:'40px', lg: "40px" }}
            fontWeight="bold"
            textAlign="center"
            letterSpacing="1px"
          >
            We would love to manage your tasks
          </Center>
          <Center
            as="p"
            fontSize={{ base: "10px",md:'13px', lg: "15px" }}
            textAlign="center"
            letterSpacing="1px"
          >
            Welcome to our to do app
          </Center>
        </Box>
      </Container>
      <Container px='20px'>
      <Container
        maxW={"3xl"}
        mx="auto"
        px="20px"
        mt={{ base: "70px", lg: "90px" }}
        mb={{ base: "70px", lg: "90px" }}
      >
        <Box width={{ base: "90%", lg: "80%" }} mx="auto">
          <form>
            <Flex justify="space-between" align="center" mt="30px">
              <FormControl mr="15px">
                <Input
                  type="text"
                  color='gray.600'
                  placeholder="Enter your task here"
                  _placeholder={{ color: "#AEAEAE" }}
                  bgColor="gray.100"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  onKeyDown={onEnter}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={onClick} px={{base:'20px',lg:'25px'}}>
                Add
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
      <Container
        maxW={"md"}
        mx="auto"
        px="20px"
        mt={{ base: "70px", lg: "90px" }}
        mb={{ base: "30px", lg: "50px" }}
        border="1px"
        borderRadius="10px"
        borderColor="gray.300"
        shadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      >
        {taskList.map((item, index) => {
          const border: string = index === taskList.length - 1 ? "none" : "1px";
          return (
            <Box
              width="100%"
              borderBottom={border}
              borderColor="gray.400"
              px="10px"
              py="20px"
              key={index}
            >
              <Flex justify="space-between" align="center">
                <Text whiteSpace='normal'>{item.text}</Text>
                <HStack spacing={3} color="gray.600">
                  <Box
                    _hover={{ color: "gray.900" }}
                    fontSize="20px"
                    cursor="pointer"
                    onClick={() => {
                      onEdit(item, index);
                    }}
                  >
                    <FaEdit />
                  </Box>
                  <Box
                    _hover={{ color: "gray.900" }}
                    fontSize="23px"
                    cursor="pointer"
                    onClick={() => {
                      onDelete(index);
                    }}
                  >
                    <AiFillDelete />
                  </Box>
                </HStack>
              </Flex>
            </Box>
          );
        })}
      </Container>
        {taskList.length !== 0 && <Flex justify='center' mb='30px'> <Button onClick={() => {setTaskList([])}}>Delete All</Button> </Flex>}
        </Container>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your task</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <ModalBody>
            <Input
              type="text"
              placeholder="Enter your task here"
              _placeholder={{ color: "#AEAEAE" }}
              bgColor="gray.100"
              color="gray.700"
              value={modalValue}
              onChange={(e) => {
                setModalValue(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </Button>
            <Button variant="ghost" onClick={onUpdate}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </div>
    </div>
  )
}
