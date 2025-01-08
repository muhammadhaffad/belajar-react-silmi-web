import './styles/theme.bundle.css';
import './styles/global.css';
import Navbar from '@component/Navbar/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  return (
    <>
      <header>
        <Navbar navigationMenu={navigationMenu}></Navbar>
        <BannerCarousel></BannerCarousel>
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
