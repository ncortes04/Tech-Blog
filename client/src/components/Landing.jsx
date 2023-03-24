import React from "react";
import '../styles/landing.css'
function Landing({trending}) {
    function currentTime(date){
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(date).toLocaleDateString(undefined, options)
    }
    console.log(trending)
    return(
        <>
            <header className='header-container'>
            <div className='header-flex-split'>
                <div className='header-flex-left'>
                    <div className='header-title-div'>
                        <h2>Every Developer needs a resource</h2>
                        <p className='header-description'>Welcome to the cortes tech blog. This blog is filled with a community of coders.
                        We provide a free service in which people can ask question and interact with theri fellow coding community</p>
                    </div>
                </div>
                <div className='header-flex-right'>
                    <img className='coding-png' alt='coding person sitting at the table just coding'/>
                </div>
            </div>
        </header>
        <div className='trending'>
            <h2>Trending on Trendy</h2>
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
        </>
    )
}

export default Landing