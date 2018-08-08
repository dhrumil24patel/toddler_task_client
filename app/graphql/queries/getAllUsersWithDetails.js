import gql from 'graphql-tag';

export default gql(`
query($organization: String!) {
  users(organization:$organization, limit: 100) {
    _id
    username
    firstName
    lastName
    isAdmin
    department
    organization
  }
}`);
