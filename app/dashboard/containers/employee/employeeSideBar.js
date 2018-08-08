import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {reportDashboardContainerState} from '../../actions/index';


class AdminSideBar extends Component {

    constructor(props) {
        super(props);

        this.handleDashboardClick = this.handleDashboardClick.bind(this);
        this.handleEmployeesClick = this.handleEmployeesClick.bind(this);
        this.handleResponseClick = this.handleResponseClick.bind(this);
        this.handleFeedbackClick = this.handleFeedbackClick.bind(this);
    }

    handleDashboardClick(e) {
        this.props.reportDashboardContainerState('dashboard');
    }

    handleEmployeesClick(e) {
        this.props.reportDashboardContainerState('employeeList');
    }

    handleResponseClick(e) {
        this.props.reportDashboardContainerState('responseList');
    }

    handleFeedbackClick(e) {
        this.props.reportDashboardContainerState('feedbackList');
    }

    render() {
        // console.log(this.props);
        return(
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <a onClick={this.handleDashboardClick}><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a onClick={this.handleResponseClick}><i className="fa fa-clipboard fa-fw"></i> Responses</a>
                        </li>
                        <li>
                            <a onClick={this.handleFeedbackClick}><i className="fa fa-comments fa-fw"></i> Feedback</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return({});
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportDashboardContainerState
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSideBar);