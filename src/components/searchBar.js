import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";
import API from '../API'
import SearchCard from './searchCard'


export default class SearchBar extends React.Component {
    state = {
        searchTerm: "",
        results: null
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const user = this.state
        API.search(this.state.searchTerm).then(data => {
          if (data.error) {
            alert('Something went wrong X_x')
          } else {
            this.setState({results: data})
          }
        })
      }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    generateResults = (results) => {
        return results.map((cm,idx) => <SearchCard minder={cm} key={idx} /> )
    } 


    render () {
        return(
            <section className="">
                <div className="">
                    <h1>CMC</h1>
                    <h2>Search Page</h2>
                </div>
                <div>
                    <input type="text" name="searchTerm" placeholder="Enter your Search Here..." onChange={this.handleOnChange}/>
                    <button onClick={(event) => this.handleSubmit(event)}>Search</button>
                </div>
                <div className="result-holder">
                    {this.state.results ? this.generateResults(this.state.results) : "No results to show"}
                </div>
            </section>
        )
    }
}