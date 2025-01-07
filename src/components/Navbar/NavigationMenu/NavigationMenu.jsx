import '@style/navbar/navigation-menu/navigation-menu.css';

const NavigationMenu = ({className, children}) => {
    return (
        <ul className={`${className || null} navbar__menu`}>
            {children}
        </ul>
    );
}
export default NavigationMenu;