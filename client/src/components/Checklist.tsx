import { Box, Text } from '@chakra-ui/core';
import React from 'react';

interface ChecklistProps {
  isDone: boolean;
  item: string;
  itemText: string;
  handleClick: (item: string) => void;
}

const Checklist: React.FC<ChecklistProps> = ({
  isDone,
  item,
  itemText,
  handleClick,
}) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      mt={5}
      rounded={20}
      bg={isDone ? 'rgb(178,216,216, .5)' : ''}
      onClick={() => handleClick(item)}
    >
      <Text as={isDone ? 's' : 'b'} color={isDone ? 'grey' : ''}>
        {itemText}
      </Text>
    </Box>
  );
};

export default Checklist;
