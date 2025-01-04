import { forwardRef } from "react";
import '@style/dropdown/dropdown.css';

const Dropdown = forwardRef((props, ref) => {
    const { children }= props;
    return (
        <ul ref={ref} className={`custom-dropdown-menu rounded-0`}>
            {children}
        </ul>
    );
});
Dropdown.displayName = 'Dropdown';
export default Dropdown;