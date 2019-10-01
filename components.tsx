import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Job = {
   __typename?: 'Job',
  id: Scalars['ID'],
  customer: Scalars['String'],
  address: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  user: User,
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  users: Array<User>,
  job?: Maybe<Job>,
  jobs: Array<Job>,
};


export type QueryUserArgs = {
  id: Scalars['String']
};


export type QueryJobArgs = {
  id: Scalars['String']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  jobs: Array<Job>,
};

