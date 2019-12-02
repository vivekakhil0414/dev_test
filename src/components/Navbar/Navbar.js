import React  from 'react';
import { Link } from 'react-router-dom';

export default function NavbarTop(props) {

    return (
        <div>
          <div className="sidenav">
            {/* <Link to="/">Home</Link> */}
            <Link to="/service">Show List</Link>
          </div>
        </div>
    );
}
