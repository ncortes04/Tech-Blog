import React from 'react'
import "../styles/main.css"


const Main = ({posts}) => {
  function currentTime(date){
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(date).toLocaleDateString(undefined, options)
}
  return (
    <div className='main-container'>
      <div className='flex-container'>
      {posts.length && posts.map(post => {
              return(
                <div className="main-card">
                    <div className="profile-card-body">
                        <p className="profile-name"> {post.name}</p>
                        <div className="profile-card-bottom">
                            <p>{post.user.name}</p>
                            <p className="trending-card-date">-{currentTime(post.createdAt)}</p>
                            <a className="trending-view-btn" href={`/post?id=${post.id}`}>View Post</a>
                            </div>
                    </div>
                </div>)
              })
            }
      </div>
    </div>
  )
}

export default Main