const selector = document.querySelector("input[type='tel']");
if (selector) {
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);
  new JustValidate(".form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
      },
    },
    messages: {
      name: {
        required: "Вы не ввели имя",
        minLength: "Минимум 2 символа",
        maxLength: "Максимально 10 символов",
      },
      tel: {
        required: "Вы не ввели телефон",
        function: "Неверный номер",
      },
    },
  });
}

let checkClassSwiper = document.querySelector('.swiper');
if (checkClassSwiper) {
  document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {

      observer: true,
      observeParents: true,

      lazy: {
        loadOnTransitionStart: false,
        loadPrevNext: false,
      },

      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      
      navigation: {
        nextEl: '.button__next',
        prevEl: '.button__prev',
      },
      
      grabCursor: true,
      
      keyboard: {
        enabled: true,
        onlyViewport: true,
        pageUpDown: true,
      },
      
      mousewheel: {
        sensitivity: 1,
        eventsTarget: ".swiper-slide"
      },
      
      watchOverflow: false,
      
      preloadImages: false,
  
      lazy: {
        loadOnTransitionStart: false,
        loadPrevNext: false,
      },
      
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
  
      loop: true,
      
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15,
        },
        540: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 15,
        },
        860: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 15,
        },
        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 15,
        },
        1450: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 15,
        },
      },

      autoplay: {
        delay: 1000,
        disableOnInteraction: true,
      },

      speed: 800,
    });
  });
};


const answers_list = document.querySelectorAll(".item__block");
const background_active = "linear-gradient(180deg, #969AF7 0%, #686EEC 100%)";
const background = "linear-gradient(rgb(255, 255, 255) 50.57%, rgb(189, 192, 255) 100%)";
let flag = true;
answers_list.forEach(el => {
  el.addEventListener('click', function () {
    icon_close = el.childNodes[3].childNodes[1].childNodes[3].childNodes[3]
    icon_open = el.childNodes[3].childNodes[1].childNodes[3].childNodes[1]
    svg_circle = el.childNodes[3].childNodes[1].childNodes[1];
    item_descr = el.nextElementSibling;

    if (flag) {
      el.style.background = background_active;
      icon_close.style.display = "block";
      icon_open.style.display = "none";
      svg_circle.style.fill = "white";
      item_descr.style.display = "block"
    } else {
      el.style.background = background;
      icon_close.style.display = "none";
      icon_open.style.display = "block";
      svg_circle.style.fill = "#757AEF";
      item_descr.style.display = "none"
    }
    flag = !flag;
  })
})


const header_top = document.querySelector(".header__top");
if (header_top) {
  let debounceTimer;
  window.addEventListener('scroll', function () {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        header_top.classList.add("header__top-scroll");
      } else {
        header_top.classList.remove("header__top-scroll");
      }
    }, 30);
  });
};










