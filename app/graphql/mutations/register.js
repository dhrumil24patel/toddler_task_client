import gql from 'graphql-tag';

export default gql(`
mutation($username: String!, $password: String!, $firstName: String!, $lastName: String!, $organization: String!, $department: String!, $admin: Boolean!){
    register(input:{
        username: $username,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        organization: $organization,
        department: $department,
        isAdmin: $admin
        
    }){
        user{
            _id
            username
            firstName
            password
        }
        token
    }
}
`);