import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";


export default class Nav extends React.Component {


    render () {
        return(
            <header className="main-app-header">
            <nav className="main-nav">
                    <li>Profile</li>
                    <li>Search</li>
                    <li>Logout</li>
            </nav>

            </header>
        )
    }
}