import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";


export default class RegisterHandler extends React.Component {


    render () {
        return(
            <section className="UserSignIn">
                <div className="UserSignIn-content">
                    <h1>CMC</h1>
                    <h2>Child Minders Care</h2>
                </div>
                <div>
                    <Link to="/registeruser">User Registration</Link>
                    <Link to="/registerminder">Childminder Registration</Link>
                    Or
                    <Link to="/">Home</Link>
                </div>
            </section>
        )
    }
}