import gql from 'graphql-tag';

export default gql(`
mutation($username: String!, $password: String!){
    addUser(input:{
        name: $name,
        password: $password
    }){
        _id
        name
        password
    }
}
`);