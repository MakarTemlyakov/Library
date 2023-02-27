import React, { useState } from 'react';
import { FreeMode, Mousewheel, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import noImg from '../../assets/img/no-image.svg';

import styles from './slider.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';

export const Slider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <React.Fragment>
      <Swiper
        data-test-id='slide-big'
        navigation={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Navigation, Thumbs, Pagination, FreeMode]}
        className='bigSwiper'
        grabCursor={true}
        spaceBetween={20}
        breakpoints={{
          320: {
            pagination: {
              el: '.pagination',
              type: 'bullets',
              clickable: true,
            },
          },
        }}
      >
        {images?.length > 0 ? (
          images.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={`https://strapi.cleverland.by${slide.url}`} alt='' />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={noImg} alt='' width={56} height={56} className={styles.noImg} />
          </SwiperSlide>
        )}
      </Swiper>
      <div className='pagination' />
      {images?.length > 1 && (
        <Swiper
          slidesPerView={5}
          spaceBetween={40}
          mousewheel={true}
          scrollbar={{ draggable: true, dragSize: 190 }}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress={true}
          loop={true}
          freeMode={true}
          modules={[FreeMode, Mousewheel, Scrollbar]}
          className='mini-slider'
          direction='horizontal'
        >
          {images.map((slide) => (
            <SwiperSlide key={slide.id} data-test-id='slide-mini'>
              <img src={`https://strapi.cleverland.by${slide.url}`} alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </React.Fragment>
  );
};
