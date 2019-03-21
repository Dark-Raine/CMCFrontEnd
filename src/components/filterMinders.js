import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";
import API from '../API'
import SearchCard from './searchCard'
import ProfilePage from './profilepage'


export default class FilterMinders extends React.Component {
    state = {
        results: null,
        showing: null
    }



    goBack = () => {
        this.setState({showing: null})
    }
    
    selectToShow = (id) => {
        const toShow = this.state.results.find(minder => minder.data.id === id)
        // debugger
        this.setState({showing: toShow.data.id })
    }
    
    referenceToMinder = (refID= this.state.showing,minders = this.state.results) => 
    minders.find(minder => minder.data.id === refID)
    
    updateMinders = () => {
        fetch('http://localhost:3000/childminders')
        .then(resp => resp.json())
        .then(data => this.setState({results: data}))
    }
    
    generateResults = (results) => {
        return results.map((cm) => <SearchCard minder={cm} key={cm.id} toShow={this.selectToShow}/> )
    }
    
    componentDidMount(){
       this.updateMinders()
    }

    render () {
        return(
            <section className="container">
                
                    {this.state.results ? 
                        this.state.showing ? 
                            <ProfilePage minder={this.referenceToMinder()} updateState={this.updateMinders} returnToResults={this.goBack} currentUser={this.props.currentUser}/>:<div className="result-holder">{this.generateResults(this.state.results)}</div> 
                        
                        : null}
                {/* <div className="">
                    <h1>CMC</h1>
                    <h2>Search Page</h2>
                </div>
                <div>
                    <input type="text" name="searchTerm" placeholder="Enter your Search Here..." onChange={this.handleOnChange}/>
                    <button onClick={(event) => this.handleSubmit(event)}>Search</button>
                </div> */}
            </section>
        )
    }
}