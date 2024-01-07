import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Posts(props) {
    const { messages, setMessages, comments, setComments } = props;

    //load page get info use token
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem('token');
    const tokenOb = JSON.parse(token);
    const tokenFetch = `Bearer ${tokenOb.token}`;

    //publish posts
    const handlePublish = async (event) => {
        let id = event.target.value;

        await fetch(`https://top-blogapi.onrender.com/users/publish/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: tokenFetch,
                'Content-Type': 'application/json; charset=UTF-8',
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

    //delete posts
    const handleDelete = async (event) => {
        let id = event.target.value;

        await fetch(`https://top-blogapi.onrender.com/users/posts/${id}`, {
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

    //edit posts
    const handleEdit = async (event) => {
        let id = event.target.value;
        console.log(id);
    }
    //get posts
    const fetchInfo = async () => {
        try {
            const [apiPosts, apiComments] = await Promise.all([
                fetch('https://top-blogapi.onrender.com/users/posts', {
                    headers: { Authorization: tokenFetch }
                }),
                fetch('https://top-blogapi.onrender.com/api/comments')
            ]);

            const messageData = await apiPosts.json();
            const commentData = await apiComments.json();
            setMessages(messageData);
            setComments(commentData);
        } catch (error) {
            console.error('Hubo un problema con la operación fetch:', error);
            setError('true');
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    //display error and loading for api call

    if (error) return (
        <div>
            <p>Hubo un error de conexión</p>
        </div>
    )

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
            <Header />
            <h2 className="pageTitle">Todos los Posts</h2>
            <div className="postContainer">
                <div className="postCard">
                    {messages.map((index) => {
                        const postComments = comments.filter((comment) => comment.posts_id == index._id).length;
                        let image = index.image;
                        let url = '';

                        if (image) {
                            url = `https://top-blogapi.onrender.com/uploads/${index.image}`;
                        }

                        let date = new Date(index.timestamp).toLocaleString();
                        let published = '';

                        if (index.published == true) {
                            published = 'Si';
                        } else {
                            published = 'No';
                        }

                        return (
                            <div key={index._id} className="post">
                                <div id={index._id} className="card">
                                    <h2 className="postTitle">{index.title}</h2>
                                    <img alt="No hay imagen" className="imgPost" src={url}></img>
                                    <div className="commentContainer">
                                        <p>Publicado: {published}</p>
                                        <div>
                                            <p>{date}</p>
                                        </div>
                                        <div>
                                            <div className="commentPadding">
                                                <p>Comentarios: {postComments}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="allButtonContainer">
                                    <div className="deleteButtonContainer">
                                        <button className="delete" value={index._id} onClick={handleDelete}>Borrar post</button>
                                    </div>
                                    <div className="editButtonContainer">
                                        <Link to={`post/${index._id}`} state={index._id}>
                                            <button className="edit" value={index._id}>Editar post</button>
                                        </Link>
                                    </div>
                                    <div className="publishButtonContainer">
                                        <button className="publish" value={index._id} onClick={handlePublish}>Publicar</button>
                                    </div>
                                </div>
                            </div>
                        );

                    })}
                    <div className="newPostContainer" >
                        <Link to={'/newpost'}>
                            <button className="edit">Nuevo post</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;