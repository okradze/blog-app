import React from 'react';
import { startLogout, startLogin } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = (props) => (
    <header className="flex fixed shadow w-screen bg-white z-10 header box-content">
        {
            props.photoURL ? (
                <div className="flex items-center container mx-auto header__content">
                    <nav className="w-2/5 flex items-center self-stretch">
                        <Link className="top-nav-item" to="/dashboard">Dashboard</Link>
                        <Link className="top-nav-item" to="/create">Create</Link>
                        <Link className="top-nav-item" to="/read">Blogs</Link>
                    </nav>
                    <div className="w-1/5 text-center">
                        <Link className="text-teal" to='/dashboard'><h1 className="header__branding">Blog App</h1></Link>
                    </div>
                    <div className="w-2/5 flex items-center justify-end">
                        <img className="rounded-full w-auto h-10 cursor-pointer" src={props.photoURL} />
                        <button onClick={props.startLogout} className="button ml-6">Log Out</button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center container mx-auto header__content justify-between px-8">
                    <Link className="text-teal" to='/'><h1 className="header__branding">Blog App</h1></Link>
                    <button className="button" onClick={props.startLogin}>Log In</button>
                </div>
            )
        }
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin())
});
const mapStateToProps = (state) => ({
    photoURL: state.auth.photoURL
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);