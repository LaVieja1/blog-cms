import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="error">
        <h1>Esta ruta no existe.</h1>
        <Link to="/">
            Volver al inicio
        </Link>
        </div>
    );
};

export default ErrorPage;