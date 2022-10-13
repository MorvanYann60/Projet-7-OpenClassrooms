import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";


const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData();
            data.append("posterId", userData._id);
            data.append("message", message);
            if (file) data.append("file", file);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();

        } else {
            alert("Veuillez rentrer un message");
        }
    };

    const handlePicture = (event) => {
        setPostPicture(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    };

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setFile('');
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData, message])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
            <>
                <div className="post-form">
                    <textarea name="message" id="message" placeholder="Quoi de neuf ?" onChange={(event) => setMessage(event.target.value)} value={message} />

                    {message || postPicture ? (
                        <li className="card-container">
                            <div className="card-left"></div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>{userData.pseudo}</h3>
                                    </div>
                                    <span>{timestampParser(Date.now())}</span>
                                </div>
                                <div className="content">
                                    <p>{message}</p>
                                    <img src={postPicture} alt="" />
                                </div>
                            </div>
                        </li>
                    ) : null }
                
                    <div className="footer-form">
                        <div className="icon">
                            <img src="./img/icons/picture.svg" alt="img" />
                            <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={(event) => handlePicture(event)} />
                        </div>
                        <div className="btn-send">
                            {message || postPicture ? (
                                <button className="cancel" onClick={cancelPost}>Annuler message</button>
                            ) : null }
                            <button className="send" onClick={handlePost}>Envoyer</button>
                        </div>
                    </div>
                </div>
            </>
            )}
        </div>
    )
}


export default NewPostForm;