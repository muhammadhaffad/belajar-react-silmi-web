import { useState } from "react";
import './navigation-menu-item.css';

const NavigationMenuItem = ({navItem, children}) => {
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => {
        setIsActive(true);
    }
    const handleMouseLeave = () => {
        setIsActive(false);
    }
    const handleClick = () => {
        setIsActive(!isActive);
    }
    return (
        <>
            <li className={`navbar__menu-item prevent-select ${isActive ? 'active' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <span className="px-3">{navItem.name}</span>{navItem.children && <span onClick={handleClick} className="pe-3" style={{ float: 'right', fontWeight: 'bold' }}>{isActive ? '−' : '+'}</span>}
                {children}
            </li>
        </>
    );
}
export default NavigationMenuItem;