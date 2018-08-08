import gql from 'graphql-tag';

export default gql(`
mutation($username: String!, $password: String!){
    login(input:{
        username: $username,
        password: $password
        
    }){
        user{
            _id
            username
            firstName
            lastName
            isAdmin
            organization
            department
        }
        token
    }
}
`);