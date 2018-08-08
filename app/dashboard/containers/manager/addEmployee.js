import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterUser from '../../../graphql/mutations/register';

import DepartmentsListComponent from '../../../authentication/components/departmentsListComponent';

import {reportDashboardContainerState} from '../../../dashboard/actions/index';
import {reportAuthenticationProcessing} from '../../../authentication/actions/index';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';
import GetAllOrganizations from '../../../graphql/queries/getAllOrganizations';

class AddEmployee extends Component {

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
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
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

    handleCancel(event) {
        this.props.reportDashboardContainerState('employeeList');
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.organization && user.department) {
            this.props.reportAuthenticationProcessing(true);
            this.props.register(user)
                .then(res=>{
                    this.props.reportAuthenticationProcessing(false);
                    // localStorage.setItem('user', JSON.stringify(res.data.register));
                    // this.props.reportUserData(res.data.register);
                    console.log('done adding user ', res);
                    this.props.reportDashboardContainerState('employeeList');
                    // this.props.history.push('/');
                })
                .catch(err=>{
                    this.props.reportAuthenticationProcessing(false);
                    console.log('err registration ', err);
                    if(err.message) {
                        alert('problem with username');
                    }
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
            if(item.name === this.props.organization) {
                return (<option value={item.name} key={item._id}>{item.name}</option>);
            }
            return (<option disabled={'disabled'} value={item.name} key={item._id}>{item.name}</option>);
        });
    }


    render() {
        console.log(this.props);
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div id={'page-wrapper'}>
                <div className={'row'}>
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
                            <div className="form-group">
                                <button className="btn btn-primary">Register</button>
                                {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <button onClick={this.handleCancel} className="btn btn-link">Cancel</button>
                            </div>
                </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authentication: state.authentication,
        organization: state.authentication.userData.user.organization
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportDashboardContainerState,
        reportAuthenticationProcessing
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        GetAllUsersWithDetails,
        {
            options: (props) => ({
                fetchPolicy: 'cache-first',
                variables: {organization: props.organization}
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
    ),
    graphql(
        GetAllOrganizations,
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
                update: (proxy, mutationResult) => {
                    if(mutationResult.data.register.user && mutationResult.data.register.user.firstName) {
                        const addedUser = mutationResult.data.register.user;
                        console.log('here 1 ', addedUser);
                        const query = GetAllUsersWithDetails;
                        console.log('here 2');
                        const data = proxy.readQuery({
                            query,
                            variables: {
                                organization: addedUser.organization
                            }
                        });
                        console.log('here 3');

                        data.users = [...data.users.filter(user => user._id !== addedUser._id), addedUser];

                        proxy.writeQuery({query, data});

                        // Create cache entry for QueryGetEvent
                        const query2 = GetAllUsersWithDetails;
                        const variables = {
                            username: addedUser.username,
                            password: addedUser.password,
                            firstName: addedUser.firstName,
                            lastName: addedUser.lastName,
                            isAdmin: false,
                            organization: addedUser.organization,
                            department: addedUser.department
                        };
                        const data2 = {users: [...data.users.filter(user => user._id !== addedUser._id), addedUser]};

                        proxy.writeQuery({query: query2, variables, data: data2});
                        console.log(addedUser, data);
                    }
                }
            },
            props: (props) => ({
                register: (user) => {
                    return props.mutate({
                        variables: user,
                        optimisticResponse: () => ({
                            // addUser: {
                            //     name: user.username, password: user.password, __typename: 'User', users: { __typename: 'User' }
                            // }
                            register: {
                                user: {}, token: '', __typename: 'User'
                            }
                        }),
                    });
                }
            })
        }
    )
)(connect(mapStateToProps, mapDispatchToProps)(AddEmployee)));
