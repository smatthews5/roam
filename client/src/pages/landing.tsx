import React from 'react';
import { Box, Image } from '@chakra-ui/core';

interface landingProps {}

const Landing: React.FC<landingProps> = ({}) => {
  return (
    <Box
      w="90%"
      h="900px"
      borderWidth="2px"
      rounded="lg"
      overflow="hidden"
      boxShadow="md"
      mx="auto"
      mt="4%"
    >
      <Image
        src="/luca-bravo-O453M2Liufs-unsplash.jpg"
        alt="boat on lake"
        w="100%"
        h="100%"
        objectFit="cover"
      />
    </Box>
  );
};

export default Landing;
