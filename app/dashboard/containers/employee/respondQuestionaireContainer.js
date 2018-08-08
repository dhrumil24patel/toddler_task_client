import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';
import GetAllQuestionairesForEmployee from '../../../graphql/queries/getQuestionaireForEmployee';

import {reportDashboardContainerState} from '../../actions/index';
import {reportAuthenticationProcessing} from '../../../authentication/actions/index';

import EmployeeResponseListRow from './employeeResponseListRow';
import RespondQuestionaire from '../../../graphql/mutations/respondQuestionaire';
import GetAllQuestionaireForEmployee from '../../../graphql/queries/getQuestionaireForEmployee';


class RespondQuestionaireContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            user: {
                questionaireTemplate: this.props.questionaire.questionaireTemplateType
            },
            questionsResponses: { },
            submitted: false
        };

        if(this.props.questionaire && this.props.questionaire.questions) {
            this.state.questions = this.props.questionaire.questions;
        }

        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleAddEmployeeClick(e) {
        console.log('handleAddEmployee');
        this.props.reportDashboardContainerState('assignQuestionaire');
    }

    handleCancel(e) {
        console.log('handleAddEmployee');
        this.props.reportDashboardContainerState('responseList');
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        // create questionaire response input
        const questionaireResponse = {...this.props.questionaire};
        const questions = [];
        Object.keys(this.state.questionsResponses).forEach((item) => {
            const question = {};
            const temp = this.state.questionsResponses[item];
            question.inputType  = temp.inputType;
            question.title  = temp.title;
            question.descriptionText  = temp.descriptionText;
            question.response  = temp.response;
            questions.push(question);
        });
        questionaireResponse.questions = questions;
        console.log('handleSubmit ', questionaireResponse);
        if (true) {
            this.props.reportAuthenticationProcessing(true);
            this.props.respondToQuestionaire(questionaireResponse)
                .then(res=>{
                    this.props.reportAuthenticationProcessing(false);
                    // localStorage.setItem('user', JSON.stringify(res.data.register));
                    // this.props.reportUserData(res.data.register);
                    console.log('done adding  user  ', res);
                    this.props.reportDashboardContainerState('responseList');
                    // this.props.history.push('/');
                })
                .catch(err=>{
                    this.props.reportAuthenticationProcessing(false);
                    console.log('err questionaire ', err);
                    if(err.message) {
                        alert('problem with something');
                    }
                });
        }
    }

    handleChange(item, e) {
        console.log('handleChange ', e, item);
        if(e && item) {
            const questionsResponses = {...this.state.questionsResponses};
            questionsResponses[item.title] = {...item};
            questionsResponses[item.title].response = e.target.value;
            this.setState({questionsResponses});
        }
    }

    renderQuestions() {
        console.log('renderQuestions ', this.props, this.state);
        const { registering  } = this.props;
        const { user, submitted, questionsResponses } = this.state;
        if(this.props.questionaire && this.props.questionaire.questions) {
            return this.state.questions.map(item => {
                let response = '';
                if(questionsResponses[item.title]) {
                    response = questionsResponses[item.title].response;
                }
                return (
                    <div key={item.title} className={'form-group' + (submitted && (!response || response === '') ? ' has-error' : '')}>
                        <label>{item.title}</label>
                        <input type="text" className="form-control" name={item.title} value={response} onChange={this.handleChange.bind(this, item)} />
                        {submitted && (!response || response === '') &&
                        <div className="help-block">Response is required</div>
                        }
                    </div>
                );
            });
        }
        return (<div/>);
    }

    render() {
        console.log(this.props);
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return(
            <div id={'page-wrapper'}>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Respond to questionaire</h1>
                    </div>
                </div>

                <div className={'row'}>
                    <div className="col-md-6 col-md-offset-3">
                        <h2>Assign Questionaire</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && (user.questionaireTemplate === 'pick an questionaire template' || user.questionaireTemplate === '')
                                ? ' has-error' : '')}>
                                <label htmlFor="questionaireTemplate">Questionaire Template</label>
                                <select name="questionaireTemplate" className="form-control" value={user.questionaireTemplate} onChange={this.handleChange} onSelect={this.handleChange}>
                                    <option selected={'selected'} value={user.questionaireTemplate} key={user.questionaireTemplate}>{user.questionaireTemplate}</option>
                                </select>
                                {submitted && (user.questionaireTemplate === 'pick an questionaire template' || user.questionaireTemplate === '') &&
                                <div className="help-block">Questionaire is required</div>
                                }
                            </div>
                            {this.renderQuestions()}
                            <div className="form-group">
                                <button className="btn btn-primary">Assign</button>
                                {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <button onClick={this.handleCancel} className="btn btn-link">Cancel</button>
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
        reportAuthenticationProcessing
    }, dispatch);
}

export default withApollo(compose(
    graphql(
        RespondQuestionaire,
        {
            options: (props) =>({
                update: (proxy, mutationResult) => {
                    console.log('mutation assign ', mutationResult, props);
                    if(mutationResult.data.respondToQuestionaire._id) {
                        const addedQuestionaire = mutationResult.data.respondToQuestionaire;
                        console.log('here 1 ', addedQuestionaire);
                        const query = GetAllQuestionairesForEmployee;
                        console.log('here 2');
                        const data = proxy.readQuery({
                            query,
                            variables: {
                                username: addedQuestionaire.username
                            }
                        });
                        console.log('here 3');

                        data.questionaires = [...data.questionaires.filter(questionaire => questionaire._id !== addedQuestionaire._id), addedQuestionaire];

                        proxy.writeQuery({query, data});

                        // Create cache entry for QueryGetEvent
                        const query2 = GetAllQuestionairesForEmployee;
                        const variables = {
                            username: addedQuestionaire.username
                        };
                        const data2 = {questionaires: [...data.questionaires.filter(questionaire => questionaire._id !== addedQuestionaire._id), addedQuestionaire]};

                        proxy.writeQuery({query: query2, variables, data: data2});
                        console.log(addedQuestionaire, data);
                    }
                }
            }),
            props: (props) => ({
                respondToQuestionaire: (user) => {
                    return props.mutate({
                        variables: user,
                        optimisticResponse: () => ({
                            respondToQuestionaire: {
                                questionaireTemplateType: '', questions: {}, __typename: 'String'
                            }
                        }),
                    });
                }
            })
        }
    )
)(connect(mapStateToProps, mapDispatchToProps)(RespondQuestionaireContainer)));
