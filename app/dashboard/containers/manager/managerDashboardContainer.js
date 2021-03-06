import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetAllUsers from '../../../graphql/queries/getAllUsers';

import {performLogout, reportUserData} from '../../../authentication/actions/index';
import {reportDashboardContainerState} from '../../../dashboard/actions/index';

import TopBar from '../topBar';
import AdminDashboard from './managerDashboard';
import EmployeeListContainer from './employeeListContainer';
import AddEmployee from './addEmployee';
import ResponseListContainer from './responseListContainer';
import AssignQuestionaireContainer from './assignQuestionaireContainer';
import ViewQuestionaireContainer from '../employee/employeeViewResponseContainer';

import {navbartoplinks, dropdownmenu, dropdownmessages} from '../../../src/styles/filterableTable.scss';

class ManagerDashboardContainer extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.authentication.logoutUser !== this.props.authentication.logoutUser && nextProps.authentication.logoutUser) {
            console.log('lets logout ');
            localStorage.removeItem('user');
            this.props.reportDashboardContainerState('dashboard');
            this.props.reportUserData(null);
            this.props.history.push('/');
            // document.location.reload();
            this.props.client.resetStore();
        }
    }

    renderComponent() {
        console.log('renderComponent ', this.props.dashboardContainerState);
        if(this.props.authentication.userData) {
            if (this.props.dashboardContainerState === 'dashboard') {
                return (<AdminDashboard organization={this.props.authentication.userData.user.organization}
                                        username={this.props.authentication.userData.user.username}/>);
            } else if (this.props.dashboardContainerState === 'employeeList') {
                return (<EmployeeListContainer organization={this.props.authentication.userData.user.organization}/>);
            } else if (this.props.dashboardContainerState === 'addEmployee') {
                return (<AddEmployee organization={this.props.authentication.userData.user.organization}/>);
            } else if (this.props.dashboardContainerState === 'responseList') {
                return (<ResponseListContainer organization={this.props.authentication.userData.user.organization}
                                               username={this.props.authentication.userData.user.username}/>);
            } else if (this.props.dashboardContainerState === 'assignQuestionaire') {
                return (<AssignQuestionaireContainer organization={this.props.authentication.userData.user.organization}
                                                     username={this.props.authentication.userData.user.username}/>);
            } else if (this.props.dashboardContainerState === 'viewQuestionaire' && this.props.viewingQuestionaire) {
                return (<ViewQuestionaireContainer questionaire={this.props.viewingQuestionaire}
                                                   organization={this.props.authentication.userData.user.organization}
                                                   username={this.props.authentication.userData.user.username}/>);
            }
        }
        return(<div>nothing</div>);
    }

    render() {
        return(
            <div id={'wrapper'}>
                <TopBar />
                {this.renderComponent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authentication: state.authentication,
        dashboardContainerState: state.dashboard.dashboardContainerState,
        viewingQuestionaire: state.dashboard.viewingQuestionaire
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        performLogout,
        reportUserData,
        reportDashboardContainerState
    }, dispatch);
}

export default withApollo((connect(mapStateToProps, mapDispatchToProps)(ManagerDashboardContainer)));
