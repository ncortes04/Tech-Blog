import React, { useState, useEffect } from "react";
import { viewProfile } from "../utils/API";
import '../styles/viewprofile.css'

function ViewProfile() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    const [userProfile, setUserProfile] = useState({})
    const [loading, setLoading] = useState(true)

    function currentTime(date){
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(date).toLocaleDateString(undefined, options)
    }

    const getUserProfile = async () => {
        setLoading(true)
        const response = await viewProfile(id);

        const item = await response.json();
        setUserProfile(item);
        setLoading(false)
    };
      useEffect(() => {
  
        getUserProfile();
      }, [id]);
  return (
    <div className='view-profile-container'>
        <div className='profile-name-container'>
          <h2 className='profile-name'>Viewing {userProfile.name}'s Profile</h2>
          <p className='profile-my-posts'>Their Posts</p>
          <div className='view-profile-list'>
          {userProfile.Posts 
            ? userProfile.Posts.map(post => {
              return(
                <div key={post.id} className="profile-card">
                    <div className="profile-card-body">
                        <p className="profile-name"> {post.name}</p>
                        <div className="profile-card-bottom">
                            <p>{userProfile.name}</p>
                            <p className="trending-card-date">-{currentTime(post.createdAt)}</p>
                            <a className="trending-view-btn" href={`/post?id=${post.id}`}>View Post</a>
                            </div>
                    </div>
                </div>)
              })
            :<p>loading...</p> }
          </div>
        </div>
    </div>
  )
}

export default ViewProfile