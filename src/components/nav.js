import React from 'react'
import { isAbsolute } from 'path';
import { withRouter } from "react-router-dom";


 class Nav extends React.Component {


    logout = () => {
        localStorage.removeItem('token')
        this.props.history.push('/')
    }

    search = () => {
        this.props.history.push('/app')
    }

    render () {
        return(
            <header className="main-app-header">
            <nav className="main-nav">
                    {/* <li className="nav-item">Profile</li> */}
                    {/* <li className="nav-item" onClick={this.search}>Search</li> */}
                    <li className="nav-item" onClick={this.logout}>Logout</li>
            </nav>

            </header>
        )
    }
}

export default withRouter(Nav)