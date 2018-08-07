import gql from 'graphql-tag';

export default gql(`
query {
  users(limit: 100) {
    _id
    username
  }
}`);
