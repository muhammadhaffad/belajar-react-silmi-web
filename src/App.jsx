import './styles/theme.bundle.css';
import './styles/global.css';
import useScroll from './hooks/useScroll';
import DropdownMenu from '@/components/Navbar/DropdownMenu/DropdownMenu';
import DropdownMenuItem from '@/components/Navbar/DropdownMenu/DropdownMenuItem';
import NavigationMenu from '@/components/Navbar/NavigationMenu/NavigationMenu';
import NavigationMenuItem from '@/components/Navbar/NavigationMenu/NavigationMenuItem';
import { useEffect, useRef, useState } from 'react';
import Search from './components/Navbar/Search/Search';

const navigationMenu = [
  { name: 'Our Products' },
  {
    name: 'Koko', children: [
      {
        name: 'Koko Dewasa', children: [
          { name: 'A' },
          {
            name: 'B', children: [
              {
                name: 'A', children: [
                  {
                    name: 'A', children: [
                      { name: 'A' },
                      { name: 'B' },
                    ]
                  },
                  { name: 'B' },
                ]
              },
              { name: 'B' },
            ]
          },
        ]
      },
      {
        name: 'Koko Anak', children: [
          {
            name: 'C', children: [
              { name: 'A' },
              { name: 'B' },
            ]
          },
          { name: 'D' },
        ]
      },
    ]
  },
  {
    name: 'Gamis', children: [
      {
        name: 'Gamis Dewasa', children: [
          { name: 'A' },
          { name: 'B' },
        ]
      },
      { name: 'Gamis Anak' },
    ]
  },
];
function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(true);
  const [querySearch, setQuerySearch] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const navbarSearchRef = useRef();
  const scroll = useScroll();

  function handleClickSearch() {
    if (document.body.clientWidth < 992) {
      navbarSearchRef.current.classList.add('visible');
    }
  }
  function handleClickSearchBack() {
    setQuerySearch('');
    if (document.body.clientWidth < 992) {
      navbarSearchRef.current.classList.remove('visible');
    }
  }

  const handleSearch = async (value) => {
    if (querySearch === '') {
      setSearchResult({});
      return;
    }
    setIsSearchLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${value}&limit=5`).then((response) => response.json());
      setSearchResult(response);
    } catch (error) {
      alert(error);
    } finally {
      setIsSearchLoading(false);
    }
  }

  useEffect(() => {
    if (scroll.y > 100 && scroll.y - scroll.lastY > 0) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
  }, [scroll.y, scroll.lastY]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(querySearch);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [querySearch]);

  return (
    <nav className={`navbar ${!isNavbarVisible ? 'navbar--hidden' : ''}`}>
      <div className="navbar__container container-fluid">
        <button className='navbar__hamburger-button btn' onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }}>
          <i className="icon fs-3 bi bi-list"></i>
        </button>
        <a className="navbar__brand" href="https://silmiofficial.com">
          <div className="navbar__brand-logo">
            <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" />
          </div>
        </a>
        <div className='navbar__toolbar'>
          <div dir='rtl' className='navbar__header-top'>
            <span className='text-nowrap'><small>Anda belum login, silahkan <b className='fw-bold'><u>login di sini</u></b></small></span>
          </div>
          <div className="navbar__controls-container">
            <NavigationMenu className={`${!isNavMenuVisible ? 'navbar__menu--show' : 'navbar__menu--hide'}`}>
              <li className='navbar__menu-item navbar__menu-header--mobile'>
                <img className='navbar__menu-brand' src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
                <button className='navbar__menu-close btn' onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }}><i className="icon bi bi-x-lg"></i></button>
              </li>
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

function App() {

  return (
    <>
      <header>
        <Navbar></Navbar>
        <div>
          <img src="https://silmiofficial.com/assets/images/banners/Dreams%20woven%20in%20the%20fabric%C2%A0of%C2%A0reality.jpg" alt="" width={'100%'} />
        </div>
      </header>
      <section>
        <nav></nav>
        <div>
          <aside></aside>
          <main></main>
        </div>
      </section>
    </>
  )
}

export default App
