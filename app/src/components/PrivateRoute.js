import React from 'react';
import { Redirect, withRouter} from 'react-router-dom';
import App from '../components/App';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reportUserData} from '../../authentication/actions/index';
// import {bindActionCreators} from "redux/index";

class PrivateRoute extends  React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return(
            localStorage.getItem('user')
                ? <App {...this.props} />
                : <Redirect to={{ pathname: '/login' }} />
        );

        // return(
        //     <App {...this.props} />
        // );
    }
}

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// );


function mapStateToProps(state) {
    return ({});
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportUserData
    }, dispatch);
}


export default withRouter(connect(mapStateToProps)(PrivateRoute));
