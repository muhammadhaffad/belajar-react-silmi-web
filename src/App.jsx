import './styles/theme.bundle.css';
import './styles/global.css';
import Navbar from '@component/Navbar/Navbar';
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
const BannerSlider = () => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <img src={sliderImages[index]} alt="" width={'100%'} />
      <div className="d-flex w-100 justify-content-between">
        <button onClick={() => setIndex((index + sliderImages.length - 1) % sliderImages.length)}>Prev</button>
        <button onClick={() => setIndex((index + 1) % sliderImages.length)}>Next</button>
      </div>
    </div>
  )
}
function App() {

  return (
    <>
      <header>
        <Navbar navigationMenu={navigationMenu}></Navbar>
        <BannerSlider></BannerSlider>
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
