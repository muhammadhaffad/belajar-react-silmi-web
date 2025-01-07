import './styles/theme.bundle.css';
import './styles/global.css';
import useScroll from './hooks/useScroll';
import Dropdown from '@component/Dropdown/Dropdown';
import DropdownItem from '@component/Dropdown/DropdownItem';
import NavigationMenu from '@component/NavigationMenu/NavigationMenu';
import NavigationMenuItem from '@component/NavigationMenu/NavigationMenuItem';
import { useEffect, useRef, useState } from 'react';

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
    <nav className={`nav border-bottom sticky-top bg-white ${!isNavbarVisible ? 'navbar--hidden nav--hidden' : null}`}>
      <div className="navbar__container container-fluid d-flex justify-content-between">
        <button className='navbar__hamburger-button btn p-0 d-inline-block d-lg-none' onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }}>
          <i className="icon fs-3 bi bi-list"></i>
        </button>
        <a className="navbar__brand navbar-brand fw-bold fs-3 m-0 p-0 flex-shrink-0" href="https://silmiofficial.com">
          <div className="my-3 d-flex align-items-center">
            <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
          </div>
        </a>
        <div className='navbar__toolbar d-flex flex-column w-lg-100'>
          <div dir='rtl' className='navbar__header-top d-none d-lg-block'>
            <span className='text-nowrap'><small>Anda belum login, silahkan <b className='fw-bold'><u>login di sini</u></b></small></span>
          </div>
          <div className="navbar__controls-container d-flex flex-grow-1">
            <NavigationMenu className={`${!isNavMenuVisible ? 'navbar__menu--show show-menu' : 'navbar__menu-hide hide-menu'} navbar__menu d-lg-flex border-end border-lg-0`}>
              <li className='d-lg-none nav-item d-flex justify-content-between px-3 pb-3 border-bottom'>
                <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
                <button onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }} className='btn p-2 d-block ms-auto'><i className="icon bi bi-x-lg"></i></button>
              </li>
              {navigationMenu && navigationMenu?.map((navItem) => (
                <NavigationMenuItem key={navItem.name} navItem={navItem}>
                  {navItem.children && <Dropdown>
                    {navItem.children.map(
                      (dropdownItem) => <DropdownItem key={`${navItem.name}-${dropdownItem.name}`} dropdownItem={dropdownItem}></DropdownItem>
                    )}
                  </Dropdown>}
                </NavigationMenuItem>
              ))}
            </NavigationMenu>
            <div className='navbar__actions'>
              <div ref={navbarSearchRef} className="navbar__search navbar__search-wrapper">
                <search className='navbar__search-inner-wrapper'>
                  <input value={querySearch} onChange={(event) => setQuerySearch(event.target.value)} type="text" className='navbar__search-input visible form-control' placeholder='Cari...' />
                  <button onClick={handleClickSearchBack} className='navbar__search-back-button btn'><i className="fs-5 bi bi-chevron-left"></i></button>
                  {
                    isSearchLoading && querySearch &&
                    <div className="navbar__search-loading">
                      <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                    </div>
                  }
                  {(querySearch === '') 
                    ?
                    <button onClick={handleClickSearch} className="navbar__search-button btn"><i className="fs-5 bi bi-search"></i></button>
                    :
                    <button className="navbar__search-clear-button btn" onClick={(event) => { event.stopPropagation(); setQuerySearch('') }}><i className="fs-5 bi bi-x-lg"></i></button>
                  }
                </search>
                {
                  (Object.keys(searchResult).length > 0 && searchResult.total > 0) ?
                    <article className='navbar__search-result'>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className='fw-bold d-block'>PRODUK</span>
                        {searchResult.total > 5 ? <small className='fw-bold d-block'><u>Lihat Semua ({searchResult.total})</u></small> : null}
                      </div>
                      <ul className='navbar__search-result-list'>
                        { searchResult.products.map((data) => <li key={data.id} className='navbar__search-result-item'>
                          <div className="navbar__search-result-card">
                            <img src={data.images[0] /* http://silmiofficial.com/storage/produk/YuG240UUnG7DFIDM9eOia5wgKO9KxYWhMYRQhk1I.webp */} width={100} height={100} alt="" />
                            <div>
                              <small className='text-nowrap d-block'>{data.brand}</small>
                              <small className='fw-bold d-block'>{data.title}</small>
                              {(data.discountPercentage > 0) ? <div className='text-nowrap d-flex gap-1'><small className='text-danger'>Rp{parseFloat(data.price * (1-data.discountPercentage/100)).toFixed(2)}</small><small><s>Rp{data.price}</s></small></div> : <div className='text-nowrap d-flex gap-1'><small>Rp{data.price}</small></div>
                              }
                            </div>
                          </div>
                        </li>) }
                      </ul>
                    </article> : null
                }
              </div>
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
