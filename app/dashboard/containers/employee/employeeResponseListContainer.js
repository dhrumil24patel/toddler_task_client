import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GetAllQuestionairesForEmployee from '../../../graphql/queries/getQuestionaireForEmployee';

import {reportDashboardContainerState} from '../../actions/index';

import EmployeeResponseListRow from './employeeResponseListRow';


class ResponseListContainer extends Component {

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
        console.log('handleAddEmployee');
        this.props.reportDashboardContainerState('assignQuestionaire');
    }

    renderRows() {
        if(this.props.questionaires) {
            return this.props.questionaires.map(item => {
                return (<EmployeeResponseListRow key={item._id} questionaire={item}/>);
            });
        }
        return(<div/>);
    }

    render() {
        console.log(this.props);
        return(
            <div id={'page-wrapper'}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Questionaires</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className={'table-responsive'}>
                            <table className={'table table-bordered table-hover table-striped'}>
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Template</th>
                                    <th>Assigned At</th>
                                    <th>Responded</th>
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
    let username;
    if(state.authentication.userData) {
        organization = state.authentication.userData.user.organization;
        username = state.authentication.userData.user.username;
    }
    return ({
        authentication: state.authentication,
        organization,
        username
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportDashboardContainerState
    }, dispatch);
}

export default withApollo(compose(
    graphql(
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
)(connect(mapStateToProps, mapDispatchToProps)(ResponseListContainer)));
