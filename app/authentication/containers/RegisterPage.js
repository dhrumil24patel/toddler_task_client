import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { graphql, compose, withApollo } from 'react-apollo';
import GetAllOrganization from '../../graphql/queries/getAllOrganizations';
import RegisterUser from '../../graphql/mutations/register';

import DepartmentsListComponent from '../components/departmentsListComponent';

import {performRegister} from '../actions/index';
import {reportAuthenticationProcessing} from '../actions';
import {bindActionCreators} from 'redux';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                organization: '',
                department: '',
                admin: false
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.organization && user.department) {
            this.props.performRegister(user);
            this.props.reportAuthenticationProcessing(true);
            this.props.register(user)
                .then(res=>{
                    localStorage.setItem('user', JSON.stringify(res.data.register));
                    this.props.reportUserData(res.data.register);
                    console.log('done registration');
                    this.props.history.push('/');
                })
                .catch(err=>{
                    console.log('err registration ', JSON.stringify(err));
                    alert('problem with username');
                });
        }
    }

    renderOrganizations() {
        console.log('register ', this.props, this.state);
        const {organizations} = this.props;
        const user = this.state.user;
        if(organizations.length === 1 || user.organization === '') {
            // user.organization = organizations[0].name;
            // this.setState({user: user});
        }
        return [{_id: 'default', name: 'pick an organization'}, ...organizations].map(item=>{
            if(item._id === 'default') {
                return (<option selected={'selected'} disabled={'disabled'} value={item.name} key={item._id}>{item.name}</option>);
            }
            return (<option value={item.name} key={item._id}>{item.name}</option>);
        });
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="organization">Organization</label>
                        <select name="organization" className="form-control" value={user.organization} onChange={this.handleChange} onSelect={this.handleChange}>
                            {this.renderOrganizations()}
                        </select>
                        {submitted && !user.organization &&
                        <div className="help-block">Organization is required</div>
                        }
                    </div>
                    {(user.organization !== '' ? <DepartmentsListComponent organization={user.organization} submitted={submitted} user={user} handleChange={this.handleChange}/> : '')}
                    <div className={'form-group'}>
                        <label htmlFor="admin">Admin</label>
                        <input type="checkbox"  name="admin" value={user.admin} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authenticationProcessing } = state.authentication;
    return {
        registering: authenticationProcessing
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        performRegister,
        reportAuthenticationProcessing
    }, dispatch);
}

const connectedRegisterPage = withApollo(compose(
    graphql(
        GetAllOrganization,
        {
            options: {
                fetchPolicy: 'cache-first'
            },
            props: ({ data: { organizations =  [], loading } }) => ({
                organizations: organizations,
                loading
            })
        }
), graphql(
    RegisterUser,
    {
        options: {
            update: (proxy, {data: {addUser}}) => {
                const query = GetAllOrganization;
                const data = proxy.readQuery({query});

                data.users = [...data.users.filter(user => user._id !== addUser._id), addUser];

                proxy.writeQuery({query, data});

                // Create cache entry for QueryGetEvent
                const query2 = GetAllOrganization;
                const variables = { name: addUser.name, password: addUser.password };
                const data2 = { getEvent: { ...addUser } };

                proxy.writeQuery({ query: query2, variables, data: data2 });
                console.log(addUser, data);
            }
        },
        props: (props) => ({
            register: (event) => {
                return props.mutate({
                    variables: event,
                    optimisticResponse: () => ({
                        // addUser: {
                        //     name: event.username, password: event.password, __typename: 'User', users: { __typename: 'User' }
                        // }
                        register: {
                            firstName: event.firstName, lastName: event.lastName, username: event.username, _id: '', password: event.password, __typename: 'User'
                        }
                    }),
                });
            }
        })
    }
))(connect(mapStateToProps, mapDispatchToProps)(RegisterPage)));

export { connectedRegisterPage as RegisterPage };