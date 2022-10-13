import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../actions/post.actions";
import DeleteCard from "./DeleteCard";
import LikeButton from "./Post/LikeBoutton";
import { dateParser, isEmpty } from "./Utils";


const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = async () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
            <>
                    <div className="card-left"></div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                {!isEmpty(usersData[0]) &&
                                    usersData
                                    .map((user) => {
                                        if (user._id === post.posterId) return user.pseudo;
                                        else return null;
                                    })
                                    .join("")}
                                </h3>
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(event) => setTextUpdate(event.target.value)} />
                                <div className="btn" onClick={updateItem}>
                                    <button>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}

                        { (userData._id === post.posterId || userData.is_admin) && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}

                        <div className="card-footer">
                            <LikeButton  post={post}/>
                        </div>
                    </div>
                </>
                )}
        </li>
    );
};


export default Card;