import { Link } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    return (
        <header>

            <div className="brand-logo">
                <div className="logo"></div>
                <h1>AZEZ</h1>
                <h1>FITNESS</h1>
            </div>

            <div className="spacer"></div>



            <nav>
                <p>Wellcome , <strong>{`${user?.firstName} ${user?.lastName}`}</strong></p>

                <button onClick={logout}>Logout</button>
            </nav>
        </header>

    );
}

export default Navbar;