import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import CitySummary from '../components/citySummary';

interface exploreProps {}

const Explore: React.FC<exploreProps> = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4} mx="5%" my="5%">
      <Box w="100%">
        <CitySummary name="Amsterdam" timezone="GMT+2" image="/amsterdam.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="London" timezone="GMT+1" image="/london.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="Berlin" timezone="GMT+2" image="/berlin.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="Paris" timezone="GMT+2" image="/paris.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="Barcelona" timezone="GMT+2" image="/barcelona.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="Madrid" timezone="GMT+2" image="/madrid.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="Sydney" timezone="GMT+10" image="/sydney.jpg" />
      </Box>
      <Box w="100%">
        <CitySummary name="Lisbon" timezone="GMT+1" image="/lisbon.jpg" />
      </Box>
    </Grid>
  );
};

export default Explore;
