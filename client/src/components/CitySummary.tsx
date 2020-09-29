import { Box, Image, Badge, Flex } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import {
  Favourite,
  useAddFavouriteMutation,
  useMeQuery,
  useRemoveFavouriteMutation,
} from '../generated/graphql';

const GET_FAVOURITES = `
  query ($userId: Int!) {
    userFavourites(userId: $userId) {
      cityId
    }
  }
`;

interface CitySummaryProps {
  id: number;
  name: string;
  timezone: string;
  image: string;
}

const CitySummary: React.FC<CitySummaryProps> = ({
  id,
  name,
  timezone,
  image,
}) => {
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
    if (userId) {
      const favouritesData = data.userFavourites;
      favouritesData.map((favourite: Favourite) =>
        cities.push(favourite.cityId)
      );
    }
    setFavouriteCities(cities);
  }, []);

  const handleToggle = () => {
    console.log(data.userFavourites);
    console.log(favouriteCities);
    if (favouriteCities.includes(id) && userId) {
      let newArr: number[] = [...favouriteCities];
      let index = newArr.indexOf(id);
      newArr.splice(index, 1);
      setFavouriteCities(newArr);
      removeFavourite({ cityId: id, userId: userId });
      refresh();
      console.log(id, 'booo removed from favourites');
    } else if (userId) {
      let newArr: number[] = [...favouriteCities];
      newArr.push(id);
      setFavouriteCities(newArr);
      addFavourite({ cityId: id, userId: userId });
      refresh();
      console.log(id, 'yay! added to favourites');
    }
  };

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
          onClick={handleToggle}
        />
      </Flex>
    </Box>
  );
};

export default CitySummary;
