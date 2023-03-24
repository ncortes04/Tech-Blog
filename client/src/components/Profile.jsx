import React, {useState} from 'react'
import '../styles/profile.css'
import { createPost,deletePost } from '../utils/API'
const Profile = ({myself}) => {
  console.log(myself)
  const [addPostForm, setAddPostForm] = useState({ name: '', description: ''});
  const [selectedCategory, setselectedCategory] = useState(null)
  function currentTime(date){
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(date).toLocaleDateString(undefined, options)
}
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setAddPostForm({ ...addPostForm, [name]: value });
    };
    const handleSubmit = async (event) => {
      event.preventDefault()

    try {

    const response = await createPost(addPostForm);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }

    console.log(await response.json());
    } catch (err) {
    console.error(err);
    }
    setAddPostForm({
      name: '',
      description: '',
    });
    setselectedCategory(null)
    };

  return (
    <div className='profile-container'>
      <div className='profile-left'>
        <div className='profile-name-container'>
          <h2 className='profile-name'>Welcome {myself.name}</h2>
          <p className='profile-my-posts'>My Posts</p>
          <div className='posts-list-container'>
          {myself.Posts 
            ? myself.Posts.map(post => {
              return(
                <div className="profile-card">
                    <div className="profile-card-body">
                        <p className="profile-name"> {post.name}</p>
                        <div className="profile-card-bottom">
                            <p>{myself.name}</p>
                            <p className="trending-card-date">-{currentTime(post.createdAt)}</p>
                            <a className="trending-view-btn" href={`/post?id=${post.id}`}>View Post</a>
                            <button  onClick={() => {deletePost({id: post.id})}} class="noselect"><span class="text delete-post-btn">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                            </div>
                    </div>
                </div>)
              })
            :<p>loading...</p> }
          </div>
        </div>
      </div>
      <div className='profile-right'>
      <h2>Create A Post</h2>
        <form className='create-post-container'>
            <div className='input-div'>
                <div className='input-parent-div'>
                    <label>TITLE</label>
                    <input  
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={addPostForm.name}
                    />
                </div>
                <div className='input-parent-div'>
                    <label>DESCRIPTION</label>
                    <textarea 
                    className='create-post-descrip'
                    name='description'
                    onChange={handleInputChange}
                    value={addPostForm.description}
                    ></textarea>
                </div>
                <button onClick={handleSubmit} className='submit-btn'>Create</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Profile