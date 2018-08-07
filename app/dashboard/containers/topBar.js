import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dropdownmenu, dropdownmessages, navbartoplinks} from '../../src/styles/filterableTable.scss';

import TopBarButton from './topBarButton';


export class TopBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return(
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: '0'}}>
                <div className="navbar-header">
                    <a className="navbar-brand" href="index.html">Admin Dashboard</a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <TopBarButton type={'user'}/>
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return({});
}

export default connect(mapStateToProps, null)(TopBar);