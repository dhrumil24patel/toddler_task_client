import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';

import {reportDashboardContainerState} from '../../actions/index';

import EmployeeListRow from './employeeListRow';

import {navbartoplinks, dropdownmenu, dropdownmessages} from '../../../src/styles/filterableTable.scss';

class EmployeeListContainer extends Component {

    constructor(props) {
        super(props);

        this.renderRows = this.renderRows.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
    }

    componentWillMount() {
        this.renderRows = this.renderRows.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleAddEmployeeClick(e) {
        // console.log('handleAddEmployee');
        this.props.reportDashboardContainerState('addEmployee');
    }

    renderRows() {
        if(this.props.users) {
            return this.props.users.map(item => {
                return (<EmployeeListRow key={item._id} user={item}/>);
            });
        }
        return(<div/>);
    }

    render() {
        // console.log(this.props);
        return(
            <div id={'page-wrapper'}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Employees</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2">
                        <i onClick={this.handleAddEmployeeClick} className={'fa fa-plus fa-2x'}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className={'table-responsive'}>
                            <table className={'table table-bordered table-hover table-striped'}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let organization;
    if(state.authentication.userData) {
        organization = state.authentication.userData.user.organization;
    }
    return ({
        authentication: state.authentication,
        organization
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportDashboardContainerState
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        GetAllUsersWithDetails,
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
    )
)(connect(mapStateToProps, mapDispatchToProps)(EmployeeListContainer)));
