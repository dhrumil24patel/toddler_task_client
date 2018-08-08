import React from 'react';
import { Redirect, withRouter} from 'react-router-dom';
import ManagerDashboardContainer from '../../dashboard/containers/manager/managerDashboardContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reportUserData} from '../../authentication/actions/index';
import {selectAuthenticatedUserData} from '../selectors/index';
// import {bindActionCreators} from "redux/index";

class PrivateRoute extends  React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        let userData;
        const userDataString = localStorage.getItem('user');
        if(userDataString) {
            userData = this.props.userData;
            // console.log('userData ', userData);
            // todo: return user dashboard in else
            return(
                userData.user.isAdmin
                    ? <ManagerDashboardContainer {...this.props} />
                    : <Redirect to={{ pathname: '/login' }} />
            );
        }
        return(<Redirect to={{ pathname: '/login' }} />);

        // return(
        //     localStorage.getItem('user')
        //         ? <AdminDashboard {...this.props} />
        //         : <Redirect to={{ pathname: '/login' }} />
        // );

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
    return ({
        userData: selectAuthenticatedUserData(state)
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        reportUserData
    }, dispatch);
}


export default withRouter(connect(mapStateToProps)(PrivateRoute));
