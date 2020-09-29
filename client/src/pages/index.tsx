import React from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Find from './find';

interface landingProps {}

const Index: React.FC<landingProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <NavBar />
      <Box
        w="90%"
        h="800px"
        borderWidth="2px"
        rounded="lg"
        overflow="hidden"
        boxShadow="md"
        mx="auto"
        my="5vh"
        textAlign="center"
      >
        <Heading
          size="lg"
          fontSize="120px"
          position="absolute"
          top="250px"
          left="250px"
          right="250px"
          color="white"
        >
          work anywhere
        </Heading>
        <Link href="/explore">
          <Button
            size="lg"
            height="80px"
            width="300px"
            backgroundColor="white"
            position="absolute"
            bottom="130px"
            left="350px"
            rounded="20px"
          >
            Explore Locations
          </Button>
        </Link>
        <Button
          size="lg"
          height="80px"
          width="300px"
          backgroundColor="white"
          position="absolute"
          bottom="130px"
          right="350px"
          rounded="20px"
          onClick={onOpen}
        >
          Find My Perfect Location
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="800px">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Choose you preferences</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Find></Find>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3}>
                Search
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Image
          src="/landing-page.jpg"
          alt="boat on lake"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default Index;
