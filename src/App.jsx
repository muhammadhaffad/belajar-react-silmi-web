import './styles/theme.bundle.css';
import './styles/global.css';

function NavbarMenu({ menus, className, children }) {
  return (
    <ul className={`d-flex align-items-center p-0 m-0 flex-row flex-grow-1 ${className}`}>
      {menus?.map(menu => {
        return (
          <li key={menu.name} className='dropdown cursor-pointer nav-item d-flex align-items-center h-100'>
            <span className="px-3" style={{pointerEvents: 'none'}}>{menu.name}</span>
            <ul className={`dropdown-menu rounded-0 ${menu.subMenus ? null : 'd-none' }`}>
              {menu.subMenus && [menu.subMenus.map((subMenu) => {
                return <li key={subMenu.name} className='dropdown-menu-item'><span>{subMenu.name}</span></li>
              })]}
            </ul>
          </li>
        );
      })}
      {children}
    </ul>
  );
}

function Navbar() {
  const menus = [
    { name: 'Our Products' },
    { name: 'Koko', subMenus: [
      {name: 'Koko Dewasa'},
      {name: 'Koko Anak'},
    ] },
    { name: 'Gamis', subMenus: [
      {name: 'Gamis Dewasa'},
      {name: 'Gamis Anak'},
    ] },
  ];
  return (
    <nav className='border-bottom sticky-top bg-white'>
      <div className="container-fluid d-flex">
        <a className="navbar-brand fw-bold fs-3 m-0 p-0 flex-shrink-0" href="https://silmiofficial.com">
          <div className="my-3 d-flex align-items-center">
            <img src="https://silmiofficial.com/assets/images/logos/logo-silmi-horizontal.png" alt="" style={{ height: "3rem" }} />
          </div>
        </a>
        <div className='d-flex flex-column w-100'>
          <div dir='rtl'>
            <span className='text-nowrap' style={{
              fontSize: '0.8rem'
            }}>Anda belum login, silahkan <b className='fw-bold'><u>login di sini</u></b></span>
          </div>
          <div className="d-flex flex-grow-1">
            <NavbarMenu menus={menus} className={'justify-content-center'}></NavbarMenu>
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
