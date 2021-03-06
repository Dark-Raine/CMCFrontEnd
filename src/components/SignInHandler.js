import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";
import API from '../API'

export default class UserSignIn extends React.Component {

    componentDidMount(){
        API.validate("users").then(data => {
          if (data.error) {
            this.props.history.push("/")
        } else {
            localStorage.setItem('token', data.token)
            this.props.history.push("/app")
          }
        })
      }

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