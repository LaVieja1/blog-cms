import { Link } from "react-router-dom";

const ImageUpload = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Imagen Uploader</h1>
                <p className="lead">
                    Esta es una simple aplicación para subir y traer imagenes de una base de datos
                </p>
                <hr className="my-4" />
            </div>
            <div className="input-group mb-3">
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Elegir archivo
                    </label>
                </div>
            </div>
            <button type="button" className="btn btn-primary">
                Subir
            </button>
        </div>
    );
}

export default ImageUpload;