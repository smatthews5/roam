import { Box, Image, Badge, Flex } from '@chakra-ui/core';
import React from 'react';

interface CitySummaryProps {
  id: number;
  name: string;
  timezone: string;
  image: string;
  handleClick: (id: number) => void;
  favouriteCities: number[];
}

const CitySummary: React.FC<CitySummaryProps> = ({
  id,
  name,
  timezone,
  image,
  handleClick,
  favouriteCities,
}) => {
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Image src={image} w="100%" h="100%" objectFit="cover" />
      <Badge rounded="full" px="2" variantColor="teal" ml="1">
        {timezone}
      </Badge>
      <Flex justifyContent="space-between">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          ml="2"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>
        <Image
          src={favouriteCities.includes(id) ? '/heart-2.png' : '/heart.png'}
          alt=""
          w="20px"
          h="20px"
          mr="20px"
          onClick={() => handleClick(id)}
        />
      </Flex>
    </Box>
  );
};

export default CitySummary;
