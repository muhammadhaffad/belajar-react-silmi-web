const NavigationMenu = ({className, children}) => {
    return (
        <ul className={`nav-list d-flex align-items-center p-0 m-0 flex-row flex-grow-1 ${className || null}`}>
            {children}
        </ul>
    );
}
export default NavigationMenu;