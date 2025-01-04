import './styles/theme.bundle.css';
import './styles/global.css';
import useScroll from './hooks/useScroll';
import Dropdown from '@component/Dropdown/Dropdown';
import DropdownItem from '@component/Dropdown/DropdownItem';
import NavigationMenu from '@component/NavigationMenu/NavigationMenu';
import NavigationMenuItem from '@component/NavigationMenu/NavigationMenuItem';
import { useEffect, useState } from 'react';

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
  const scroll = useScroll();

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
        <button className='btn p-0 d-inline-block d-lg-none' onClick={(event) => {event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible)}}><i className="icon fs-3 bi bi-list"></i></button>
        <a className="navbar-brand fw-bold fs-3 m-0 p-0 flex-shrink-0" href="https://silmiofficial.com">
          <div className="my-3 d-flex align-items-center">
            <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
          </div>
        </a>
        <div className='d-flex flex-column w-lg-100'>
          <div dir='rtl' className='d-none d-lg-block'>
            <span className='text-nowrap' style={{
              fontSize: '0.8rem'
            }}>Anda belum login, silahkan <b className='fw-bold'><u>login di sini</u></b></span>
          </div>
          <div className="d-flex flex-grow-1">
            <NavigationMenu className={`${!isNavMenuVisible ? 'show-menu' : 'hide-menu'} justify-content-center d-lg-flex border-end border-lg-0`}>
              <li className='d-lg-none nav-item d-flex justify-content-between px-3 pb-3 border-bottom'>
                <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
                <button onClick={(event) => {event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible)}} className='btn p-2 d-block ms-auto'><i className="icon bi bi-x-lg"></i></button>
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
            <div className='d-flex align-items-center'>
              <search>
                <span className="nav-link position-relative search-trigger cursor-pointer mx-0 disable-child-pointer border-0 bg-transparent text-body p-2">
                  <i className="fs-5 bi bi-search"></i>
                </span>
                <div className='position-absolute end-0 top-0 bg-white vh-100 w-100' style={{maxWidth: '576px'}}>
                  <div className="d-flex p-3 border-bottom border-start" style={{height: '5rem'}}>
                    <div className='d-flex gap-3 align-items-center w-100'>
                      <i className="fs-5 bi bi-search"></i>
                      <input type="text" className='form-control form-control-sm rounded-0 w-100' />
                    </div>
                    <button onClick={(event) => {event.stopPropagation(); setIsNavMenuVisible(!isNavMenuVisible)}} className='btn p-3 d-block ms-auto' style={{marginRight: '-1rem'}}><i className="icon bi bi-x-lg"></i></button>
                  </div>
                </div>
              </search>
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
