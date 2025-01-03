import './styles/theme.bundle.css';
import './styles/global.css';
import useScroll from './hooks/useScroll';
import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import NavigationMenuItem from '@/components/NavigationMenu/NavigationMenuItem';
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
  const [isHidden, setIsHidden] = useState(false);
  const scroll = useScroll();

  useEffect(() => {
    if (scroll.y > 100 && scroll.y - scroll.lastY > 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [scroll.y, scroll.lastY]);
  return (
    <nav className={`nav border-bottom sticky-top bg-white ${isHidden ? 'nav--hidden' : null}`}>
      <div className="container-fluid d-flex justify-content-between">
        <button className='d-inline-block d-lg-none'>Ham</button>
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
            <NavigationMenu className={'justify-content-center d-lg-flex'}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
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
