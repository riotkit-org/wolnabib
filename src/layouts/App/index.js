import React from "react";
import { BrowserRouter as Router, Route, } from "react-router-dom";

import AccountPage from "../Account";
import LogInPage from "../LogIn";
import MainPage from "../Main";
import PassForgetPage from "../PassForget";
import SignUpPage from "../SignUp";
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../../components/Session';
import Admin from "../Admin";


const App = () => (
        <Router>
            <div>
                <Route exact path={ROUTES.LOGIN} component={LogInPage}/>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                <Route path={ROUTES.MAIN} component={MainPage}/>
                <Route path={ROUTES.PASS_FORGET} component={PassForgetPage}/>
                <Route path={ROUTES.SIGNUP} component={SignUpPage}/>
                <Route path={ROUTES.ADMIN} component={Admin}/>
            </div>
        </Router>
    );


export default withAuthentication(App);

