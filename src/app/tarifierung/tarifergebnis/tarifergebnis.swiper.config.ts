import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  setWrapperSize: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      slidesPerView: 3,
      allowTouchMove: false
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  observer: true,
  watchOverflow: true
};
