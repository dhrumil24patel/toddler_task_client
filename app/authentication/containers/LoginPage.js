import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, compose, withApollo } from 'react-apollo';
import GetAllUsers from '../../graphql/queries/getAllUsers';
import LoginUser from '../../graphql/mutations/login';

import { reportAuthenticationProcessing, performLogin, reportUserData } from '../actions/index';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(performLogout(true));

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if(localStorage.getItem('user')) {
            props.history.push('/');
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const {login} = this.props;
        if (username && password) {
            this.props.performLogin(username, password);
            this.props.reportAuthenticationProcessing(true);
            login({username, password})
                .then(res => {
                    this.props.reportAuthenticationProcessing(false);
                    console.log('added user ', res);
                    if(!res.data.login.user || !res.data.login.token) {
                        alert('Username Password pair mismatch');
                    } else {
                        localStorage.setItem('user', JSON.stringify(res.data.login));
                        this.props.reportUserData(res.data.login);
                        this.props.history.push('/');
                    }
                })
                .catch(err=>{
                    this.props.reportAuthenticationProcessing(false);
                    console.log(err);
                });
        }
    }

    render() {
        console.log(this.props);
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loggingIn &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('LoginPage');
    const { authenticationProcessing } = state.authentication;
    return {
        loggingIn: authenticationProcessing
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        performLogin,
        reportAuthenticationProcessing,
        reportUserData
    }, dispatch);
}

const connectedLoginPage = withApollo(compose(graphql(
    GetAllUsers,
    {
        options: {
            fetchPolicy: 'cache-first'
        },
        props: ({ data: { users =  [], loading } }) => ({
            users: users,
            loading
        })
    }
), graphql(
    LoginUser,
    {
        options: {
            update: (proxy, {data: {addUser}}) => {
                // const query = GetAllUsers;
                // const data = proxy.readQuery({query});
                //
                // data.users = [...data.users.filter(user => user._id !== addUser._id), addUser];
                //
                // proxy.writeQuery({query, data});
                //
                // // Create cache entry for QueryGetEvent
                // const query2 = GetAllUsers;
                // const variables = { username: addUser.username, password: addUser.password };
                // const data2 = { getEvent: { ...addUser } };
                //
                // proxy.writeQuery({ query: query2, variables, data: data2 });
                // console.log(addUser, data);
            }
        },
        props: (props) => ({
            login: (event) => {
                return props.mutate({
                    variables: { username: event.username, password: event.password },
                    optimisticResponse: () => ({
                        // login: {
                        //     name: event.username, password: event.password, __typename: 'User', users: { __typename: 'User' }
                        // }
                        login: {
                            user: {}, token: '', username: event.username, _id: '', password: event.password, __typename: 'User'
                        }
                    }),
                });
            }
        })
    }
))(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));
export { connectedLoginPage as LoginPage };
