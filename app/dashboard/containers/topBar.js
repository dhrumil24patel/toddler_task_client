import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dropdownmenu, dropdownmessages, navbartoplinks} from '../../src/styles/filterableTable.scss';

import TopBarButton from './manager/topBarButton';
import AdminSideBar from './manager/adminSideBar';
import EmployeeSideBar from './employee/employeeSideBar';


export class TopBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return(
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: '0'}}>
                <div className="navbar-header">
                    {(this.props.user ?
                        <a className="navbar-brand" href="">{`${this.props.user.firstName} ${this.props.user.lastName}`}</a>
                        : <a className="navbar-brand" href="">Dashboard</a>)}
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <TopBarButton type={'user'}/>
                </ul>

                {(this.props.isAdmin ? <AdminSideBar/> : <EmployeeSideBar/>)}
            </nav>
        );
    }
}

function mapStateToProps(state) {
    let isAdmin;
    let user;
    if(state.authentication.userData) {
        isAdmin = state.authentication.userData.user.isAdmin;
        user = state.authentication.userData.user;
    }
    return({
        isAdmin,
        user
    });
}

export default connect(mapStateToProps, null)(TopBar);