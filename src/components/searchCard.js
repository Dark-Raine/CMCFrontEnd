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
                    <h3>Availability</h3>
                    <p> {minder.daysopen} </p>
                    <h3> Opening time </h3>
                    <p> {minder.openingtime} - {minder.closingtime}</p>
                    <h3> Cost p/d </h3>
                    <p> £{minder.dayrate} </p>
                </div>

            </div>
        )
    }
}
