import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return <div >
        <ul className="flex-container nav">
            <Link to="/register" style={{ textDecoration: 'none' }} ><li>Sign up</li></Link>
            <Link to="/login" style={{ textDecoration: 'none' }}><li>Login</li></Link>
        </ul>
    </div>
}

export default Navbar;