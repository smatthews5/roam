import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import CitySummary from '../components/CitySummary';
import NavBar from '../components/NavBar';
import { useCitiesQuery } from '../generated/graphql';
import { useQuery } from 'urql';

interface exploreProps {}

const Explore: React.FC<exploreProps> = () => {
  const [result] = useCitiesQuery({
    variables: {},
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box>
      <NavBar />
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mx="5%" my="5%">
        {data?.cities.map((city) => (
          <Box w="100%">
            <CitySummary
              name={city.name}
              timezone={city.timezone}
              image={city.imageUrl}
              key={city.id}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
