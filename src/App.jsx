import './styles/theme.bundle.css';
import './styles/global.css';
import Navbar from '@component/Navbar/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getTrackBackground, Range } from 'react-range';
import { useState } from 'react';

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
const sliderImages = [
  'http://silmiofficial.com/assets/images/banners/silmi%20warnai%20negri.jpg',
  'http://silmiofficial.com/assets/images/banners/Dreams%20woven%20in%20the%20fabric%C2%A0of%C2%A0reality.jpg',
  'http://silmiofficial.com/assets/images/banners/renngganis.jpg',
  'http://silmiofficial.com/assets/images/banners/CLEREANCE%20SALE.jpg'
]
const colors = [
  { code: 'PI', name: 'Pink' },
  { code: 'HT', name: 'Hitam' },
  { code: 'MR', name: 'Maroon' },
  { code: 'ME', name: 'Merah' },
  { code: 'PB', name: 'Putih Bersih' },
  { code: 'PT', name: 'Putih Tulang' },
  { code: 'HJ', name: 'Hijau' },
];
const sizes = [
  '02', '04', '06', '08', '10', '12', '14', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'
]
const BannerCarousel = () => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        style={{
          aspectRatio: 2,
        }}
      >
        {sliderImages.map((image, i) => <SwiperSlide key={i}><img width={'100%'} src={image} /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}
function App() {
  const [values, setValues] = useState([100000, 400000]);
  const [searchColor, setSerachColor] = useState('');
  const [filterActive, setFilterActive] = useState(0);
  const min = 0;
  const max = 500000;
  const step = 10000;

  colors.sort((a, b) => a.name.localeCompare(b.name));
  const filteredColors = colors.filter(item => item.name.toLowerCase().includes(searchColor.toLowerCase()));
  const handleClickButtonFilter = (index) => {
    if (index === filterActive) {
      setFilterActive(0);
    } else {
      setFilterActive(index);
    }
  }

  return (
    <>
      <header>
        <Navbar navigationMenu={navigationMenu}></Navbar>
        <BannerCarousel></BannerCarousel>
      </header>
      <section className='container-fluid vh-100'>
        <nav className='filter' style={{
          height: '100px'
        }}>
          <div className="filter__wrapper">
            <div className="filter__panel">
              <div className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(1)} className={`filter__button btn ${filterActive === 1 ? 'active' : ''}`}>Harga<span>{filterActive === 1 ? '−' : '+'}</span></button>
                <div className="filter__options">
                  <div className="filter__options-container">
                    <Range
                      values={values}
                      step={step}
                      min={min}
                      max={max}
                      onChange={(values) => {
                        setValues(values);
                      }}
                      renderTrack={({ props, children }) => (
                        <div style={{
                          height: '1rem',
                          alignItems: 'center',
                          display: 'flex',
                          padding: '0 .5rem'
                        }}>
                          <div
                            ref={props.ref}
                            style={{
                              height: ".2rem",
                              width: "100%",
                              borderRadius: "0",
                              background: getTrackBackground({
                                values,
                                colors: ["var(--bs-light)", "var(--bs-dark)", "var(--bs-light)"],
                                min: min,
                                max: max,
                              }),
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          key={props.key}
                          style={{
                            ...props.style,
                            height: "1rem",
                            width: "1rem",
                            border: '2px solid var(--bs-dark)',
                            borderRadius: "1rem",
                            backgroundColor: "white"
                          }}
                        ></div>
                      )}
                    ></Range>
                    <div className="d-flex w-100 justify-content-between">
                      <span>Rp{values[0].toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                      <span>Rp{values[1].toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(2)} className={`filter__button btn ${filterActive === 2 ? 'active' : ''}`}>Warna<span>{filterActive === 2 ? '−' : '+'}</span></button>
                <div className="filter__options">
                  <div className="filter__options-container">
                    <div className="mb-3 border-bottom border-dark p-1 d-flex gap-2">
                      <span className='ps-1'>
                        <i className="fs-5 bi bi-search"></i>
                      </span>
                      <input type="text" value={searchColor} onChange={e => setSerachColor(e.target.value)} className='form-control p-0 border-0' placeholder='Cari warna...' />
                    </div>
                    <ul className='list-unstyled mb-0 d-flex flex-column flex-grow-1 gap-3 overflow-auto'>
                      {filteredColors.map(color => (
                        <li key={color.code} className='d-flex gap-2'>
                          <input type="checkbox" className='border border-dark form-check-input rounded-0 m-0' style={{ width: '1.5rem', height: '1.5rem' }} id={color.code} />
                          <label htmlFor={color.code}>{color.name}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(3)} className={`filter__button btn ${filterActive === 3 ? 'active' : ''}`}>Ukuran<span>{filterActive === 3 ? '−' : '+'}</span></button>
                <div className="filter__options">
                  <div className="filter__options-container">
                    <div className="flex-grow-1 gap-2 overflow-auto" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                      {sizes.map((size) => (
                        <div key={size} className="form-group d-inline-block m-0 form-check-bg">
                          <input type="checkbox" className="form-check-bg-input" id={size} autoComplete={false} />
                          <label className="form-check-label text-center w-100 prevent-select rounded-0 border-dark" htmlFor={size}>{size}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter__controller"></div>
          </div>
        </nav>
        <div>
          <aside></aside>
          <main></main>
        </div>
      </section>
    </>
  )
}

export default App
