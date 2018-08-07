import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from '../components/App';
import AdminDashboard from '../../dashboard/containers/adminDashboard';
import PrivateRoute from '../components/PrivateRoute';
import {LoginPage} from '../../authentication/containers/LoginPage';
import {RegisterPage} from '../../authentication/containers/RegisterPage';
import {reportUserData} from '../../authentication/actions/index';

class Root extends  React.Component {

    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.history = this.props.history;

        if(localStorage.getItem('user')) {
            props.reportUserData(JSON.parse(localStorage.getItem('user')));
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <ConnectedRouter store={this.store} history={this.history}>
                        <div>
                            <PrivateRoute exact path="/" component={AdminDashboard} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                        </div>
                    </ConnectedRouter>
                </div>
            </Provider>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportUserData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
