import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";



export default class SearchCard extends React.Component {


    handleSubmit = (event) => {
        event.preventDefault()

      }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

 


    render () {
        const minder = this.props.minder.data
        return(
            <div className="result-card" onClick={() => this.props.toShow(minder.id)}>
                <div className="result-card-header">
                    <h1>{minder.name}</h1>
                </div>
                <div className="result-card-body">
                    <p> Open from: {minder.openingtime} </p>
                    <p> Open till: {minder.closingtime} </p>
                    <p> Days open: {minder.daysopen} </p>
                    <p> Cost per day: £{minder.dayrate} </p>
                </div>

            </div>
        )
    }
}

{/* <Childminder id: nil, name: nil, 
number: nil, 
email: nil, 
address: nil, 
bio: nil, 
dayrate: nil, 
openingtime: nil, 
closingtime: nil, 
daysopen: nil, 
created_at: nil, 
updated_at: nil, username: nil, password_digest: nil></div> */}