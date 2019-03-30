import React from 'react';
import loader from '../images/loader.gif';

export const Loader = () => (
    <div className="flex justify-center items-center w-screen h-screen">
        <img className="h-16 w-16" src={loader} />
    </div>
);

export default Loader;