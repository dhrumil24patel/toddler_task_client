// import gql from 'graphql-tag';
// import {c} from 'apollo-client';
// import { setContext } from 'apollo-link-context';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import {ApolloLink} from 'apollo-link';

let apolloClient;

export const getApolloClient = () => {
    if(!apolloClient) {
        // const authLink = setContext((_, { headers }) => {
        //     const token = localStorage.getItem('user');
        //     return {
        //         headers: {
        //             ...headers,
        //             authorization: token ? `Bearer ${token}` : 'simple',
        //         }
        //     };
        // });
        const httpLink = createHttpLink({
            uri: 'http://localhost:3000/graphql',
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = localStorage.getItem('token');
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : 'token',
                }
            };
        });
        apolloClient = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });
        // apolloClient = new ApolloClient({
        //     link: ApolloLink.from([
        //         authLink
        //     ]),
        //     uri: 'http://localhost:3000/graphql'
        // });
    }
    // console.log(apolloClient);

    // apolloClient
    //     .query({
    //         query: gql`
    //   {
    //     users(limit: 2) {
    //       username
    //     }
    //   }
    // `
    //     })
    //     .then(result => {});
    return apolloClient;
};