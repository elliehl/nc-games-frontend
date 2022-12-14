import { useState } from "react"
import { useEffect } from "react"
import { getAllReviews } from "./api"
import { useParams } from "react-router-dom"
import './Styles/Reviews.css'
import {Link} from 'react-router-dom'

const Reviews = () => {
    const [reviewsList, setReviewsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const {category} = useParams()

    useEffect(() => {
        setIsLoading(true)
        getAllReviews(category)
        .then(reviews => {
            setIsLoading(false)
            setReviewsList(reviews)  
        }).catch((err) => {
            setIsLoading(false)
            setError(err)
        })
        }, [category])

        if (isLoading) {
            return <h4>Loading...</h4>
        }

        if (error !== null) {
            return <h4>Error: Please go back</h4>
        }
    
        return (
            <div>
                <ul>
                    {reviewsList.map(
                        ({
                            owner,
                            title,
                            review_id,
                            review_img_url,
                            created_at,
                            votes,
                            comment_count
                        }) => {
                        return (
                            <Link to={`/reviews/${review_id}`} key={review_id} >
                            <li key={review_id} className='review-item'>
                                <div className="top-half">
                                <div className="top-left">
                                <img src={review_img_url} alt='The game being reviewed' width='250px' height='250px'/>
                                </div>
                                <div className="top-right">
                                <h3>{title}</h3>
                                <br/>
                                Votes: {votes}
                                <br/>
                                Comments({comment_count})
                                <br/>
                                </div>
                                </div>
                                <div className="bottom-half">
                                Reviewed by: {owner}
                                <br/>
                                Review Date: {new Date(created_at).toISOString().split('T')[0]}
                                </div>
                            </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )


            
        
}

export default Reviews