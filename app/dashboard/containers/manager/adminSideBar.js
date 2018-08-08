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

    temp() {
        return(
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..."></input>
                                <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                        </li>
                        <li>
                            <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Charts<span
                                className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="flot.html">Flot Charts</a>
                                </li>
                                <li>
                                    <a href="morris.html">Morris.js Charts</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="tables.html"><i className="fa fa-table fa-fw"></i> Tables</a>
                        </li>
                        <li>
                            <a href="forms.html"><i className="fa fa-edit fa-fw"></i> Forms</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-wrench fa-fw"></i> UI Elements<span
                                className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="panels-wells.html">Panels and Wells</a>
                                </li>
                                <li>
                                    <a href="buttons.html">Buttons</a>
                                </li>
                                <li>
                                    <a href="notifications.html">Notifications</a>
                                </li>
                                <li>
                                    <a href="typography.html">Typography</a>
                                </li>
                                <li>
                                    <a href="icons.html"> Icons</a>
                                </li>
                                <li>
                                    <a href="grid.html">Grid</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span
                                className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Third Level <span className="fa arrow"></span></a>
                                    <ul className="nav nav-third-level">
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-files-o fa-fw"></i> Sample Pages<span
                                className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="blank.html">Blank Page</a>
                                </li>
                                <li>
                                    <a href="login.html">Login Page</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
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
                            <a onClick={this.handleEmployeesClick}><i className="fa fa-users fa-fw"></i> Employees</a>
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