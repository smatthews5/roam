import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import CitySummary from '../components/CitySummary';
import NavBar from '../components/NavBar';
import { useCitiesQuery } from '../generated/graphql';

interface exploreProps {}

const Explore: React.FC<exploreProps> = () => {
  const [{ data: cityData }] = useCitiesQuery();

  return (
    <Box>
      <NavBar />
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mx="5%" my="5%">
        {cityData?.cities.map((city) => (
          <Box w="100%">
            <CitySummary
              key={city.name}
              id={city.id}
              name={city.name}
              timezone={city.timezone}
              image={city.imageUrl}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
