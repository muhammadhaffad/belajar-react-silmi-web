import '@style/navigation-menu/navigation-menu.css';

const NavigationMenu = ({className, children}) => {
    return (
        <ul className={`${className || null} nav-list d-flex align-items-center p-0 m-0 flex-row flex-grow-1`}>
            {children}
        </ul>
    );
}
export default NavigationMenu;