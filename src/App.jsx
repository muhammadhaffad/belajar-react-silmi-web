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
const sliderImages = [
  'http://silmiofficial.com/assets/images/banners/silmi%20warnai%20negri.jpg',
  'http://silmiofficial.com/assets/images/banners/Dreams%20woven%20in%20the%20fabric%C2%A0of%C2%A0reality.jpg',
  'http://silmiofficial.com/assets/images/banners/renngganis.jpg',
  'http://silmiofficial.com/assets/images/banners/CLEREANCE%20SALE.jpg'
]
const colors = [
  { value: 'PI', label: 'Pink' },
  { value: 'HT', label: 'Hitam' },
  { value: 'MR', label: 'Maroon' },
  { value: 'ME', label: 'Merah' },
  { value: 'PB', label: 'Putih Bersih' },
  { value: 'PT', label: 'Putih Tulang' },
  { value: 'HJ', label: 'Hijau' },
].sort((a, b) => a.label.localeCompare(b.label));
const sizes = [
  '02', '04', '06', '08', '10', '12', '14', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'
]
const sortOptions = [
  { value: '', label: 'Paling Sesuai' },
  { value: '3', label: 'Rilis: Baru ke Lama' },
  { value: '4', label: 'Rilis: Lama ke Baru' },
  { value: '1', label: 'Harga: Rendah ke Tinggi' },
  { value: '2', label: 'Harga: Tinggi ke Rendah' },
];

