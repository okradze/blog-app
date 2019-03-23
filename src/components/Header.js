import React from 'react';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = (props) => (
    <header>
        <h1>Blog</h1>
        <button onClick={props.startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);