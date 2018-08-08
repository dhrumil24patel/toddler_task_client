import React, { Component } from 'react';

import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {performLogout, reportUserData} from '../../../authentication/actions/index';
import {reportDashboardContainerState} from '../../../dashboard/actions/index';

import TopBar from '../topBar';
import EmployeeDashboard from './employeeDashboard';
import EmployeeResponseListContainer from './employeeResponseListContainer';
import RespondQuestionaireContainer from './respondQuestionaireContainer';
import ViewQuestionaireContainer from './employeeViewResponseContainer';

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
                return (<EmployeeDashboard organization={this.props.authentication.userData.user.organization}
                                        username={this.props.authentication.userData.user.username}/>);
            } else if (this.props.dashboardContainerState === 'responseList') {
                return (<EmployeeResponseListContainer organization={this.props.authentication.userData.user.organization}
                                                   username={this.props.authentication.userData.user.username}/>);
            } else if (this.props.dashboardContainerState === 'respondQuestionaire' && this.props.respondingQuestionaire) {
                return (<RespondQuestionaireContainer questionaire={this.props.respondingQuestionaire}
                                                       organization={this.props.authentication.userData.user.organization}
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
        // console.log(this.props);
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
        respondingQuestionaire: state.dashboard.respondingQuestionaire,
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
