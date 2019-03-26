import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";
import API from '../API'

export default class UserSignIn extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const user = this.state
        API.signin(user, 'users').then(data => {
          if (data.error) {
            alert('Incorrect Login details')
          } else {
            // this.props.signin(data)
            localStorage.setItem("token", data.token);
            // console.log(data)
            this.props.history.push("/app")
            // alert('Success!')
          }
        })
      }

    render () {
        return(
            <section className="UserSignIn">
                <div className="UserSignIn-content">

                </div>
                <form className="UserSignIn-content UserSignIn-form">
                    <input type="text" name="username" placeholder="username" className="input-style" onChange={this.handleOnChange}/>
                    <input type="password" name="password" placeholder="password" className="input-style" onChange={this.handleOnChange}/>
                    <button type="submit" onClick={(event) => this.handleSubmit(event)}>Log in</button>
                </form>
            </section>
        )
    }
}