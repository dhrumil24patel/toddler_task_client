import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetAllUsers from '../../../graphql/queries/getAllUsers';

import {} from '../../../src/styles/filterableTable.scss';

import {performLogout, reportUserData} from '../../../authentication/actions/index';
import {reportDashboardContainerState} from '../../actions/index';

import {navbartoplinks, dropdownmenu, dropdownmessages} from '../../../src/styles/filterableTable.scss';
import GetAllQuestionairesForEmployee from '../../../graphql/queries/getQuestionaireForEmployee';

class ManagerDashboard extends Component {

    constructor(props) {
        super(props);
        this.handleEmployeeViewClick = this.handleEmployeeViewClick.bind(this);
        this.handleResponseViewClick = this.handleResponseViewClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleEmployeeViewClick(e) {
        this.props.reportDashboardContainerState('employeeList');
    }

    handleResponseViewClick(e) {
        this.props.reportDashboardContainerState('responseList');
    }


    render() {
        // console.log(this.props);
        return(
            <div id={'page-wrapper'}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-green">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-clipboard fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">{this.props.questionaires.length}</div>
                                        <div>Total Responses</div>
                                    </div>
                                </div>
                            </div>
                            <a onClick={this.handleResponseViewClick}>
                                <div className="panel-footer">
                                    <span className="pull-left">View</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">26</div>
                                        <div>Total Feedback</div>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        authentication: state.authentication
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        performLogout,
        reportUserData,
        reportDashboardContainerState
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        GetAllUsers,
        {
            options: (props) => ({
                fetchPolicy: 'cache-first',
                variables: {organization: props.organization}
                // refetchQueries: [{
                //     query: SomeOtherQuery,
                //     context: { version: 1 },    // <-- need this to split the link correctly but refetchQueries only accepts `query` and `variables`.  Also context might be different than the mutate query.
                //     variables: {/*...*/ }
                // }]
            }),
            props: ({ data: { users =  [], loading } }) => ({
                users: users,
                loading
            })
        }
    ), graphql(
        GetAllQuestionairesForEmployee,
        {
            options: (props) => ({
                fetchPolicy: 'cache-first',
                variables: {username: props.username}
                // refetchQueries: [{
                //     query: SomeOtherQuery,
                //     context: { version: 1 },    // <-- need this to split the link correctly but refetchQueries only accepts `query` and `variables`.  Also context might be different than the mutate query.
                //     variables: {/*...*/ }
                // }]
            }),
            props: ({ data: { questionaires =  [], loading } }) => ({
                questionaires: questionaires,
                loading
            })
        }
    )
)(connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard)));
