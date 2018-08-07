import React, {Component} from 'react';
import {connect} from 'react-redux';

import {performLogout} from '../../authentication/actions/index';
import {reportOpenTopBarButtonsTray} from '../actions/index';
import {bindActionCreators} from 'redux';


class TopUserButtonsTray extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // console.log(e);
        // console.log(this.props);
        const temp = {
            ...this.props.openTopBarButtonsTray
        };
        temp[this.props.type] = !this.props.openTopBarButtonsTray[this.props.type];
        this.props.reportOpenTopBarButtonsTray(temp);
        this.props.performLogout(true);
        setTimeout(function tempfn() {
            this.props.performLogout(true);
        }, 0);
    }

    render() {
        return(
            <ul className="dropdown-menu dropdown-user">
                <li><a onClick={this.handleClick}><i className="fa fa-sign-out fa-fw"></i> Logout</a></li>
            </ul>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return({
        dashboard: state.dashboard,
        authentication: state.authentication,
        openTopBarButtonsTray: state.dashboard.openTopBarButtonsTray
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        performLogout,
        reportOpenTopBarButtonsTray
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUserButtonsTray);