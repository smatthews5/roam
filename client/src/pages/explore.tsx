import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/core';
import CitySummary from '../components/CitySummary';
import NavBar from '../components/NavBar';
import {
  Favourite,
  useAddFavouriteMutation,
  useCitiesQuery,
  useMeQuery,
  useRemoveFavouriteMutation,
} from '../generated/graphql';
import { useQuery } from 'urql';
import refetchCityData from './profile';

const GET_FAVOURITES = `
  query ($userId: Int!) {
    userFavourites(userId: $userId) {
      cityId
    }
  }
`;

interface exploreProps {}

const Explore: React.FC<exploreProps> = () => {
  const [{ data: cityData }] = useCitiesQuery();

  const [favouriteCities, setFavouriteCities] = useState<number[]>([]);

  const [{ data: userData }] = useMeQuery();
  const userId = userData?.me?.id;

  const [{ data }, updateFavourites] = useQuery({
    query: GET_FAVOURITES,
    variables: { userId },
  });

  const refresh = () => {
    updateFavourites({ requestPolicy: 'network-only' });
  };

  const [, addFavourite] = useAddFavouriteMutation();

  const [, removeFavourite] = useRemoveFavouriteMutation();

  useEffect(() => {
    let cities: number[] = [];
    if (userId && data) {
      const favouritesData = data.userFavourites;
      favouritesData.map((favourite: Favourite) =>
        cities.push(favourite.cityId)
      );
    }
    setFavouriteCities(cities);
  }, favouriteCities);

  const handleToggle = (id: number) => {
    refresh();
    if (favouriteCities.includes(id) && userId) {
      let newArr: number[] = [...favouriteCities];
      let index = newArr.indexOf(id);
      newArr.splice(index, 1);
      setFavouriteCities(newArr);
      removeFavourite({ cityId: id, userId: userId });
      refresh();
      console.log(id, 'removed from favourites');
    } else if (userId) {
      let newArr: number[] = [...favouriteCities];
      newArr.push(id);
      setFavouriteCities(newArr);
      addFavourite({ cityId: id, userId: userId });
      refresh();
      console.log(id, 'added to favourites');
    }
  };

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
              handleClick={handleToggle}
              favouriteCities={favouriteCities}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
