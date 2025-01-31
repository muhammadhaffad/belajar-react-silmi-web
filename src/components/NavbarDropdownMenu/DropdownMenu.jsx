import { forwardRef } from "react";
import './dropdown-menu.css';

const Dropdown = forwardRef((props, ref) => {
    const { children }= props;
    return (
        <ul ref={ref} className={`dropdown__menu`}>
            {children}
        </ul>
    );
});
Dropdown.displayName = 'DropdownMenu';
export default Dropdown;