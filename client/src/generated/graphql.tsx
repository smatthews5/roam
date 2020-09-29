import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  citiesFiltered: Array<City>;
  city?: Maybe<City>;
  me?: Maybe<User>;
  favourites: Array<Favourite>;
  userFavourites?: Maybe<Array<Favourite>>;
};


export type QueryCitiesFilteredArgs = {
  options: CityFilters;
};


export type QueryCityArgs = {
  id: Scalars['Float'];
};


export type QueryUserFavouritesArgs = {
  userId: Scalars['Int'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  timezone: Scalars['String'];
  imageUrl: Scalars['String'];
  climate?: Maybe<Scalars['String']>;
  lifestyle?: Maybe<Scalars['String']>;
};

export type CityFilters = {
  timezone: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Favourite = {
  __typename?: 'Favourite';
  id: Scalars['Float'];
  cityId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCity: City;
  updateCity?: Maybe<City>;
  deleteCity: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  saveFavourite: Scalars['Boolean'];
  removeFavourite: Scalars['Boolean'];
};


export type MutationCreateCityArgs = {
  options: CityDetailsInput;
};


export type MutationUpdateCityArgs = {
  imageUrl?: Maybe<Scalars['String']>;
  lifestyle?: Maybe<Scalars['String']>;
  climate?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteCityArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationSaveFavouriteArgs = {
  cityId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationRemoveFavouriteArgs = {
  cityId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type CityDetailsInput = {
  name: Scalars['String'];
  timezone: Scalars['String'];
  imageUrl: Scalars['String'];
  climate: Scalars['String'];
  lifestyle: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type AddFavouriteMutationVariables = Exact<{
  cityId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type AddFavouriteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveFavourite'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type RemoveFavouriteMutationVariables = Exact<{
  cityId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type RemoveFavouriteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFavourite'>
);

export type CitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CitiesQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name' | 'imageUrl' | 'timezone' | 'createdAt' | 'updatedAt'>
  )> }
);

export type UserFavouritesQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserFavouritesQuery = (
  { __typename?: 'Query' }
  & { userFavourites?: Maybe<Array<(
    { __typename?: 'Favourite' }
    & Pick<Favourite, 'cityId'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const AddFavouriteDocument = gql`
    mutation AddFavourite($cityId: Int!, $userId: Int!) {
  saveFavourite(cityId: $cityId, userId: $userId)
}
    `;

export function useAddFavouriteMutation() {
  return Urql.useMutation<AddFavouriteMutation, AddFavouriteMutationVariables>(AddFavouriteDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RemoveFavouriteDocument = gql`
    mutation RemoveFavourite($cityId: Int!, $userId: Int!) {
  removeFavourite(cityId: $cityId, userId: $userId)
}
    `;

export function useRemoveFavouriteMutation() {
  return Urql.useMutation<RemoveFavouriteMutation, RemoveFavouriteMutationVariables>(RemoveFavouriteDocument);
};
export const CitiesDocument = gql`
    query Cities {
  cities {
    id
    name
    imageUrl
    timezone
    createdAt
    updatedAt
  }
}
    `;

export function useCitiesQuery(options: Omit<Urql.UseQueryArgs<CitiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CitiesQuery>({ query: CitiesDocument, ...options });
};
export const UserFavouritesDocument = gql`
    query UserFavourites($userId: Int!) {
  userFavourites(userId: $userId) {
    cityId
  }
}
    `;

export function useUserFavouritesQuery(options: Omit<Urql.UseQueryArgs<UserFavouritesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserFavouritesQuery>({ query: UserFavouritesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};