import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";



export default class ProfilePage extends React.Component {

    state = {
        clicked: false,
        review: null
    }

    handleSubmit = (event) => {
        event.preventDefault()

      }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    toggleReviewBox = () => {
        this.setState({clicked: !this.state.clicked})
    }

    submitReview = () => {
        fetch('http://localhost:3000/reviews',{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({content: this.state.review, id: this.props.minder.data.id})
        }).then(resp => resp.json())
        .then(response => {
            if (response.message) {
                this.props.updateState()
                this.toggleReviewBox()
            } else {
                alert('Something went wrong X_x')
            }
        })

    }


 


    render () {
        const minder = this.props.minder.data
        const currentUsr = this.props.currentUser

        const generateReviews = (reviews) => {
            return reviews.map(review => 
                <div className="profilePage-review">
                    <p>{review.reviewer}</p>
                    <p>{review.content}</p>
                    <div>
                    {review.username === currentUsr ?
                        
                        <div>
                            <button>Edit</button>
                            <button>delete</button>
                        </div>
                    :
                        null
                    }
                    </div>
                </div>
                )
        }
        return(
            <div className="profilePage">
            <div className="profilePage-pic">
                <img src="" alt="profile picture"/>
            </div>
                <div className="profilePage-title">
                    <h1>{minder.name}</h1>
                </div>
                <div className="profilePage-block">
                    <div className="profilePage-block-section">
                        <h3>About Me</h3>
                        <p> {minder.bio} </p>
                    </div>
                    <div className="profilepage-block-container">
                        <div className="profilePage-block-section">
                            <h3>Phone Number</h3>
                            <p> {minder.number} </p>
                        </div>
                        <div className="profilePage-block-section">
                            <h3>Email</h3>
                            <p> {minder.email} </p>
                        </div>
                        <div className="profilePage-block-section">
                            <h3>Address</h3>
                            <p> {minder.address} </p>
                        </div>
                        <div className="profilePage-block-section">
                            <h3>Open from</h3>
                            <p> {minder.openingtime} </p>
                        </div>
                        <div className="profilePage-block-section">
                            <h3>Open till</h3>
                            <p> {minder.closingtime} </p>
                        </div>
                        <div className="profilePage-block-section">
                            <h3>Days Open</h3>
                            <p> {minder.daysopen} </p>
                        </div>
                        <div className="profilePage-block-section">
                            <h3>Rate per day</h3>
                            <p> £{minder.dayrate} </p>
                        </div>
                    </div>
                </div>
                <div className="profilePage-reviews">
                    <h2>Reviews</h2>
                    {generateReviews(minder.reviews)}
                </div>
                {!!this.state.clicked ? 
                    <div className="profilePage-review-add">
                        <textarea name="review" placeholder="Write your review here..." onChange={(event) => this.handleOnChange(event)}/>
                        <button onClick={() => this.submitReview()}>Submit</button>
                    </div>
                    :
                    <button onClick={() => this.toggleReviewBox()}>Add Review</button>
                }
                <div className="profilePage-container">
                    <button onClick={() => this.props.returnToResults()} className="profilePage-container-backBtn">
                        Back to all childminders
                    </button>
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