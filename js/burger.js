function initBurger() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.nav__button');
    const sideBar = document.querySelector('.nav');
    const menuIcon =  document.querySelector('.nav__icon');
    const navLinkItems = document.querySelectorAll('.nav__link');
    const navlist = document.querySelector('.nav__list');
    const navWrap = document.querySelector('.nav__wrap');
    const subNavContainer = document.querySelector('.header__container').parentElement;
    const subNav = document.querySelector('.header__container');
  
    if (window.innerWidth <= 768) {
      navLinkItems.forEach((navLink) => {
        navLink.setAttribute('tabindex', -1);
      })
    }
  
    
    menuBtn.addEventListener('click', setBurger);
  
    function setBurger() {
      sideBar.classList.toggle('nav__open');
      menuIcon.classList.toggle('nav__button_open')
      let expanded = menuBtn.getAttribute('aria-expanded') == 'true';
      menuBtn.setAttribute('aria-expanded', !expanded);
      if (expanded) {
        navlist.style.display = 'none'
        if (window.innerWidth <= 468) {
          subNavContainer.style.display = 'none'
          subNav.style.display = 'none'
        }
        navWrap.classList.remove('nav__wrap-open')
        navLinkItems.forEach((navLink) => {
          navLink.setAttribute('tabindex', -1);
        })
      } else {
        navlist.style.display = 'flex'
        if (window.innerWidth > 468) {
  
        } else {
          subNav.style.display = 'flex'
          subNavContainer.style.display = 'flex'
        }
        navWrap.classList.add('nav__wrap-open')
        navLinkItems.forEach((navLink) => {
          navLink.setAttribute('tabindex', 0);
        })
      }
    }
  })
}

initBurger();

onResizeFunc = function(){
  let timeOut;
  clearTimeout(timeOut);
  timeOut = setTimeout(initBurger, 100);
};

window.addEventListener('resize', onResizeFunc) 


