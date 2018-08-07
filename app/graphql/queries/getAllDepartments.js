import gql from 'graphql-tag';

export default gql(`
query($organization:String!) {
  departments(organization:$organization) {
    _id
    name
  }
}`);
