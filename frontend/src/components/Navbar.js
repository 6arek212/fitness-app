import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">



                <nav>
                    <Link to='/'>הבית</Link>
                    <Link to='/'>הבית</Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;