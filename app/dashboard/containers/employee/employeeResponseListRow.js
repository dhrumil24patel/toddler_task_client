import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeleteUser from '../../../graphql/mutations/deleteUser';

import {performLogout, reportUserData} from '../../../authentication/actions/index';
import {reportRespondingQuestionaire, reportDashboardContainerState, reportViewingQuestionaire} from '../../../dashboard/actions/index';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';

class ResponseListRow extends Component {

    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleView = this.handleView.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleEdit(e) {
        this.props.reportRespondingQuestionaire(this.props.questionaire);
        this.props.reportDashboardContainerState('respondQuestionaire');
    }

    handleView(e) {
        this.props.reportViewingQuestionaire(this.props.questionaire);
        this.props.reportDashboardContainerState('viewQuestionaire');
    }

    handleDelete(e) {
        this.props.deleteUser({username: this.props.user.username, organization: this.props.user.organization});
    }

    renderActions() {
        return (
            <td>
                <ui>
                    <li onClick={this.handleView} className={'fa fa-eye fa-fw'}/>
                    {(!this.props.questionaire.responded ?
                        <li onClick={this.handleEdit} className={'fa fa-edit fa-fw'}/> : <li className={'fa fa-sdsd fa-fw'}/>)}
                </ui>
            </td>
        );
    }


    render() {
        return(
            <tr>
                <td>{this.props.questionaire.username}</td>
                <td>{this.props.questionaire.questionaireTemplateType}</td>
                <td>{this.props.questionaire.assignedAt}</td>
                {(this.props.questionaire.responded ? <td>{'Yes'}</td> : <td>{'No'}</td>)}
                {this.renderActions()}
            </tr>
        );
    }
}

function mapStateToProps(state) {
    let organization;
    let username;
    if(state.authentication.userData) {
        organization = state.authentication.userData.user.organization;
        username = state.authentication.userData.user.username;
    }
    return ({
        authentication: state.authentication,
        organization
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportRespondingQuestionaire,
        reportDashboardContainerState,
        reportViewingQuestionaire
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        DeleteUser,
        {
            options: {
                update: (proxy, mutationResult) => {
                    if(mutationResult.data.deleteUser && mutationResult.data.deleteUser) {
                        const deletedUser = mutationResult.data.deleteUser;
                        const query = GetAllUsersWithDetails;
                        const data = proxy.readQuery({
                            query,
                            variables: {
                                organization: deletedUser.organization
                            }
                        });

                        data.users = [...data.users.filter(user => user.username !== deletedUser.username)];

                        proxy.writeQuery({query, data});

                        // Create cache entry for QueryGetEvent
                        const query2 = GetAllUsersWithDetails;
                        const variables = {
                            username: deletedUser.username,
                            organization: deletedUser.organization
                        };
                        const data2 = {users: [...data.users.filter(user => user.username !== deletedUser.username)]};

                        proxy.writeQuery({query: query2, variables, data: data2});
                        console.log(deletedUser, data);
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
)(connect(mapStateToProps, mapDispatchToProps)(ResponseListRow)));
