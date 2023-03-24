import React, {useState, useEffect} from 'react'
import { getIndividual, addComment, deleteComment } from "../utils/API"
import AuthService from '../utils/auth'
import '../styles/singlepost.css'
const Singleposts = ({trending, myself}) => {
    const [singleItem, setsingleItem] = useState({});
    const [comments, setComments] = useState([])
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    const [addCommentForm, setaddComment] = useState({description: ''});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setaddComment({ ...addCommentForm, [name]: value, id: id });
    };
    const [loading, setLoading] = useState(true)
    console.log(comments)
    useEffect(() => {
      const getItems = async () => {
          setLoading(true)
          const response = await getIndividual(id);
  
          const item = await response.json();
          setComments(item.comments)
          setsingleItem(item);
          setLoading(false)
      };
      getItems();
    }, [id]);
    function currentTime(date){
        const options = { year: "numeric", month: "long", day: "numeric", hour:"numeric", minute: 'numeric'}
        return new Date(date).toLocaleDateString(undefined, options)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

    try {
      
     const response = await addComment(addCommentForm);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      comments.push(await response.json())

       console.log(await response.json());
    } catch (err) {
      console.error(err);
    }
    setaddComment({
        description: '',
      });
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      setComments(comments.filter((comment) => comment.id !== commentId.id)); // update the comments state by removing the deleted comment
    } catch (err) {
      console.error(err);
    }
  };
  const handleProfileVisit = async (userId) => {

  }
  console.log(comments)
  return (
    <div className='individual-post-container'>
        {!loading
        ? <>
            <div className='individual-upper'>
                <div className='individual-card-container'> 
                    <div className='card-body'>
                        <div className='individual-card-header'>
                            <p className='card-user-name'>By: {singleItem.user.name}</p>
                            <button className='view-profile' href='profile/'>View Profile</button>
                        </div>
                        <p className='card-created-at'>{currentTime(singleItem.createdAt)}</p>
                        <h3 className='single-item-header'>{singleItem.name}</h3>
                        <p className='single-decription'>{singleItem.description}</p>
                        </div>
                    </div>
                    <div>
            <h2>Enjoy The Read?</h2>
            <p className='continue-reading'>Heres some more on most popular articles</p>
            <div className="trending-flex">
            {trending.length && trending.slice(0, 6).map((post, index) => {
                return(
                <div className="trending-card">
                     <p className="trending-rank">0{index + 1}</p>
                    <div className="trending-card-right">
                        <p className="trending-user-name">By {post.user.name}</p>
                        <p className="trending-name"> {post.name}</p>
                        <div className="trending-card-bottom">
                                <p className="trending-card-date">-{currentTime(post.createdAt)}</p>
                            <a className="trending-view-btn" href={`/post?id=${post.id}`}>View Post</a>
                        </div>
                    </div>
                </div>)
              })}
            </div>
        </div>
            </div>
            <div className='bottom-container'>
                    <h2>{comments.length}
                    {comments.length > 1 ? " Responses" : " Response"}</h2>
                    <div className='input-container'>
                        <input 
                        className='create-post-descrip'
                        name='description'
                        placeholder='Leave A Comment'
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = 'Leave A Comment'}
                        onClick={() => !AuthService.loggedIn() ? window.location.assign('/login') : null }
                        onChange={handleInputChange}
                        value={addCommentForm.description}
                        ></input>
                        {AuthService.loggedIn()
                        ?<button 
                        onClick={handleSubmit} 
                        className='comment-button'>Create
                        </button>
                        : <p>Must Sign In To Submit Comments</p>
                        }
                </div>
                    {comments.length ? comments.map(comment => {
                    return(<div className='comment-border'> 
                        <div className='comment-card-container'>
                            <div className='comment-body'>
                                <p className='comment-name'>{singleItem.user.name}</p>
                                <p className='comment-description'>{comment.description} <span>-{currentTime(comment.createdAt)}</span></p>
                            </div>
                            {myself === comment.user_id 
                            ? <button onClick={() => {handleDeleteComment({id: comment.id})}} class="noselect"><span class="text delete-post-btn">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                            :null
                        }
                        </div>
                    </div>)
                    })
                : null}
            </div>
        </> 
        :<div>Loading...</div>
    }
        
    </div>
  )
}

export default Singleposts