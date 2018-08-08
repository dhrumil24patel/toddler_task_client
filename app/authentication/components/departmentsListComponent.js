import React, { Component } from 'react';

import { Query, graphql, compose, withApollo } from 'react-apollo';
import GetAllDepartments from '../../graphql/queries/getAllDepartments';

class DepartmentsListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organization: props.organization
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.organization);
        // console.log(this.props.organization);
        this.setState({organization: nextProps.organization});
    }

    renderOrganizations() {
        // console.log('register ', this.props, this.state);
        const {departments} = this.props;
        return [{_id: 'default', name: 'pick a department'}, ...departments].map(item=>{
            if(item._id === 'default') {
                return (<option selected={'selected'} disabled={'disabled'} value={item.name} key={item._id}>{item.name}</option>);
            }
            return (<option value={item.name} key={item._id}>{item.name}</option>);
        });
    }

    temp() {
        return(
            <Query query={GetAllDepartments} variables={this.props}>
                {({ loading, error, data }) => {
                    if(loading) return(<div>Loading...</div>);
                    console.log(data);
                    console.log(error);
                    console.log(loading);
                    return (
                        <select name="department" className="form-control" value={this.props.user.department} onChange={this.props.handleChange} onSelect={this.handleChange}>
                            {data.departments.map(item => (
                                <option key={item._id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    );
                }}
            </Query>
        );
    }

    render() {
        // console.log(this.props);
        // onCompleted={} onError={} pollInterval={}
        return(
                <div className={'form-group' + (this.props.submitted && !this.props.user.password ? ' has-error' : '')}>
                    <label htmlFor="department">Department</label>
                    <select name="department" className="form-control" value={this.props.user.department} onChange={this.props.handleChange} onSelect={this.handleChange}>
                        {this.renderOrganizations()}
                    </select>
                    {this.props.submitted && !this.props.user.department &&
                    <div className="help-block">Department is required</div>
                    }
                </div>
        );
    }
}

// const App = () =>
//     <div>
//         <h1>Filter table</h1>
//         { Routes }
//         <footer className={footer}>
//             <Link to="/">Filterable Table</Link>
//             <Link to="/about">About</Link>
//             <Link to="/login">Login</Link>
//         </footer>
//     </div>;

export default withApollo(compose(
    graphql(
        GetAllDepartments,
        {
            options: (props) => ({
                variables: { organization: props.organization }
            }),
            props: ({ data: { departments =  [], loading } }) => ({
                departments: departments,
                loading
            })
        }
    )
)(DepartmentsListComponent));
