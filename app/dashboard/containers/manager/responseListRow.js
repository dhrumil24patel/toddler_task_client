import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reportViewingQuestionaire, reportDashboardContainerState} from '../../../dashboard/actions/index';

class ResponseListRow extends Component {

    constructor(props) {
        super(props);
        this.handleView = this.handleView.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleView(e) {
        // console.log('view ', this.props.user);
        this.props.reportViewingQuestionaire(this.props.questionaire);
        this.props.reportDashboardContainerState('viewQuestionaire');
    }

    renderActions() {
        return (
            <td>
                <ui>
                    <li onClick={this.handleView} className={'fa fa-eye fa-fw'}/>
                </ui>
            </td>
        );
    }


    render() {
        console.log(this.props);
        return(
            <tr>
                <td>{this.props.questionaire.username}</td>
                <td>{this.props.questionaire.questionaireTemplateType}</td>
                <td>{this.props.questionaire.assignedAt}</td>
                {(this.props.questionaire.responded ? <td>{'Yes'}</td> : <td>{'No'}</td>)}
                {this.renderActions()}
            </tr>
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
        organization
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportViewingQuestionaire,
        reportDashboardContainerState
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseListRow);
