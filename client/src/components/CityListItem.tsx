import { Box, Image, Badge, Flex } from '@chakra-ui/core';
import React from 'react';

interface CityListItemProps {
  id: number;
  name: string;
  timezone: string;
  image: string;
}

const CitySummary: React.FC<CityListItemProps> = ({
  id,
  name,
  timezone,
  image,
}) => {
  return (
    <Flex w="100%" h="100px" shadow="md" borderWidth="1px" rounded={20}>
      <Box w="20%">
        <Image
          src={image}
          w="100%"
          h="100%"
          objectFit="cover"
          roundedLeft={20}
        />
      </Box>
      <Flex w="80%" justifyContent="space-between" alignItems="center">
        <Box
          fontWeight="semibold"
          fontSize={20}
          ml={3}
          mt={2}
          alignSelf="flex-start"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>
        <Badge rounded={10} px="2" py={5} variantColor="purple" mr={5}>
          {timezone}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default CitySummary;
