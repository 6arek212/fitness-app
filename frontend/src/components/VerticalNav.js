import { Link } from "react-router-dom";


const VerticalNav = () => {
    return (
        <div className="vertical-nav">

            <Link to='/' >Home</Link>

            <Link to='/customers'>Customers</Link>
        </div>
    );
}

export default VerticalNav;