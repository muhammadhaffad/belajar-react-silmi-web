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
const NavbarSearch = () => {

}
function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(true);
  const [querySearch, setQuerySearch] = useState('');
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

  useEffect(() => {
    if (scroll.y > 100 && scroll.y - scroll.lastY > 0) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
  }, [scroll.y, scroll.lastY]);
  return (
    <nav className={`nav border-bottom sticky-top bg-white ${!isNavbarVisible ? 'nav--hidden' : null}`}>
      <div className="container-fluid d-flex justify-content-between">
        <button className='btn p-0 d-inline-block d-lg-none' onClick={(event) => { event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible) }}><i className="icon fs-3 bi bi-list"></i></button>
        <a className="navbar-brand fw-bold fs-3 m-0 p-0 flex-shrink-0" href="https://silmiofficial.com">
          <div className="my-3 d-flex align-items-center">
            <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
          </div>
        </a>
        <div className='d-flex flex-column w-lg-100'>
          <div dir='rtl' className='d-none d-lg-block'>
            <span className='text-nowrap'><small>Anda belum login, silahkan <b className='fw-bold'><u>login di sini</u></b></small></span>
          </div>
          <div className="d-flex flex-grow-1">
            <NavigationMenu className={`${!isNavMenuVisible ? 'show-menu' : 'hide-menu'} d-lg-flex border-end border-lg-0`}>
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
                  {querySearch === '' ? <button onClick={handleClickSearch} className="navbar__search-button btn"><i className="fs-5 bi bi-search"></i></button> : <button className="navbar__search-clear-button btn" onClick={(event) => { event.stopPropagation(); setQuerySearch('') }}><i className="fs-5 bi bi-x-lg"></i></button>}
                </search>
                <article className='navbar__search-result'>
                  <span className='fw-bold text-uppercase d-block mb-2'>Produk</span>
                  <ul className='navbar__search-result-list'>
                    {
                      [...Array(4)].map((e, i) => <li key={i} className='navbar__search-result-item'>
                        <div className="navbar__search-result-card">
                          <img src="http://silmiofficial.com/storage/produk/YuG240UUnG7DFIDM9eOia5wgKO9KxYWhMYRQhk1I.webp" width={100} alt="" />
                          <div>
                            <small className='text-nowrap d-block'>Inayah</small>
                            <span className='text-nowrap fw-bold d-block'>Inayah Gamis Anak</span>
                            <div className='text-nowrap d-flex gap-1'><small className='text-danger'>Rp250.000</small><small><s>Rp295.000</s></small></div>
                          </div>
                        </div>
                      </li>)
                    }
                  </ul>
                  <span className='fw-bold d-block mt-2'><u>Lihat Semua</u></span>
                </article>
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
