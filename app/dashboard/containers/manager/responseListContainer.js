import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';
import GetAllQuestionairesForManager from '../../../graphql/queries/getAllQuestionairesForManager';

import {reportDashboardContainerState} from '../../actions/index';

import ResponseListRow from './responseListRow';


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
                return (<ResponseListRow key={item._id} questionaire={item}/>);
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
                        <h1 className="page-header">Questionaire Responses</h1>
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
    return ({
        authentication: state.authentication,
        organization: state.authentication.userData.user.organization,
        username: state.authentication.userData.user.username
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportDashboardContainerState
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        GetAllQuestionairesForManager,
        {
            options: (props) => ({
                fetchPolicy: 'cache-first',
                variables: {assignedBy: props.username}
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
