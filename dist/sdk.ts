import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

/** The id of the job and user being tied together. */
export type AddUserToJobInput = {
  user: Scalars['String'],
  job: Scalars['String'],
};


/** The information for a job ticket */
export type Job = {
   __typename?: 'Job',
  id: Scalars['ID'],
  customer?: Maybe<Scalars['String']>,
  /** The address of the job */
  address: Scalars['String'],
  /** The primary phone number to contact for the job */
  phone?: Maybe<Scalars['String']>,
  user: User,
};

/** Editable job data */
export type JobInput = {
  customer?: Maybe<Scalars['String']>,
};

/** The information for a migration */
export type Migration = {
   __typename?: 'Migration',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addJob: Job,
  deleteJob: Job,
  editJob: Job,
  addUser: User,
  deleteUser: User,
  editUser: User,
  addUserToJob: Job,
};


export type MutationAddJobArgs = {
  data: JobInput
};


export type MutationDeleteJobArgs = {
  id: Scalars['String']
};


export type MutationEditJobArgs = {
  data: JobInput,
  id: Scalars['String']
};


export type MutationAddUserArgs = {
  data: UserInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']
};


export type MutationEditUserArgs = {
  data: UserInput,
  id: Scalars['String']
};


export type MutationAddUserToJobArgs = {
  data: AddUserToJobInput
};

export type Query = {
   __typename?: 'Query',
  /** Get a specific Migration document from the Migrations collection. */
  migration?: Maybe<Migration>,
  /** Get a list of Migration documents from the Migrations collection. */
  migrations?: Maybe<Array<Migration>>,
  /** Get a specific Job document from the Jobs collection. */
  job?: Maybe<Job>,
  /** Get a list of Job documents from the Jobs collection. */
  jobs?: Maybe<Array<Job>>,
  /** Get a specific User document from the Users collection. */
  user?: Maybe<User>,
  /** Get a list of User documents from the Users collection. */
  users?: Maybe<Array<User>>,
};


export type QueryMigrationArgs = {
  id: Scalars['String']
};


export type QueryJobArgs = {
  id: Scalars['String']
};


export type QueryUserArgs = {
  id: Scalars['String']
};

/** The information for a user */
export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  jobs: Array<Job>,
};

/** Editable user data */
export type UserInput = {
  name?: Maybe<Scalars['String']>,
};

export type AddUserToJobMutationVariables = {
  data: AddUserToJobInput
};


export type AddUserToJobMutation = (
  { __typename?: 'Mutation' }
  & { addUserToJob: (
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'customer'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type EditUserMutationVariables = {
  id: Scalars['String'],
  data: UserInput
};


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type FindUserQueryVariables = {
  userId: Scalars['String']
};


export type FindUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);


export const AddUserToJobDocument = gql`
    mutation AddUserToJob($data: AddUserToJobInput!) {
  addUserToJob(data: $data) {
    id
    customer
    user {
      id
      name
    }
  }
}
    `;
export const EditUserDocument = gql`
    mutation EditUser($id: String!, $data: UserInput!) {
  editUser(id: $id, data: $data) {
    id
  }
}
    `;
export const FindUserDocument = gql`
    query findUser($userId: String!) {
  user(id: $userId) {
    id
    name
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    AddUserToJob(variables: AddUserToJobMutationVariables): Promise<AddUserToJobMutation> {
      return client.request<AddUserToJobMutation>(print(AddUserToJobDocument), variables);
    },
    EditUser(variables: EditUserMutationVariables): Promise<EditUserMutation> {
      return client.request<EditUserMutation>(print(EditUserDocument), variables);
    },
    findUser(variables: FindUserQueryVariables): Promise<FindUserQuery> {
      return client.request<FindUserQuery>(print(FindUserDocument), variables);
    }
  };
}