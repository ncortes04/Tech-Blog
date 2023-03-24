import authService from './auth'

export const register = async (formData) => {
    return await fetch(`/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
      };
      
 export const login = async (formData) => {
        return await fetch(`/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  };
  export const getSingle = async () => {
    return fetch(`/users/me`, {
     method: 'GET',
     headers: { 'Content-Type': 'application/json',
     authorization: `Bearer ${authService.getToken()}`,
   },
 });
}
export const getPostData = async () => {
  return await fetch(`/posts/getposts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
});
}
export const getIndividual = async (id) => {
  return await fetch(`/posts/post${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
});
}
export const deletePost = async (id) => {
  return await fetch(`/users/deletepost`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    authorization: `Bearer ${authService.getToken()}`},
    body: JSON.stringify(id)
  });
}
 export const createPost = async (postData) => {
        return await fetch(`/users/createpost`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          authorization: `Bearer ${authService.getToken()}`},
          body: JSON.stringify(postData)
      });
    };
export const addComment = async (formData) => {
      return await fetch(`/users/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        authorization: `Bearer ${authService.getToken()}`},
        body: JSON.stringify(formData)
    });
  };
  export const deleteComment = async (id) => {
    return await fetch(`/users/comment`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
      authorization: `Bearer ${authService.getToken()}`},
      body: JSON.stringify(id)
  });
};
// export const getSingle = async () => {
//          return fetch(`/api/me`, {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json',
//           authorization: `Bearer ${authService.getToken()}`,
//         },
//       });
//   }
//   export const getRole = async () => {
//           return fetch(`/api/getrole`, {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json',
//           authorization: `Bearer ${authService.getToken()}`,
//         },
//       });
//   }


// export const getPostData = async () => {
//   return await fetch(`/api/getposts`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json',
//   },
// });
// }
// export const addPost = async (name) => {
//   return await fetch(`/api/createcategory`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json',
//     authorization: `Bearer ${authService.getToken()}`},
//     body: JSON.stringify(name)
// })
// }
// export const getCategories = async () => {
//   return await fetch(`/api/getcategories`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json',
//   },
// })
// }