import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dropdownmenu, dropdownmessages, navbartoplinks} from '../../../src/styles/filterableTable.scss';

import TopBarButton from './topBarButton';
import AdminSideBar from './adminSideBar';


export class TopBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return(
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: '0'}}>
                <div className="navbar-header">
                    <a className="navbar-brand" href="">Admin Dashboard</a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <TopBarButton type={'user'}/>
                </ul>

                {(this.props.isAdmin ? <AdminSideBar/> : <div/>)}
            </nav>
        );
    }
}

function mapStateToProps(state) {
    let isAdmin;
    if(state.authentication.userData) {
        isAdmin = state.authentication.userData.user.isAdmin;
    }
    return({
        isAdmin
    });
}

export default connect(mapStateToProps, null)(TopBar);