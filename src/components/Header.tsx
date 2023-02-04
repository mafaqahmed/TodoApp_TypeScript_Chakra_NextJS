import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { CiDark, CiLight } from 'react-icons/ci';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box as="section" shadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;">
        <Box
          as="nav"
          maxW="6xl"
          mx="auto"
          px='20px'
          py='5px'
        >
          <HStack justifyContent='space-between'>
            <Text fontWeight='extrabold' fontSize='30px'>To do App</Text>
            <Button onClick={toggleColorMode} fontSize='30px' borderRadius='100%' width='40px' height='40px' p='7px'>
              {colorMode === "light" ? <CiDark /> : <CiLight />}
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
