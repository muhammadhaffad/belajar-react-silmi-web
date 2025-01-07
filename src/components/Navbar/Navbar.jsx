import useScroll from "@/hooks/useScroll";
import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import NavigationMenuItem from "./NavigationMenu/NavigationMenuItem";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem from "./DropdownMenu/DropdownMenuItem";
import Search from "./Search/Search";

export default function Navbar({ navigationMenu }) {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isNavMenuVisible, setIsNavMenuVisible] = useState(true);
    const scroll = useScroll();

    useEffect(() => {
        if (scroll.y > 100 && scroll.y - scroll.lastY > 0) {
            setIsNavbarVisible(false);
        } else {
            setIsNavbarVisible(true);
        }
    }, [scroll.y, scroll.lastY]);

    return (
        <nav className={`navbar ${!isNavbarVisible ? 'navbar--hidden' : ''}`}>
            <div className="navbar__container container-fluid">
                <div className={`navbar__header ${!isNavMenuVisible ? 'navbar__menu--show container-fluid' : ''}`}>
                    {
                        isNavMenuVisible ?
                            <button key={'open'} className='navbar__hamburger-button btn' onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }}>
                                <i className="icon fs-3 bi bi-list"></i>
                            </button> :
                            <button key={'close'} className='navbar__hamburger-button btn' onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }}>
                                <i className="icon fs-3 bi bi-chevron-left"></i>
                            </button>
                    }
                    <a className="navbar__brand" href="https://silmiofficial.com">
                        <div className="navbar__brand-logo">
                            <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" />
                        </div>
                    </a>
                </div>
                <div className='navbar__toolbar'>
                    <div dir='rtl' className='navbar__toolbar-top'>
                        <span className='text-nowrap'><small>Anda belum login, silahkan <b className='fw-bold'><u>login di sini</u></b></small></span>
                    </div>
                    <div className="navbar__controls-container">
                        <NavigationMenu className={`${!isNavMenuVisible ? 'navbar__menu--show' : 'navbar__menu--hide'}`}>
                            {navigationMenu && navigationMenu?.map((navItem) => (
                                <NavigationMenuItem key={navItem.name} navItem={navItem}>
                                    {navItem.children && <DropdownMenu>
                                        {navItem.children.map(
                                            (dropdownItem) => <DropdownMenuItem key={`${navItem.name}-${dropdownItem.name}`} dropdownItem={dropdownItem}></DropdownMenuItem>
                                        )}
                                    </DropdownMenu>}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenu>
                        <div className='navbar__actions'>
                            <Search></Search>
                            <button className='btn p-0'><i className="fs-5 bi bi-bag-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}