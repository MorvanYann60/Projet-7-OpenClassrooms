import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
    return(dispatch) => {
        return axios
        .get(`http://localhost:5000/api/post/`, {withCredentials: true})
        .then((res) => {
            dispatch({ type: GET_POSTS, payload: res.data  })
        })
        .catch((error) => console.log(error));
    }
}

export const addPost = (data) => {
    return(dispatch) => {
        return axios
        .post(`http://localhost:5000/api/post/`, data, {withCredentials: true})
    }
}
 
export const likePost = (postId, userId) => {
    return(dispatch) => {
        return axios({
            method: "patch",
            url: `http://localhost:5000/api/post/like-post/` + postId,
            data: {id: userId},
            withCredentials: true
        })
        .then((res) => {
            dispatch({ type: LIKE_POST, payload: { postId, userId } });
        })
        .catch((error) => console.log(error));
    };
};

export const unlikePost = (postId, userId) => {
    return(dispatch) => {
        return axios({
            method: "patch",
            url: `http://localhost:5000/api/post/unlike-post/` + postId,
            data: {id: userId},
            withCredentials: true
        })
        .then((res) => {
            dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        })
        .catch((error) => console.log(error));
    };
};

export const updatePost = (postId, message) => {
    return(dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/post/${postId}`,
            data: {message},
            config: {withCredentials: true}
            
        })
        .then((res) => {
            dispatch({ type: UPDATE_POST, payload: { message, postId }});
        })
        .catch((error) => console.log(error));
    }
}

export const deletePost = (postId) => {
    return(dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:5000/api/post/${postId}`,
            withCredentials: true
        })
        .then((res) => {
            dispatch({ type: DELETE_POST, payload:  { postId }});
        })
        .catch((error) => console.log(error));
    }
}