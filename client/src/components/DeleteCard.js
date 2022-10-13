import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/post.actions";

const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteArticle = () => {
        dispatch(deletePost(props.id));
    }

    return(
        <div onClick={() => {
            if (window.confirm("Voulez-vous supprimer cette article ?"))
            {deleteArticle()};
        }}>
            <img src="./img/icons/trash.svg" alt="delete" />
        </div>
    )
}


export default DeleteCard;