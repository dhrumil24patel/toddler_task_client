import gql from 'graphql-tag';

export default gql(`
mutation($username: String!, $organization: String!){
    deleteUser(input:{
        username: $username,
        organization: $organization
    }){
        username
        organization
    }
}
`);