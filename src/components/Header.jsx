import { Link, useParams } from "react-router-dom";

function Header() {
    const handleLogout = (event) => {
        sessionStorage.removeItem('message');
        sessionStorage.removeItem('token');
    }

    return (
        <div>
            <header>
                <Link className="heading" to="/">
                    <h1>Santi's Blog</h1>
                </Link>
                <div className="editButtonContainer">
                    <Link to={'/login'}>
                        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Header;