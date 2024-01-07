import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import { useForm } from "react-hook-form";

const NewPost = (props) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [text, setText] = useState();

    const token = sessionStorage.getItem('token');
    const tokenOb = JSON.parse(token);
    const tokenFetch = `Bearer ${tokenOb.token}`;

    //submit new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('text', data.text);
        formData.append('image', data.image);

        await fetch('https://top-blogapi.onrender.com/users/posts/', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: tokenFetch,
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

    return (
        <div className="login-wrapper">
            <Header />
            <h2 className="pageTitle">Nuevo Post</h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label>
                    <p>Título</p>
                    <input className="titleInput" type="text" name="title" required onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                    <p>Texto</p>
                    <textarea type="text" name="text" required onChange={e => setText(e.target.value)} />
                </label>
                <div className="addImage">
                    <label>Imagen (debe ser .jpge .jpg o .png):</label>
                    <input type="file" className="form-control-file" id="image" name="image" accept=".jpeg, .jpg, .png" />
                </div>
                <div className="newPostSubmit">
                    <button type="submit">Crear post</button>
                </div>
            </form>
        </div>
    );
}

export default NewPost;