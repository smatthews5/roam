import { Box, Flex, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import { useQuery } from 'urql';
import Checklist from '../components/Checklist';
import CityListItem from '../components/CityListItem';
import NavBar from '../components/NavBar';
import {
  useCitiesFavouriteQuery,
  useMeQuery,
  useUpdateChecklistMutation,
} from '../generated/graphql';

const GET_CHECKLIST = `
  query Checklist($userId: Int!) {
    checklist(userId: $userId) {
      id
      userId
      bank
      accomodation
      visa
      workspace
      medical
    }
  }
`;

interface profileProps {}

const profile: React.FC<profileProps> = ({}) => {
  const [{ data: userData }] = useMeQuery();
  const userId = userData?.me?.id;

  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: GET_CHECKLIST,
    variables: { userId },
  });

  const [
    { data: cityData, fetching: cityDataFetching, error: cityDataError },
    refetchCityData,
  ] = useCitiesFavouriteQuery({ variables: { userId: userId } });

  console.log(cityData);

  let favourites = null;

  if (cityDataFetching) {
    favourites = null;
  } else if (cityData) {
    favourites = cityData.citiesFavourite.map((city) => (
      <Box w="100%" mt={3}>
        <CityListItem
          key={city.name}
          id={city.id}
          name={city.name}
          timezone={city.timezone}
          image={city.imageUrl}
        />
      </Box>
    ));
  }

  const [, updateChecklist] = useUpdateChecklistMutation();

  let body = null;

  const handleClick = (item: string) => {
    console.log(data.checklist[item]);
    if (userId) {
      updateChecklist({
        userId: userId,
        field: item,
        value: !data.checklist[item],
      });
    }
    console.log(data);
  };

  if (fetching) {
    body = null;
  } else if (data) {
    body = (
      <>
        <Checklist
          isDone={data.checklist.accomodation}
          item="accomodation"
          itemText="Find accomodation"
          handleClick={handleClick}
        ></Checklist>
        <Checklist
          isDone={data.checklist.visa}
          item="visa"
          itemText="Make sure you have a valid visa (if needed!)"
          handleClick={handleClick}
        ></Checklist>
        <Checklist
          isDone={data.checklist.workspace}
          item="workspace"
          itemText="Find potential workspaces"
          handleClick={handleClick}
        ></Checklist>
        <Checklist
          isDone={data.checklist.medical}
          item="medical"
          itemText="Organise medical insurance (if needed!)"
          handleClick={handleClick}
        ></Checklist>
        <Checklist
          isDone={data.checklist.bank}
          item="bank"
          itemText="Open a local bank account"
          handleClick={handleClick}
        ></Checklist>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Flex mt={5} pl={5}>
        <Flex w="50%" mx="auto" direction="column">
          <Text fontSize={30} pl={2}>
            Your Favourites
          </Text>
          <Text fontSize={15} mt={3} pl={2}>
            Save your favourite places to make a personalised shortlist of your
            top remote work locations
          </Text>
          <Stack spacing="20px">{favourites}</Stack>
        </Flex>
        <Flex w="40%" mx="auto" direction="column">
          <Text fontSize={30} pl={2}>
            Preparation Checklist
          </Text>
          <Text fontSize={15} mt={3} pl={2}>
            Keep track of the essential to-do's for your next adventure!
          </Text>
          <Stack spacing="20px">{body}</Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default profile;
