import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import CommentsJsx from "../components/CommentsJsx";

const Edit = (props) => {
    const { messages, setMessages, comments, setComments } = props;

    const urlParams = useParams();
    const postId = urlParams.id;
    const postData = messages.filter((post) => post._id == postId);
    const commentData = comments.filter((comment) => comment.posts_id == postId);
    let image = postData[0].image;
    let url = '';

    if (image) {
        url = `https://top-blogapi.onrender.com/uploads/${image}`;
    }
    const navigate = useNavigate();

    //delete comments
    const deleteComments = async (event) => {
        let id = event.target.value;

        await fetch(`https://top-blogapi.onrender.com/users/comments/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: tokenFetch,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const token = sessionStorage.getItem("token");
    const tokenOb = JSON.parse(token)
    const tokenFetch = `Bearer ${tokenOb.token}`

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());

        //send form data
        await fetch(`https://top-blogapi.onrender.com/users/edit/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: data.title,
                text: data.text,
            }),
            headers: {
                Authorization: tokenFetch,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    //delete pic
    const deleteImage = async (event) => {
        let id = event.target.value;

        await fetch(`https://top-blogapi.onrender.com/users/image/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: tokenFetch,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    //add pic
    const newImage = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const formData = new FormData();

        formData.append('image', data.image);

        await fetch(`https://top-blogapi.onrender.com/users/image/${postId}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: tokenFetch,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    //jsx

    //render delete pic button
    if (postData[0].image) {
        return (
            <div className="login-wrapper">
                <Header />
                <h2 className="pageTitle">Editar post</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Título</p>
                        <input className="titleInput" defaultValue={postData[0].title} type="text" name="title" />
                    </label>
                    <label>
                        <p>Texto</p>
                        <textarea defaultValue={postData[0].text} type="text" name="text" />
                    </label>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
                <img className="imgEdit" src={url}></img>
                <div className="deleteImageContainer">
                    <button className="delete" value={postData[0]._id} onClick={deleteImage}>Borrar imagen</button>
                </div>
                <h2 className="commentTitle">Comentarios</h2>
                <CommentsJsx
                    commentData={commentData}
                    deleteComments={deleteComments}
                />
            </div>
        );
        //render add new pic button
    } else {
        return (
            <div className="login-wrapper">
                <Header />
                <h2 className="pageTitle">Editar post</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Título</p>
                        <input className="titleInput" defaultValue={postData[0].title} type="text" name="title" />
                    </label>
                    <label>
                        <p>Texto</p>
                        <textarea defaultValue={postData[0].text} type="text" name="text" />
                    </label>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
                <img className="imgEdit" src={url}></img>
                <div className="addImageContainer">
                    <form encType="multipart/form-data" onSubmit={newImage}>
                        <label>
                            <div className="form-group">
                                <label>Imagen (debe ser .jpge .jpg o .png):</label>
                                <input type="file" className="form-control-file" id="image" name="image" accept=".jpge, .jpg, .png" />
                            </div>
                        </label>
                        <div className="addImage">
                            <button type="submit">Añadir una imagen</button>
                        </div>
                    </form>
                </div>
                <h2 className="commentTitle">Comentarios</h2>
                <CommentsJsx
                    commentData={commentData}
                    deleteComments={deleteComments}
                />
            </div>
        );
    }
}

export default Edit;