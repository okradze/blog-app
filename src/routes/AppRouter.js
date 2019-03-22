import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardPage from '../components/DashboardPage';
import CreateBlogPage from '../components/CreateBlogPage';
import EditBlogPage from '../components/EditBlogPage';
import ReadBlogPage from '../components/ReadBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path='/' component={LoginPage} exact={true} />
                <Route path='/dashboard' component={DashboardPage} />
                <Route path='/create' component={CreateBlogPage} />
                <Route path='/edit/:id' component={EditBlogPage} />
                <Route path='/read/:id' component={ReadBlogPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;