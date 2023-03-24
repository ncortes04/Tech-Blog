import React from 'react'
import "../styles/main.css"


const Main = ({name, posts}) => {
  return (
    <div className='main-container'>
      {name && <h2 className='welcome-name'> Welcome {name}</h2>}
      <div className='flex-container'>
      {posts.length && posts.map(post => {
                return (<div className='card-container'> 
                    <div className='card-left'>
                        <h3>{post.name}</h3>
                        <p>{post.user.name}</p>
                    </div>
                    <div className='card-right'>
                        <a href={`/post?id=${post.id}`}>View Post</a>
                    </div>
                </div>)
            })}
      </div>
    </div>
  )
}

export default Main