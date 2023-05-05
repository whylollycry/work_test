/*Дропдаун*/

const btns = document.querySelectorAll(".menu-btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function() {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
})

/*Бургер*/

let burger = document.querySelector('.burger');
let menu = document.querySelector('.burger-menu');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',function() {

    burger.classList.toggle('burger--active');
    menu.classList.toggle('burger-menu--active');

})

menuLinks.forEach(function(el) {
    el.addEventListener('click', function() {

    burger.classList.remove('burger--active');
    menu.classList.remove('burger-menu--active');

    })
})

/*Поле поиска*/

document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('search-open').addEventListener('click', (e) => {
    document.getElementById('search').classList.add('open')
    document.getElementById('search-open').classList.add('active')
    document.querySelector('.search-input').focus();
  })

  document.getElementById('search-close').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('search').classList.remove('open')
    document.getElementById('search-open').classList.remove('active')
  })
})


/*Слайдер Hero*/
const swiper1 = new Swiper('.hero__swiper', {
	slidesPerView: 1,
	slidesPerGroup: 1,
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

/*Селект Gallery*/
const element = document.querySelector('.select');
const choices = new Choices(element, {
	searchEnabled: false,
	itemSelectText: '',
	shouldSort: false,
	position: 'bottom'
});


/*Слайдер Gallery*/
const swiper2 = new Swiper('.gallery__swiper', {
	slidesPerView: 3,
  spaceBetween: 50,
	slidesPerGroup: 3,
  loop: true,
  navigation: {
    nextEl: '.gallery__swiper-button-next',
    prevEl: '.gallery__swiper-button-prev',
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    576: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    }
  }
});



/*Модальное окно*/
document.getElementById("btn-modal-open").addEventListener("click", function() {
  document.getElementById("modal-win").classList.add("open")
})

document.getElementById("btn-modal-close").addEventListener("click", function() {
  document.getElementById("modal-win").classList.remove ("open")
})

/*Аккордеон*/
new Accordion('.accordion-list', {
	elementClass: 'accordion',
	triggerClass: 'accordion__control',
	panelClass: 'accordion__content',
	activeClass: 'accordion--active'
});

/*Табы*/
const tabsBtn = document.querySelectorAll(".ac-btn");
const tabsItems = document.querySelectorAll(".tab-content");

tabsBtn.forEach(function(item) {
  item.addEventListener("click", function() {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if( ! currentBtn.classList.contains('active')) {
      tabsBtn.forEach(function(item) {
        item.classList.remove('active');
      });

      tabsItems.forEach(function(item) {
        item.classList.remove('active');
      })

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    }

  });

});

document.querySelector('.ac-btn').click();

/*Слайдер Events*/
const swiper3 = new Swiper('.events__swiper', {
	slidesPerView: 3,
  spaceBetween: 50,
	slidesPerGroup: 1,
  loop: false,
  navigation: {
    nextEl: '.events__swiper-button-next',
    prevEl: '.events__swiper-button-prev',
  },
  pagination: {
    el: '.events__swiper-pagination',
    type: 'bullets',
		clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    576: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    866: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 3,
    },
    1200: {
      slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 1,
    }
  }
});

/*Слайдер Projects*/
const swiper4 = new Swiper('.projects__swiper', {
	slidesPerView: 3,
  spaceBetween: 50,
	slidesPerGroup: 3,
  loop: false,
  navigation: {
    nextEl: '.projects__swiper-button-next',
    prevEl: '.projects__swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    576: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 50,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    }
  }
});

 /*Тултип*/

 tippy('#popper', {
  content: 'Пример современных тенденций — современная методология разработки',
  delay: [500, 500]
});

tippy('#popper2', {
  content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  delay: [500, 500]
});

tippy('#popper3', {
  content: 'В стремлении повысить качество',
  delay: [500, 500]
});

/*Инпут Контакты*/

document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.contacts__form',{
    errorLabelStyle: {
      color: '#D11616'
    }
  });
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  validation
    .addField('.contacts__name', [{
        rule: 'required',
        errorMessage: "Введите имя"
      },
      {
        rule: 'customRegexp',
        value: /[a-z,а-я]/gi,
        errorMessage: "Недопустимый формат"
      },

    ])
    .addField('.contacts__tel', [{
      rule: "function",
      validator: function (name, value) {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10
      },
      errorMessage: 'Вы не ввели телефон',
    }])
})

/*Карта*/
ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.758468, 37.601088],
            zoom: 14,
            controls: ['zoomControl', 'geolocationControl']

        }, {

          zoomControlPosition: { right: 10, top: 275 },
          zoomControlSize: 'small',
          geolocationControlPosition: { right: 10, top: 360 }
        });

        var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
          iconLayout: 'default#image',
          iconImageHref: './img/map-point.svg',
          iconImageSize: [20, 20],
          iconImageOffset: [-3, -42]
        });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
      }
