import {
  Text,
  Box,
  Flex,
  Divider,
  Button,
  Select,
  Stack,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';

interface findProps {}

const Find: React.FC<findProps> = ({}) => {
  return (
    <Wrapper>
      <Box>
        {/* <Text fontSize={30} textAlign="center">
          choose your preferences
        </Text> */}
        <Divider mb={5} />
        <Text fontSize={20} fontWeight="bold">
          Climate
        </Text>
        <Flex justifyContent="space-between" px="30%" mt={5}>
          <Button>Hot</Button>
          <Button>Mild</Button>
          <Button>Cold</Button>
        </Flex>
        <Divider mb={5} mt={10} width="80%" mx="auto" />
        <Text fontSize={20} fontWeight="bold">
          Lifestyle
        </Text>
        <Flex justifyContent="space-between" px="15%" mt={5}>
          <Button>City</Button>
          <Button>Beach</Button>
          <Button>Mountains</Button>
          <Button>Countryside</Button>
        </Flex>
        <Divider mb={5} mt={10} width="80%" mx="auto" />
        <Text fontSize={20} fontWeight="bold">
          Timezone Range
        </Text>
        <Stack spacing={10} px="15%" mt={5}>
          <Select variant="outline" placeholder="Select min time difference..">
            <option value="UTC-13">UTC-13</option>
            <option value="UTC-12">UTC-12</option>
            <option value="UTC-11">UTC-11</option>
            <option value="UTC-10">UTC-10</option>
            <option value="UTC-9">UTC-9</option>
            <option value="UTC-8">UTC-8</option>
            <option value="UTC-7">UTC-7</option>
            <option value="UTC-6">UTC-6</option>
            <option value="UTC-5">UTC-5</option>
            <option value="UTC-4">UTC-4</option>
            <option value="UTC-3">UTC-3</option>
            <option value="UTC-2">UTC-2</option>
            <option value="UTC-1">UTC-1</option>
            <option value="UTC">UTC</option>
            <option value="UTC+1">UTC+1</option>
            <option value="UTC+2">UTC+2</option>
            <option value="UTC+3">UTC+3</option>
            <option value="UTC+4">UTC+4</option>
            <option value="UTC+5">UTC+5</option>
            <option value="UTC+6">UTC+6</option>
            <option value="UTC+7">UTC+7</option>
            <option value="UTC+8">UTC+8</option>
            <option value="UTC+9">UTC+9</option>
            <option value="UTC+10">UTC+10</option>
            <option value="UTC+11">UTC+11</option>
            <option value="UTC+12">UTC+12</option>
            <option value="UTC+13">UTC+13</option>
          </Select>
          <Select variant="outline" placeholder="Select max time difference..">
            <option value="UTC-13">UTC-13</option>
            <option value="UTC-12">UTC-12</option>
            <option value="UTC-11">UTC-11</option>
            <option value="UTC-10">UTC-10</option>
            <option value="UTC-9">UTC-9</option>
            <option value="UTC-8">UTC-8</option>
            <option value="UTC-7">UTC-7</option>
            <option value="UTC-6">UTC-6</option>
            <option value="UTC-5">UTC-5</option>
            <option value="UTC-4">UTC-4</option>
            <option value="UTC-3">UTC-3</option>
            <option value="UTC-2">UTC-2</option>
            <option value="UTC-1">UTC-1</option>
            <option value="UTC">UTC</option>
            <option value="UTC+1">UTC+1</option>
            <option value="UTC+2">UTC+2</option>
            <option value="UTC+3">UTC+3</option>
            <option value="UTC+4">UTC+4</option>
            <option value="UTC+5">UTC+5</option>
            <option value="UTC+6">UTC+6</option>
            <option value="UTC+7">UTC+7</option>
            <option value="UTC+8">UTC+8</option>
            <option value="UTC+9">UTC+9</option>
            <option value="UTC+10">UTC+10</option>
            <option value="UTC+11">UTC+11</option>
            <option value="UTC+12">UTC+12</option>
            <option value="UTC+13">UTC+13</option>
          </Select>
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default Find;
