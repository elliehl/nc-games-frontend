import { useState } from "react"
import { useEffect } from "react"
import './Styles/Reviews.css'

const Reviews = () => {
    const [reviewsList, setReviewsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
// need to add error handling for if fetch returns nothing
    useEffect(() => {
        setIsLoading(true)
        fetch(
            'https://elliehl-board-games-project.herokuapp.com/api/reviews'
        ).then(res => res.json())
        .then(data => {
            setIsLoading(false)
            setReviewsList(data.reviews)  
        })
        }, [])
    
        return (
            (isLoading ? <h4>Loading...</h4> :
            <div>
                <ul>
                    {reviewsList.map(
                        ({
                            owner,
                            title,
                            review_id,
                            category,
                            review_img_url,
                            created_at,
                            votes,
                            designer,
                            comment_count
                        }) => {
                        return (
                            <li key={review_id} className='review-item'>
                                <div className="top-half">
                                <div className="top-left">
                                <img src={review_img_url} alt='The game being reviewed' width='250px' height='250px'/>
                                </div>
                                <div className="top-right">
                                <h3>{title}</h3>
                                Votes: {votes}
                                <br />
                                Comments({comment_count})
                                <br/>
                                </div>
                                </div>
                                <div className="bottom-half">
                                Reviewed by: {owner}
                                <br/>
                                Review Date: {new Date(created_at).toISOString().split('T')[0]}
                                </div>
                                {/* Category: {category} */}
                                {/* Designer: {designer} */}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
        )


            
        
}


export default Reviews