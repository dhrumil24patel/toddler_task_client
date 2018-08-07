import gql from 'graphql-tag';

export default gql(`
query {
  organizations {
    _id
    name
  }
}`);
