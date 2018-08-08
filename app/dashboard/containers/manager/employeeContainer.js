import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {navbartoplinks, dropdownmenu, dropdownmessages} from '../../../src/styles/filterableTable.scss';

class AdminDashboard extends Component {

    componentWillReceiveProps(nextProps) {
    }


    render() {
        // console.log(this.props);
        return(
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-users fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">26</div>
                                    <div>Total Employees</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div className="panel-footer">
                                <span className="pull-left">View</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(AdminDashboard));
