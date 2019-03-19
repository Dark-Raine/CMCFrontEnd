import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";


export default class UserSignIn extends React.Component {


    render () {
        return(
            <section className="UserSignIn">
                <div className="UserSignIn-content">
                    <h1>CMC</h1>
                    <h2>Child Minders Care</h2>
                </div>
                <div>
                    <Link to="/usersignin">User Login</Link>
                    <Link to="/mindersignin">Childminder Login</Link>
                    Or
                    <Link to="/register">Register</Link>
                </div>
            </section>
        )
    }
}