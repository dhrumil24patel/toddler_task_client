import React, { Component } from 'react';

import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {reportDashboardContainerState, reportViewingQuestionaire} from '../../actions/index';
import {reportAuthenticationProcessing} from '../../../authentication/actions/index';

import EmployeeResponseListRow from './employeeResponseListRow';


class ViewQuestionaireContainer extends Component {

    constructor(props) {
        super(props);

        this.renderRows = this.renderRows.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount() {
        this.renderRows = this.renderRows.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleCancel(e) {
        this.props.reportViewingQuestionaire(null);
        this.props.reportDashboardContainerState('responseList');
    }

    renderRows() {
        if(this.props.questionaires) {
            return this.props.questionaires.map(item => {
                return (<EmployeeResponseListRow key={item._id} questionaire={item}/>);
            });
        }
        return(<div/>);
    }

    renderQuestions() {
        if(this.props.questionaire && this.props.questionaire.questions) {
            return this.props.questionaire.questions.map(item => {
                return (
                    <div key={item.title} className={'form-group'}>
                        <label>{item.title}</label>
                        <br/>
                        <div>{item.response}</div>
                    </div>
                );
            });
        }
        return (<div/>);
    }

    render() {
        const { questionaire  } = this.props;
        return(
            <div id={'page-wrapper'}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Questionaire</h1>
                    </div>
                </div>

                <div className={'row'}>
                    <div className="col-md-6 col-md-offset-3">
                        <h2>{this.props.questionaire.username}</h2>
                        <form name="form" onSubmit={this.handleCancel}>
                            <div className={'form-group'}>
                                <label htmlFor="questionaireTemplate">Questionaire Template</label>
                                <div>{questionaire.questionaireTemplateType}</div>
                            </div>
                            {this.renderQuestions()}
                            <div className="form-group">
                                <button onClick={this.handleCancel} className="btn btn-link">Back</button>
                            </div>
                        </form>
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
        reportDashboardContainerState,
        reportAuthenticationProcessing,
        reportViewingQuestionaire
    }, dispatch);
}

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(ViewQuestionaireContainer));