const min = 0;
const max = 500000;
const step = 10000;

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
  const [searchColor, setSerachColor] = useState('');
  const [filterActive, setFilterActive] = useState(0);
  const [chooseFilter, setChooseFilter] = useState(null);
  const [filter, setFilter] = useState({
    harga: [100000,400000],
    warna: colors.map((color) => ({...color, ['checked']: false})),
    ukuran: sizes.map(item => Object.assign({}, {value: item, label: item, checked: false}))
  });
  const [filterControl, setFilterControl] = useState({
    sortBy: sortOptions[0].value
  });
  const filterRefs = useRef([]);

  const filteredColors = filter.warna.filter(
    color => color.label.toLowerCase().includes(searchColor.toLowerCase())
  );

  const handleClickButtonFilter = (index) => {
    if (index === filterActive) {
      setFilterActive(0);
    } else {
      setFilterActive(index);
    }
  }
  const handleClickColorFilter = (value, checked) => {
    setFilter({...filter, ['warna']: filter.warna.map(
      (o) => {
        if(o.value == value) {
          return ({...o, ['checked']: !checked})
        } else {
          return ({...o});
        }
      }
    )})
  }
  const handleClickSortBy = (sortCode) => {
    setFilterControl({...filterControl, ['sortBy']: sortCode});
    setFilterActive(0);
  }
  useEffect(() => {
    function handleClick(event) {
      if (filterRefs.current[filterActive - 1] && !filterRefs.current[filterActive - 1].contains(event.target)) {
        setFilterActive(0);
      }
    }
    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  });
  return (
    <>
      <header>
        <Navbar navigationMenu={navigationMenu}></Navbar>
        <BannerCarousel></BannerCarousel>
      </header>
      <section className='container-fluid vh-100'>
        <nav className='filter'>
          <div className="filter__wrapper--mobile">
            <button onClick={() => setChooseFilter('panel')} className='filter__button fw-bold text-start align-items-center btn w-100'>Terapkan Filter<span>+</span></button>
            <div className='border-end my-n1 mx-1 border-dark' />
            <button onClick={() => setChooseFilter('control')} className='filter__button fw-bold text-start align-items-center btn w-100'>Urutkan Berdasarkan<span>+</span></button>
          </div>
          <div className={`filter__wrapper ${chooseFilter ? 'active' : ''}`}>
            <div className={`filter__panel ${chooseFilter === 'panel' ? 'active' : ''}`}>
              <div className='filter__header p-3 border-bottom text-uppercase lh-1 sticky-top top-0 bg-white d-flex align-items-center justify-content-between d-lg-none'><span>Terapkan Filter</span><button onClick={() => setChooseFilter(null)} className='btn p-0'><i className="fs-5 bi bi-x-lg"></i></button></div>
              <div ref={(el) => filterRefs.current[0] = el} className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(1)} className={`filter__button btn ${filterActive === 1 ? 'active' : ''}`}>
                  <div>
                    Harga
                    <small className='filter__status--mobile'>
                      Rp{filter.harga[0].toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} − Rp{filter.harga[1].toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </small>
                  </div><span>{filterActive === 1 ? '−' : '+'}</span>
                </button>
                <div className="filter__options">
                  <div className="filter__options-container">
                    <div className="d-flex w-100 gap-1 justify-content-center">
                      <span>Rp{filter.harga[0].toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} − Rp{filter.harga[1].toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    </div>
                    <Range
                      values={filter.harga}
                      step={step}
                      min={min}
                      max={max}
                      onChange={(values) => {
                        setFilter({...filter, ['harga']: values});
                      }}
                      renderTrack={({ props, children }) => (
                        <div style={{
                          height: '2rem',
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
                                values: filter.harga,
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
                            height: "1.25rem",
                            width: "1.25rem",
                            border: '2px solid var(--bs-dark)',
                            borderRadius: "1rem",
                            backgroundColor: "white"
                          }}
                        ></div>
                      )}
                    ></Range>
                  </div>
                </div>
              </div>
              <div ref={(el) => filterRefs.current[1] = el} className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(2)} className={`filter__button btn ${filterActive === 2 ? 'active' : ''}`}>
                  <div>
                    Warna
                    <small className='filter__status--mobile'>
                      {filter.warna.filter(o => o.checked).map(o => o.label).join(', ')}
                    </small>
                  </div>
                  <span>{filterActive === 2 ? '−' : '+'}</span>
                </button>
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
                        <li key={color.value} className='d-flex gap-2 w-100'>
                          <input type="checkbox" checked={color.checked} onChange={() => handleClickColorFilter(color.value, color.checked)} className='border border-dark form-check-input rounded-0 m-0 prevent-select' style={{ width: '1.5rem', height: '1.5rem' }} id={color.value} />
                          <label className='w-100 cursor-pointer' htmlFor={color.value}>{color.label}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div ref={(el) => filterRefs.current[2] = el} className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(3)} className={`filter__button btn ${filterActive === 3 ? 'active' : ''}`}>
                  <div>
                    Ukuran
                    <small className='filter__status--mobile'>asdasd</small>
                  </div>
                  <span>{filterActive === 3 ? '−' : '+'}</span>
                </button>
                <div className="filter__options">
                  <div className="filter__options-container">
                    <div className="flex-grow-1 gap-2 overflow-auto d-grid grid-cols-4 grid-lg-cols-3">
                      {filter.ukuran.map((size) => (
                        <div key={size.value} className="form-group d-inline-block m-0 form-check-bg">
                          <input type="checkbox" checked={size.checked} className="form-check-bg-input" id={size.value} autoComplete="false" />
                          <label className="form-check-label text-center w-100 prevent-select rounded-0 border-dark" htmlFor={size.value}>{size.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`filter__controls ${chooseFilter === 'control' ? 'active' : ''}`}>
              <div className='filter__header p-3 border-bottom text-uppercase lh-1 sticky-top top-0 bg-white d-flex align-items-center justify-content-between d-lg-none'>
                <span>Urutkan Berdasarkan</span>
                <button onClick={() => setChooseFilter(null)} className='btn p-0'>
                  <i className="fs-5 bi bi-x-lg"></i>
                </button>
              </div>
              <div ref={(el) => filterRefs.current[3] = el} className="filter__controls-item">
                <button onClick={() => handleClickButtonFilter(4)} className={`filter__button filter__button-sort btn ${filterActive === 4 ? 'active' : ''}`}>{sortOptions.find((option) => option.value === filterControl.sortBy).label}<span>{filterActive === 4 ? '−' : '+'}</span></button>
                <div className="filter__options filter__options--right">
                  <div className="filter__options-container">
                    <ul className="list-unstyled d-flex flex-column gap-lg-3 mb-0 m-n3 mx-lg-n3 my-lg-0">
                      {sortOptions.map((option) => (
                        <li key={option.label} onClick={() => handleClickSortBy(option.value)} className={`cursor-pointer text-lg- px-3 py-3 py-lg-0 lh-1 border-light border-bottom border-lg-0 ${option.value === filterControl.sortBy ? 'fw-bold' : ''}`}>{option.label}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
