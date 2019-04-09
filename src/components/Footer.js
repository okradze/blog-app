import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
	<footer className="footer">
		<div className="container footer__content">
			<nav className="footer__nav">
				<Link className="footer__link" to="/dashboard">
					Dashboard
				</Link>
				<Link className="footer__link" to="/create">
					Create
				</Link>
				<Link className="footer__link" to="/read">
					Blogs
				</Link>
			</nav>
			<p className="footer__copy">Copyright &copy; 2019 Mirian Okradze</p>
		</div>
	</footer>
);

export default Footer;
