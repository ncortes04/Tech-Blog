
const submitBtn = document.getElementById('submitBtn')

const submitNewForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();
  
    if ( name && description ) {
      const response = await fetch(`/users/post`, {
        method: 'POST',
        body: JSON.stringify({ name, description}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create Post');
      }
    }
  };
  const updatePost = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();
  
    if ( name && description ) {
      const response = await fetch(`/posts`, {
        method: 'POST',
        body: JSON.stringify({ name, description}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create Post');
      }
    }
  };
  const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  submitBtn.addEventListener('click', submitNewForm);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', deleteButtonHandler);
  
