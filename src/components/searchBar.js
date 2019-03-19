import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";


export default class SearchBar extends React.Component {


    render () {
        return(
            <section className="UserSignIn">
                <div className="UserSignIn-content">
                    <h1>CMC</h1>
                    <h2>Search Page</h2>
                </div>
                <div>
                    <Link to="/registeruser">User Registration</Link>
                    <Link to="/registerminder">Childminder Registration</Link>
                    Or
                    <button>Search</button>
                </div>
            </section>
        )
    }
}