import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeleteUser from '../../../graphql/mutations/deleteUser';

import {performLogout, reportUserData} from '../../../authentication/actions/index';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';

class EmployeeListRow extends Component {

    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleEdit(e) {
    }

    handleDelete(e) {
        this.props.deleteUser({username: this.props.user.username, organization: this.props.user.organization});
    }

    renderActions() {
        if(this.props.authentication.userData.user._id !== this.props.user._id) {
            return (
                <td>
                    <ui>
                        <li onClick={this.handleEdit} className={'fa fa-edit fa-fw'}/>
                        <li onClick={this.handleDelete} className={'fa fa-trash fa-fw'}/>
                    </ui>
                </td>
            );
        }
        return (
            <td></td>
        );
    }


    render() {
        console.log(this.props);
        return(
            <tr>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.department}</td>
                {this.renderActions()}
            </tr>
        );
    }
}

function mapStateToProps(state) {
    let organization;
    if(state.authentication.userData) {
        organization = state.authentication.userData.user.organization;
    }
    return ({
        authentication: state.authentication,
        organization
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        performLogout,
        reportUserData
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        DeleteUser,
        {
            options: {
                update: (proxy, mutationResult) => {
                    if(mutationResult.data.deleteUser && mutationResult.data.deleteUser) {
                        const addedUser = mutationResult.data.deleteUser;
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

                        data.users = [...data.users.filter(user => user.username !== addedUser.username)];

                        proxy.writeQuery({query, data});

                        // Create cache entry for QueryGetEvent
                        const query2 = GetAllUsersWithDetails;
                        const variables = {
                            username: addedUser.username,
                            organization: addedUser.organization
                        };
                        const data2 = {users: [...data.users.filter(user => user.username !== addedUser.username)]};

                        proxy.writeQuery({query: query2, variables, data: data2});
                        console.log(addedUser, data);
                    }
                }
            },
            props: (props) => ({
                deleteUser: (userMeta) => {
                    return props.mutate({
                        variables: userMeta,
                        optimisticResponse: () => ({
                            // addUser: {
                            //     name: user.username, password: user.password, __typename: 'User', users: { __typename: 'User' }
                            // }
                            register: {
                                username: '', organization: '', __typename: 'UserMeta'
                            }
                        }),
                    });
                }
            })
        }
    )
)(connect(mapStateToProps, mapDispatchToProps)(EmployeeListRow)));
