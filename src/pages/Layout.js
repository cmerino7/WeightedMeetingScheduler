import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <button>
                    <Link to="/ex">ex</Link>
                </button>
            </nav>
            <Outlet />
            </>
    )
};

export default Layout;

