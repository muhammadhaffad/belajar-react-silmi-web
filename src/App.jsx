import './styles/theme.bundle.css';
import './styles/global.css';
import useScroll from './hooks/useScroll';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { name: 'Our Products' },
  {
    name: 'Koko', children: [
      {
        name: 'Koko Dewasa', children: [
          { name: 'A' },
          {
            name: 'B', children: [
              { name: 'A', children: [
                { name: 'A', children: [
                  { name: 'A' },
                  { name: 'B' },
                ] },
                { name: 'B' },
              ] },
              { name: 'B' },
            ]
          },
        ]
      },
      {
        name: 'Koko Anak', children: [
          { name: 'C', children: [
            { name: 'A' },
            { name: 'B' },
          ] },
          { name: 'D' },
        ]
      },
    ]
  },
  {
    name: 'Gamis', children: [
      { name: 'Gamis Dewasa', children: [
        { name: 'A' },
        { name: 'B' },
      ] },
      { name: 'Gamis Anak' },
    ]
  },
];

function NavbarItemDropdownItemList({ parentName, dropdownItems }) {
  const [actives, setActives] = useState(Array(dropdownItems.length).fill(false));
  const itemDropdownRefs = useRef([])
  const handleMouseEnter = (index) => {
    setActives((prevState) => {
      return prevState.map((_, i) => i == index ? true : false);
    });
  }
  const handleMouseLeave = () => {
    setActives((prevState) => {
      return prevState.map(() => false);
    });
  }
  useEffect(() => {
    const activeItem = itemDropdownRefs.current.filter((ref) => {
      return ref.classList.contains('active');
    }).shift()
    // console.info(activeItem[0]);
    if (activeItem && activeItem.lastChild.tagName == 'UL') {
      const subDropdown = activeItem.lastChild;
      if(subDropdown.getBoundingClientRect().right > document.body.getBoundingClientRect().right) {
        subDropdown.classList.add('custom-dropdown-right');
      } else {
        subDropdown.classList.remove('custom-dropdown-right');
      }
    }
    return () => {
      if (activeItem && activeItem.lastChild.tagName == 'UL') {
        const subDropdown = activeItem.lastChild;
        subDropdown.classList.remove('custom-dropdown-right');
      }
    }
  }, [actives]);
  return (
    <ul className={`custom-dropdown-menu rounded-0`}>
      {dropdownItems.map((dropdownItem, index) => {
        return (
          <li ref={(elem) => itemDropdownRefs.current[index] = elem} key={`${parentName}-${dropdownItem.name}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()} className={`custom-dropdown-menu-item ${actives[index] ? 'active' : ''}`}>
            <span>{dropdownItem.name}</span>{dropdownItem.children && <span style={{float: 'right', fontWeight: 'bold'}}>{actives[index] ? '−' : '+'}</span>}
            {dropdownItem.children && <NavbarItemDropdownItemList parentName={`${parentName}-${dropdownItem.name}`} dropdownItems={dropdownItem.children} ></NavbarItemDropdownItemList>}
          </li>
        )
      })}
    </ul>
  );
}

function NavbarItemList({ navbarItems, className, children }) {
  const [actives, setActives] = useState(Array(navbarItems.length).fill(false));

  const handleMouseEnter = (index) => {
    setActives((prevState) => {
      return prevState.map((_, i) => i == index ? true : false);
    });
  }
  const handleMouseLeave = () => {
    setActives((prevState) => {
      return prevState.map(() => false);
    });
  }
  return (
    <ul className={`nav-list d-flex align-items-center p-0 m-0 flex-row flex-grow-1 ${className}`}>
      {navbarItems && navbarItems?.map((navbarItem, index) => {
        return (
          <li key={navbarItem.name} className={`cursor-pointer nav-item d-flex align-items-center h-100 ${actives[index] ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()}>
            <span className="px-3">{navbarItem.name}</span>{navbarItem.children && <span className="pe-3" style={{float: 'right', fontWeight: 'bold'}}>{actives[index] ? '−' : '+'}</span>}
            {navbarItem.children && <NavbarItemDropdownItemList dropdownItems={navbarItem.children}></NavbarItemDropdownItemList>}
          </li>
        )
      })}
      {children}
    </ul>
  );
}

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
            <NavbarItemList navbarItems={navItems} className={'justify-content-center d-lg-flex'}></NavbarItemList>
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
