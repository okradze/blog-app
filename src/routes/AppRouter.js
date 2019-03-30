import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardPage from '../components/DashboardPage';
import CreateBlogPage from '../components/CreateBlogPage';
import EditBlogPage from '../components/EditBlogPage';
import ReadBlogPage from '../components/ReadBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import ReadBlogList from '../components/ReadBlogList';
import LoginPage from '../components/LoginPage';
import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path='/' component={LoginPage} exact={true} />
                <PrivateRoute path='/dashboard' component={DashboardPage} />
                <PrivateRoute path='/create' component={CreateBlogPage} />
                <PrivateRoute path='/edit/:id' component={EditBlogPage} />
                <PrivateRoute path='/read' component={ReadBlogList} exact={true} />
                <Route path='/read/:id' component={ReadBlogPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;