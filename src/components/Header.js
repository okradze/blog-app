import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout, startLogin } from '../actions/auth';
import hamburger from '../images/hamburger.svg';

export const Header = ({ photoURL, uid, startLogin, startLogout }) => (
	<header className="header">
		<div className="container header__content">
			<div className="mobile-toggle">
				<label htmlFor="nav-toggle" className="mobile-toggle__label">
					<img className="mobile-toggle__hamburger" src={hamburger} alt="Hamburger logo for mobile devices" />
				</label>
				<input type="checkbox" className="mobile-toggle__checkbox" id="nav-toggle" />
				<nav className="mobile-nav">
					{uid ? (
						<React.Fragment>
							<Link className="mobile-nav__link" to="/dashboard">
								Dashboard
							</Link>
							<Link className="mobile-nav__link" to="/create">
								Create
							</Link>
							<Link className="mobile-nav__link" to="/read">
								Blogs
							</Link>
							<button type="button" onClick={startLogout} className="button">
								Log Out
							</button>
						</React.Fragment>
					) : (
						<button type="button" onClick={startLogin} className="button">
							Log In
						</button>
					)}
				</nav>
			</div>
			<div className="desktop-toggle">
				{uid && (
					<nav className="nav">
						<Link className="nav__link" to="/dashboard">
							Dashboard
						</Link>
						<Link className="nav__link" to="/create">
							Create
						</Link>
						<Link className="nav__link" to="/read">
							Blogs
						</Link>
					</nav>
				)}
				<div className="header__logo">
					<Link className="header__logo-text" to="/dashboard">
						<h1>Blog App</h1>
					</Link>
				</div>
				<div className="header__user">
					{uid ? (
						<React.Fragment>
							<img className="header__img" src={photoURL} alt="User" />
							<button type="button" onClick={startLogout} className="button">
								Log Out
							</button>
						</React.Fragment>
					) : (
						<button type="button" className="button" onClick={startLogin}>
							Log In
						</button>
					)}
				</div>
			</div>
		</div>
	</header>
);

const mapDispatchToProps = dispatch => ({
	startLogout: () => dispatch(startLogout()),
	startLogin: () => dispatch(startLogin()),
});
const mapStateToProps = state => ({
	photoURL: state.auth.photoURL,
	uid: state.auth.uid,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
