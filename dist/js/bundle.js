/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
        // calc

        const result = document.querySelector('.calculating__result span');

        let sex, height, weight, age, ratio;
    
        if(localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        function initLocalSettings(selector, activeClass) {
            const elements  = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
    
        }
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    
        function calcTotal() {
            if(!sex || !height || !weight || !age || !ratio) {
                result.textContent = '____';
                return;
            }
    
            if(sex == 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        function getStaticInformation (parentSelector, activeClass) {
            const elements = document.querySelectorAll(parentSelector);
    
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if(e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
    
                    }
    
                    elements.forEach(element => {
                        element.classList.remove(activeClass);
                    });
    
                    e.target.classList.add(activeClass);
    
                    calcTotal();
                });
    
                
    
            });
            
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
    
                if(input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
    
                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
    
                calcTotal();
            });
    
            
    
        }
    
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function cards() {
    class MenuCard {
        constructor(src, atl, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.atl = atl;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms(formSelector, modalSelector, modalDilogSelector, modalTimerId) {
        // Forms

        const form = document.querySelectorAll(formSelector);

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        form.forEach(item => {
            bindPostData(item, `${modalSelector}`);
        });
    
        function bindPostData(form, modalSelector) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);
    
                
    
                const formData = new FormData(form);
    
                // const object = {};
                // formData.forEach(function(value, key) {
                //     object[key] = value;
                // });
    
                const json = JSON.stringify(Object.fromEntries(formData.entries())); // элегантный способ
    
                (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success, modalSelector, modalDilogSelector);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure, modalSelector, modalDilogSelector);
                }).finally(() => {
                    form.reset();
                });
    
            });
        }
    
        function showThanksModal(message, modalSelector, modalDilogSelector) {
            const prevModalDialog = document.querySelector(modalDilogSelector);
    
            prevModalDialog.classList.add('hide');
            prevModalDialog.classList.remove('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalTimerId); // ???
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
    
            document.querySelector(modalSelector).append(thanksModal);
    
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
            }, 4000);
        }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(modalSelector, triggerSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal('.modal', modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if(slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
  }
  if(slides.length > 10) {
      total.textContent = slides.length;
      current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slides.forEach(slide => slide.style.width = width);

  slidesWrapper.style.overflow = 'hidden';

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for(let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-slide-to', i + 1);
      indicators.append(dot);
      if ( i == 0) {
          dot.style.opacity = '1';
      }
      dots.push(dot);
  }

  function correctCurrent(){
      if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }
  }

  function dotsOpicity(dots) {
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  }

  function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
      if(offset == deleteNotDigits(width) * (slides.length - 1)) {
          offset = 0;
      } else {
          offset += deleteNotDigits(width);
      }

      slidesField.style.transform = `translate(-${offset}px)`;

      if(slideIndex == slides.length) {
          slideIndex = 1;
      } else {
          slideIndex++;
      }

      if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }

      correctCurrent();

      dotsOpicity(dots);
  });

  prev.addEventListener('click', () => {
      if(offset == 0) {
          offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
          offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translate(-${offset}px)`;

      if(slideIndex == 1) {
          slideIndex = slides.length;
      } else {
          slideIndex--;
      }

      if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }

      correctCurrent();

      dotsOpicity(dots);
  });

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = deleteNotDigits(width) * (slideTo - 1);

          slidesField.style.transform = `translate(-${offset}px)`;

          correctCurrent();

          dotsOpicity(dots);
      });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelector, tabsContentSelector, tabsParentsSelector, activeClass) {
    // Tabs

    const tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentsSelector),
          tabs = tabsParent.querySelectorAll(tabsSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

        function getTimeRemaining(endtime) {
            let days, hours, minutes, seconds;
    
            const t = Date.parse(endtime) - Date.parse(new Date());
    
            if(t <= 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / (1000 * 60)) % 60),
                seconds = Math.floor((t / 1000) % 60);
            }
            return {
                total: t,
                days,
                hours,
                minutes,
                seconds
            };
        }
    
        function zero(num) {
            if(num > 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = zero(t.days);
                hours.innerHTML = zero(t.hours);
                minutes.innerHTML = zero(t.minutes);
                seconds.innerHTML = zero(t.seconds);
    
                if(t.total <= 0) {
                    clearInterval(timeInterval);
                }
    
            }
        }
    
        setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
    });
    

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");












window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', modalTimerId);
    }, 30000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', '.modal', '.modal__dialog', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', '[data-modal]', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023-09-11');

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map