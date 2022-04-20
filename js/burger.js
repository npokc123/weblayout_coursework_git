const menuBtn = document.querySelector('.nav__button');
const sideBar = document.querySelector('.nav');
const menuIcon =  document.querySelector('.nav__icon');
const navLinkItems = document.querySelectorAll('.nav__link');
const navlist = document.querySelector('.nav__list');
const navWrap = document.querySelector('.nav__wrap');
const subNavContainer = document.querySelector('.header__container').parentElement;
const subNav = document.querySelector('.header__container');

function initBurger() {
    if (window.innerWidth <= 768) {
      navLinkItems.forEach((navLink) => {
        navLink.setAttribute('tabindex', -1);
      })
    }
    if (window.innerWidth > 468) {
      console.log('window.innerWidth > 468');
      subNav.style.display = 'flex'
      subNavContainer.style.display = 'flex'
    }
    if (window.innerWidth <= 468 && menuBtn.getAttribute('aria-expanded') == 'true') {
      console.log('1111111');
      console.log(menuBtn.getAttribute('aria-expanded') == 'true');
      subNav.style.display = 'flex'
      subNavContainer.style.display = 'flex'
    }
}
menuBtn.addEventListener('click', setBurger);
initBurger();

function setBurger() {
  sideBar.classList.toggle('nav__open');
  menuIcon.classList.toggle('nav__button_open')
  let expanded = menuBtn.getAttribute('aria-expanded') == 'true';
  let isopen = !expanded
  if (isopen) {
    navWrap.classList.add('nav__wrap-open')
    navLinkItems.forEach((navLink) => {
      navLink.setAttribute('tabindex', 0);
    })
    navlist.style.display = 'flex'
    if (window.innerWidth <= 468) {
      subNav.style.display = 'flex'
      subNavContainer.style.display = 'flex'
    }
  } else {
    navlist.style.display = 'none'
    navWrap.classList.remove('nav__wrap-open')
    navLinkItems.forEach((navLink) => {
      navLink.setAttribute('tabindex', -1);
    })
    if (window.innerWidth <= 468) {
      subNav.style.display = 'none'
      subNavContainer.style.display = 'none'
    } 
  }
  menuBtn.setAttribute('aria-expanded', !expanded);
}

let onResizeFunc = function(){
  console.log('kkkkk');
  let timeOut;
  clearTimeout(timeOut);
  timeOut = setTimeout(initBurger, 100);
};

window.addEventListener('resize', onResizeFunc) 


