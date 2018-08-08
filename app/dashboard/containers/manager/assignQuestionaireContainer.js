import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssignQuestionaire from '../../../graphql/mutations/assignQuestionaire';

import DepartmentsListComponent from '../../../authentication/components/departmentsListComponent';

import SearchDropDownContainer from './searchDropDownContainer';

import {reportDashboardContainerState} from '../../../dashboard/actions/index';
import {reportAuthenticationProcessing} from '../../../authentication/actions/index';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';
import GetAllQuestionaireForManager from '../../../graphql/queries/getAllQuestionairesForManager';
import GetAllOrganizations from '../../../graphql/queries/getAllOrganizations';
import GetAllQuestionaireTemplateName from '../../../graphql/queries/getAllQuestionaireTemplateNames';

class AssignQuestionaireContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                organization: props.organization,
                department: '',
                questionaireTemplate: '',
                admin: false,
                assignedBy: props.authentication.userData.user.username
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleCancel(event) {
        this.props.reportDashboardContainerState('responseList');
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.questionaireTemplate) {
            this.props.reportAuthenticationProcessing(true);
            this.props.assignQuestionaire(user)
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

    renderOrganizations() {
        console.log('assignQuestionaire ', this.props, this.state);
        const {organizations} = this.props;
        const user = this.state.user;
        if(organizations.length === 1 || user.organization === '') {
            // user.organization = organizations[0].name;
            // this.setState({user: user});
        }
        return [{_id: 'default', name: 'pick an organization'}, ...organizations].map(item=>{
            if(item._id === 'default') {
                return (<option selected={'selected'} disabled={'disabled'} value={item.name} key={item._id}>{item.name}</option>);
            }
            if(item.name === this.props.organization) {
                return (<option value={item.name} key={item._id}>{item.name}</option>);
            }
            return (<option disabled={'disabled'} value={item.name} key={item._id}>{item.name}</option>);
        });
    }

    renderQuestionaireTemplates() {
        console.log('assignQuestionaire  tem ', this.props, this.state);
        const {questionaireTemplates} = this.props;
        const user = this.state.user;
        if(questionaireTemplates.length === 1 || user.organization === '') {
            // user.organization = questionaireTemplates[0].name;
            // this.setState({user: user});
        }
        return [{_id: 'default', type: 'pick an questionaire template'}, ...questionaireTemplates].map(item=>{
            if(item._id === 'default') {
                return (<option selected={'selected'} disabled={'disabled'} value={item.type} key={item._id}>{item.type}</option>);
            }
            if(item.name === this.props.organization) {
                return (<option value={item.name} key={item._id}>{item.name}</option>);
            }
            return (<option value={item.type} key={item._id}>{item.type}</option>);
        });
    }


    render() {
        console.log(this.props);
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div id={'page-wrapper'}>
                <div className={'row'}>
                    <div className="col-md-6 col-md-offset-3">
                        <h2>Assign Questionaire</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <SearchDropDownContainer handleChange={this.handleChange} user={user} organization={this.props.organization}/>
                            <div className={'form-group' + (submitted && (user.questionaireTemplate === 'pick an questionaire template' || user.questionaireTemplate === '')
                                ? ' has-error' : '')}>
                                <label htmlFor="questionaireTemplate">Questionaire Template</label>
                                <select name="questionaireTemplate" className="form-control" value={user.questionaireTemplate} onChange={this.handleChange} onSelect={this.handleChange}>
                                    {this.renderQuestionaireTemplates()}
                                </select>
                                {submitted && (user.questionaireTemplate === 'pick an questionaire template' || user.questionaireTemplate === '') &&
                                <div className="help-block">Questionaire is required</div>
                                }
                            </div>
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
    return ({
        authentication: state.authentication,
        organization: state.authentication.userData.user.organization
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
        GetAllQuestionaireTemplateName,
        {
            options: (props) => ({
                fetchPolicy: 'cache-first'
                // refetchQueries: [{
                //     query: SomeOtherQuery,
                //     context: { version: 1 },    // <-- need this to split the link correctly but refetchQueries only accepts `query` and `variables`.  Also context might be different than the mutate query.
                //     variables: {/*...*/ }
                // }]
            }),
            props: ({ data: { questionaireTemplates =  [], loading } }) => ({
                questionaireTemplates: questionaireTemplates,
                loading
            })
        }
    ),
    graphql(
        GetAllOrganizations,
        {
            options: {
                fetchPolicy: 'cache-first'
            },
            props: ({ data: { organizations =  [], loading } }) => ({
                organizations: organizations,
                loading
            })
        }
    ), graphql(
        AssignQuestionaire,
        {
            options: {
                update: (proxy, mutationResult) => {
                    console.log('mutation assign ', mutationResult);
                    if(mutationResult.data.assignQuestionaire._id) {
                        const addedQuestionaire = mutationResult.data.assignQuestionaire;
                        console.log('here 1 ', addedQuestionaire);
                        const query = GetAllQuestionaireForManager;
                        console.log('here 2');
                        const data = proxy.readQuery({
                            query,
                            variables: {
                                assignedBy: addedQuestionaire.assignedBy
                            }
                        });
                        console.log('here 3');

                        data.questionaires = [...data.questionaires.filter(questionaire => questionaire._id !== addedQuestionaire._id), addedQuestionaire];

                        proxy.writeQuery({query, data});

                        // Create cache entry for QueryGetEvent
                        const query2 = GetAllQuestionaireForManager;
                        const variables = {
                            assignedBy: addedQuestionaire.assignedBy
                        };
                        const data2 = {questionaires: [...data.questionaires.filter(user => user._id !== addedQuestionaire._id), addedQuestionaire]};

                        proxy.writeQuery({query: query2, variables, data: data2});
                        console.log(addedQuestionaire, data);
                    }
                }
            },
            props: (props) => ({
                assignQuestionaire: (user) => {
                    return props.mutate({
                        variables: user,
                        optimisticResponse: () => ({
                            assignQuestionaire: {
                                questionaireTemplateType: '', questions: {}, __typename: 'Questionaire'
                            }
                        }),
                    });
                }
            })
        }
    )
)(connect(mapStateToProps, mapDispatchToProps)(AssignQuestionaireContainer)));
