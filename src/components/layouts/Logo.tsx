import {NavLink} from "react-router-dom";

function Logo() {
    return (
        <NavLink to="/">
            <img src="/images/infinity.png" alt="Infinity Logo"/>
        </NavLink>
    );
}

export default Logo;
