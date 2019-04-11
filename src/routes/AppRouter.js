import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import loader from '../images/loader.gif';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const ReadBlogList = lazy(() => import('../components/ReadBlogList'));
const CreateBlogPage = lazy(() => import('../components/CreateBlogPage'));
const EditBlogPage = lazy(() => import('../components/EditBlogPage'));
const DashboardPage = lazy(() => import('../components/DashboardPage'));
const LoginPage = lazy(() => import('../components/LoginPage'));
const ReadBlogPage = lazy(() => import('../components/ReadBlogPage'));
const NotFoundPage = lazy(() => import('../components/NotFoundPage'));

export const history = createBrowserHistory();

const AppRouter = () => (
	<Suspense fallback={<img src={loader} className="center small-loader" alt="Loader" />}>
		<Router history={history}>
			<React.Fragment>
				<Switch>
					<PublicRoute path="/" component={LoginPage} exact={true} />
					<PrivateRoute path="/dashboard" component={DashboardPage} />
					<PrivateRoute path="/create" component={CreateBlogPage} />
					<PrivateRoute path="/edit/:id" component={EditBlogPage} />
					<PrivateRoute path="/read" component={ReadBlogList} exact={true} />
					<Route path="/read/:id" render={props => <ReadBlogPage {...props} />} />
					<NotFoundPage />
				</Switch>
			</React.Fragment>
		</Router>
	</Suspense>
);

export default AppRouter;
