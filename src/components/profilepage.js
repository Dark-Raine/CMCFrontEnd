import React from 'react'
import { isAbsolute } from 'path';
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings'




export default class ProfilePage extends React.Component {

    state = {
        createClicked: false,
        review: null,
        toEdit: null,
        toDelete: null,
        rating: 0
    }

    handleSubmit = (event) => {
        event.preventDefault()

      }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    toggleReviewBox = () => {
        this.setState({createClicked: !this.state.createClicked})
    }

    toggleEditBox = () => {
        this.setState({toEdit: null})
    }

    submitReview = () => {
        fetch('http://localhost:3000/reviews',{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({content: this.state.review, id: this.props.minder.data.id, rating: this.state.rating})
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

    submitEditedReview = (id = this.state.toEdit, content = this.state.review) => {
        fetch(`http://localhost:3000/reviews/${id}`,{
            method: 'PATCH',
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({content, id})
        }).then(resp => resp.json())
        .then(response => {
            if (response.message) {
                this.props.updateState()
                this.toggleEditBox()
            } else {
                alert('Something went wrong X_x')
            }
        })

    }

    editReview = (id,content) => 
        this.setState({toEdit: id, review: content})

    deleteReview = (id) => {
        fetch(`http://localhost:3000/reviews/${id}`,{
            method: 'DELETE',
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(resp => resp.json())
        .then(response => {
            if (response.message) {
                this.props.updateState()
            } else {
                alert('Something went wrong X_x')
            }
        })
    }

    changeRating = (newRating) => {
        this.setState({
          rating: newRating
        });
      }

      likeReview = (reviewID) => {
        fetch(`http://localhost:3000/likes/`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({review_id: reviewID})
        }).then(resp => resp.json())
        .then(response => {
            if (response.message) {
                this.props.updateState()
            } else {
                alert('Something went wrong X_x')
            }
        })
      }

      dislikeReview = (reviewID) => {
        const like = this.props.minder.data.reviews
            .find(review => review.id === reviewID)
            .likedby.find(like => like.username === this.props.currentUser)
        fetch(`http://localhost:3000/likes/${like.id}`,{
            method: 'DELETE',
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(resp => resp.json())
        .then(response => {
            if (response.message) {
                this.props.updateState()
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
                {
                    !(this.state.toEdit === review.id) ?
                        <div>
                            <p>{review.reviewer}</p>
                            <p>{review.content}</p>
                            <StarRatings
                            rating={review.rating}
                            starRatedColor="green"
                            numberOfStars={5}
                            starDimension="15px"
                            name='rating'
                            />
                            <div className="review-like-container">
                            {
                                !review.likedby.find(liker => liker.username === currentUsr) 
                                ?
                                <div className="like-review" onClick={() => this.likeReview(review.id)} > ^ </div>
                                :
                                <div className="like-review" onClick={() => this.dislikeReview(review.id)} > ^ </div>
                            }
                                <p>{review.likedby.length}</p>
                            </div>
                        </div>
                    :
                        <div className="profilePage-review-add">
                            <textarea name="review" value={this.state.review} placeholder="Write your review here..." onChange={(event) => this.handleOnChange(event)}/>
                            <button onClick={() => this.submitEditedReview()}>Submit</button>
                        </div>
                }
                    <div>
                    {review.username === currentUsr ?
                        
                        <div>
                            <button onClick={() => this.editReview(review.id, review.content)}>Edit</button>
                            <button onClick={() => this.deleteReview(review.id)}>delete</button>
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
                    <StarRatings
                            rating={minder.averagerating}
                            starRatedColor="green"
                            numberOfStars={5}
                            starDimension="20px"
                            name='rating'
                        />
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
                {!!this.state.createClicked ? 
                    <div className="profilePage-review-add">
                        <textarea name="review" placeholder="Write your review here..." onChange={(event) => this.handleOnChange(event)}/>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="green"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            starDimension="20px"
                            name='rating'
                        />
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