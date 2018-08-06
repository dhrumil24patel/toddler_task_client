import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from '../components/App';
import {PrivateRoute} from '../components/PrivateRoute';
import {LoginPage} from '../../authentication/containers/LoginPage';
import {RegisterPage} from '../../authentication/containers/RegisterPage';

class Root extends  React.Component {

    constructor(props) {
        super(props);
        const prop = this.props;
        this.store = prop.store;
        this.history = prop.history;
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <ConnectedRouter history={this.history}>
                        <div>
                            <PrivateRoute exact path="/" component={App} />
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
