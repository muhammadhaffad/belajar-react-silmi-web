import { useEffect, useRef, useState } from "react";
import Dropdown from "./DropdownMenu";
import './dropdown-menu-item.css';

const DropdownItem = ({ parentName, dropdownItem }) => {
    const [isActive, setIsActive] = useState(false);
    const subMenuRef = useRef()
    const handleMouseEnter = () => {
        setIsActive(true);
    }
    const handleMouseLeave = () => {
        setIsActive(false);
    }
    const handleClick = (event) => {
        event.stopPropagation();
        setIsActive(!isActive);
    }
    const adjustPosition = () => {
        if (subMenuRef.current) {
            const rect = subMenuRef.current.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                subMenuRef.current.classList.add('dropdown__menu--right');
            } else {
                subMenuRef.current.classList.remove('dropdown__menu--right');
            }
        }
    }
    useEffect(() => {
        adjustPosition();
    }, [isActive]);
    return (
        <>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`dropdown__menu-item prevent-select ${isActive ? 'active' : ''}`}>
                <span>{dropdownItem.name}</span>{dropdownItem.children && <span className="pe-3 pe-lg-0" onClick={handleClick} style={{ float: 'right', fontWeight: 'bold' }}>{isActive ? '−' : '+'}</span>}
                {dropdownItem.children && <Dropdown ref={subMenuRef}>
                    {dropdownItem.children.map(
                        (dropdownItem) => (<DropdownItem key={`${parentName}-${dropdownItem.name}`} dropdownItem={dropdownItem}></DropdownItem>)
                    )}
                </Dropdown>}
            </li>
        </>
    );
}
export default DropdownItem;