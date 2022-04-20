function onResize() {
  resizePlaylists();
  resizeHeader();
  resizeBroadcasts();
}

function resizePlaylists() {
  const playlistCards = document.querySelector('.playlists__cards');
  const wrap = document.querySelector('.playlists__left-wrap');
  const lastElem = document.querySelector('.playlists__age-notice');
  const checkboxes = document.querySelector('.checkbox');
  if (playlistCards) {
    if (window.innerWidth <= 1024) {
      wrap.insertBefore(playlistCards, lastElem);
    } else {
      wrap.parentNode.insertBefore(playlistCards, null)
    }
  }
}

function resizeHeader() {
  const navlist = document.querySelector('.nav__list');
  const menuBtn = document.querySelector('.nav__button');
  // const loginBtn = document.querySelector('.header__log-in-btn')
  if (window.innerWidth <= 768) {
    navlist.style.display = 'none'
  }
  if (window.innerWidth > 768 || menuBtn.getAttribute('aria-expanded') == 'true') {
    navlist.style.display = 'flex'
  }
}

function resizeBroadcasts() {
  const broadcastWrap = document.querySelector('.broadcast__wrap');
  const cards = document.querySelector('.broadcast__cards');
  const broadcastFooter = document.querySelector('.broadcast__archive');
  const broadcast = document.querySelector('.broadcast')
  const broadcastContainer = document.querySelector('.broadcast__container')
  if (cards) {
    if (window.innerWidth <= 768) {
      if (cards.parentElement == broadcastContainer) {
        broadcastWrap.insertBefore(cards, broadcastFooter);
        broadcast.insertBefore(broadcastFooter, null)
      }
    } else {
      broadcastContainer.insertBefore(cards, null)
      broadcastWrap.insertBefore(broadcastFooter, null)

    }
  }
}



window.onresize = function(){
  let timeOut;
  clearTimeout(timeOut);
  timeOut = setTimeout(onResize, 100);
};

onResize()