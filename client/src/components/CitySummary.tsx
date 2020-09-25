import { Box, Image, Badge } from '@chakra-ui/core';
import React from 'react';

interface CitySummaryProps {
  name: string;
  timezone: string;
  image: string;
}

const CitySummary: React.FC<CitySummaryProps> = ({ name, timezone, image }) => {
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Image src={image} w="100%" h="100%" objectFit="cover" />
      <Badge rounded="full" px="2" variantColor="teal" ml="1">
        {timezone}
      </Badge>
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
    </Box>
  );
};

export default CitySummary;
