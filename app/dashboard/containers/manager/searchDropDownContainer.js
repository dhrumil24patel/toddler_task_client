import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetAllUsersWithDetails from '../../../graphql/queries/getAllUsersWithDetails';

import {} from '../../styles/searchDropDownStyles.scss';

import {reportDashboardContainerState} from '../../actions/index';

import ResponseListRow from './responseListRow';


class SearchDropDown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropDownOpen: false,
            selection: 'Choose username to assign',
            users: [],
            filtering: false
        };

        this.renderRows = this.renderRows.bind(this);
        this.handleDropDownButtonClick = this.handleDropDownButtonClick.bind(this);
        this.handleSelectButtonClick = this.handleSelectButtonClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps  ', nextProps);
        if(nextProps.users !== this.props.users || nextProps.users.length !== this.props.users.length) {
            this.setState({users: nextProps.users});
        }
    }

    handleDropDownButtonClick(e) {
        this.setState({dropDownOpen: !this.state.dropDownOpen});
    }

    handleSelectButtonClick(value, e) {
        console.log(e.target);
        console.log(e.target.name);
        console.log(value);
        this.setState({users: this.props.users, dropDownOpen: !this.state.dropDownOpen, selection: value});
        this.props.handleChange({target: {value: e.target.name, name: 'username'}});
    }

    handleKeyUp(e) {
        // console.log(e.target);
        // console.log(e.target.value);
        const filter = e.target.value.toUpperCase();
        this.setState({users: [...this.props.users.filter(user => user.username.toUpperCase().indexOf(filter) > -1)], filtering: true});
        // this.setState({dropDownOpen: !this.state.dropDownOpen});
    }

    renderRows() {
        if(this.state.users && this.state.filtering) {
            return this.state.users.map(item => {
                return (<a onClick={this.handleSelectButtonClick.bind(this, item.username)} name={item.username} key={item._id}>{item.username}</a>);
            });
        } else if(this.props.users && !this.state.filtering) {
            return this.props.users.map(item => {
                return (<a onClick={this.handleSelectButtonClick.bind(this, item.username)} name={item.username} key={item._id}>{item.username}</a>);
            });
        }
        return(null);
    }

    render() {
        // console.log(this.props);
        let dropdownClass;
        if(this.state.dropDownOpen) {
            dropdownClass = 'dropdown-content show';
        } else {
            dropdownClass = 'dropdown-content';
        }
        return(
            <div className={'dropdown'}>
                <div onClick={this.handleDropDownButtonClick} className="dropbtn">{this.state.selection}</div>
                <div id="myDropdown" className={dropdownClass}>
                    <input type="text" placeholder="Search.." id="myInput" onKeyUp={this.handleKeyUp}></input>
                    {this.renderRows()}
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
)(connect(mapStateToProps, mapDispatchToProps)(SearchDropDown)));
