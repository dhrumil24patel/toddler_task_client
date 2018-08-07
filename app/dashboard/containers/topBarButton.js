import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {dropdownmenu, dropdownmessages, navbartoplinks} from '../../src/styles/filterableTable.scss';

import {reportOpenTopBarButtonsTray} from '../actions/index';
import TopUserButtonsTray from './topUserButtonsTray';


export class TopBarButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // console.log(e);
        const temp = {
            ...this.props.openTopBarButtonsTray
        };
        temp[this.props.type] = !this.props.openTopBarButtonsTray[this.props.type];
        this.props.reportOpenTopBarButtonsTray(temp);
    }

    render() {
        const faClass = `fa fa-${this.props.type} fa-fw`;
        let faArrowClass;
        let dropdownClass;
        if(this.props.openTopBarButtonsTray[this.props.type]) {
            faArrowClass = 'fa fa-caret-up';
            dropdownClass = 'dropdown open';
        } else {
            faArrowClass = 'fa fa-caret-down';
            dropdownClass = 'dropdown';
        }
        return(
            <li className={dropdownClass}>
                <a className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClick}>
                    <i className={faClass}></i> <i className={faArrowClass}></i>
                </a>
                <TopUserButtonsTray/>
            </li>
        );
    }
}

function mapStateToProps(state) {
    return({
        openTopBarButtonsTray: state.dashboard.openTopBarButtonsTray
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportOpenTopBarButtonsTray
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarButton);