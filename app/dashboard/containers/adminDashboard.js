import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../routes';

import { graphql, compose, withApollo } from 'react-apollo';
import GetAllUsers from '../../graphql/queries/getAllUsers';

class AdminDashboard extends Component {
    render() {
        // console.log(this.props);
        return(
            <div>
                <h1>Admin dashboard</h1>
            </div>
        );
    }
}

// const App = () =>
//     <div>
//         <h1>Filter table</h1>
//         { Routes }
//         <footer className={footer}>
//             <Link to="/">Filterable Table</Link>
//             <Link to="/about">About</Link>
//             <Link to="/login">Login</Link>
//         </footer>
//     </div>;

export default withApollo(compose(
    graphql(
        GetAllUsers,
        {
            options: () => ({
                fetchPolicy: 'cache-first',
                context: { version: 1 }
                // refetchQueries: [{
                //     query: SomeOtherQuery,
                //     context: { version: 1 },    // <-- need this to split the link correctly but refetchQueries only accepts `query` and `variables`.  Also context might be different than the mutate query.
                //     variables: {/*...*/ }
                // }]
            }),
            props: ({ data: { users =  [], loading } }) => ({
                users: users,
                loading
            })
        }
    )
)(AdminDashboard));
