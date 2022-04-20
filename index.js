
import { podcasts } from './data/podcasts.js'
import { broadcasts } from './data/broadcasts.js'
import { guests } from './data/guests.js'
import { playlists } from './data/playlists.js'


function setImgSrc(array, cardType) {
  array.forEach((item) => {
    if (cardType == 'guests' && !item.imgName.length) {
      item.imgName = 'no-guest-photo';
      item.imgTypes = 'jpg';
    };
    if (item.imgName && item.imgName.length) {
      let imgSrc = "img/";
      let imgTypes = [
        {
          name: "-1x.jpg",
          type: "jpg_url",
        },
        {
          name: "-2x.jpg",
          type: "jpg_url_2x",
        },
      ];
      if (item.imgTypes) {
        if (item.imgTypes.includes("webp")) {
          imgTypes.push(
            {
              name: "-1x.webp",
              type: "webp_url",
            },
            {
              name: "-2x.webp",
              type: "webp_url_2x",
            }
          );
        }
        if (item.imgTypes.includes("mobile")) {
          imgTypes.push({
            name: "-small.jpg",
            type: "jpg_url_small",
          });
        }
        imgTypes.forEach((img) => {
          item[img.type] = `${imgSrc}${item.imgName}${img.name}`;
        });
      }
    } else {
      
    }
  });
}

function createPlayer(count, iterator) {
  let player = document.querySelector("#player");
  let wrap = document.querySelector(".podcasts__players-wrap");
  for (let i = iterator; i < count + iterator; i++) {
    if (i == podcasts.length) {
      let showMoreButton = document.querySelector(".podcasts__more-btn");
      showMoreButton.parentNode.removeChild(showMoreButton);
      break;
    }
    const podcast = podcasts[i];
    let newPlayer = player.content.cloneNode(true);
    newPlayer.querySelector("#player__duration").innerText = podcast.duration;
    newPlayer.querySelector("#player__header").innerText = podcast.name;
    newPlayer.querySelector("#player__author").innerText = podcast.author;
    newPlayer.querySelector("#player__date").innerText = podcast.date;
    newPlayer.querySelector("#player__actions-play-btn").lastChild.nodeValue =
      podcast.played;
    newPlayer.querySelector("#player__actions-like-btn").lastChild.nodeValue =
      podcast.likes;
    newPlayer.querySelector("#player__actions-share-btn").lastChild.nodeValue =
      podcast.shares;
    newPlayer.querySelector("#player__img-fallback").src = podcast.jpg_url;
    newPlayer.querySelector("#player__img-fallback").srcset =
      podcast.jpg_url_2x;
    newPlayer.querySelector("#player__img-fallback").alt = `Обложка подкаста ${podcast.name}`
    newPlayer.querySelector("#player__img-mobile").srcset =
      podcast.jpg_url_small;
    newPlayer.querySelector(
      "#player__img-webp"
    ).srcset = `${podcast.webp_url}, ${podcast.webp_url_2x}`;
    console.log(newPlayer);

    wrap.appendChild(newPlayer);
  }
}

function addPodcasts() {
  let players = document.querySelectorAll(".player");
  createPlayer(4, players.length);
}

function showMorePodcasts() {
  let showMoreButton = document.querySelector(".podcasts__more-btn");
  showMoreButton.addEventListener("click", addPodcasts);
}

function choisesAddSelect(select) {
  const element = document.querySelector(select);
  const choices = new Choices(element, {
    searchEnabled: false,
    searchChoices: false,
    shouldSort: false,
    placeholder: true,
    itemSelectText: "",
    allowHTML: true,
  });
}

function createBroadcast(count, iterator) {
  let broadcastTemplate = document.querySelector("#broadcast__template");
  let wrap = document.querySelector(".broadcast__cards");
  for (let i = iterator; i < count + iterator; i++) {
    const broadcast = broadcasts[i];
    let newBroadcast = broadcastTemplate.content.cloneNode(true);
    newBroadcast.querySelector(".broadcast-card__header").innerText =
      broadcast.name;
    newBroadcast.querySelector(".broadcast-card__schedule").innerText =
      broadcast.schedule;
    newBroadcast.querySelector(".broadcast-card__details").href =
      broadcast.link;
    newBroadcast.querySelector("#broadcast__cover__img").src =
      broadcast.jpg_url;
    newBroadcast.querySelector("#broadcast__cover__img").srcset =
      broadcast.jpg_url_2x;
    wrap.appendChild(newBroadcast);
  }
}

function fillAccordion() {
  let accordion = document.querySelector("#accordion");
  let accordionHeaders = accordion.querySelectorAll("h3");
  accordionHeaders.forEach((header) => {
    let contentBox = header.nextElementSibling;
    let list = document.createElement("ul");
    for (let guest of guests) {
      if (guest.occupation == header.id) {
        list.classList.add("accordion__list");
        list.classList.add("list");
        let listItem = document.createElement("li");
        listItem.classList.add("accordion__item");
        let itemLink = document.createElement("a");
        itemLink.classList.add("accordion__link");
        itemLink.classList.add("link");
        itemLink.href = "#guest-card";
        itemLink.innerText = guest.name;
        if (guest.selected) {
          listItem.classList.add('is-selected')
        }
        listItem.appendChild(itemLink);
        list.appendChild(listItem);
      }
    }
    if (!contentBox) {
      return
    } 
    contentBox.appendChild(list);
  });
}

function createPlaylists(count, iterator) {
  let playlistsTemplate = document.querySelector("#playlists__template");
  let wrap = document.querySelector(".playlists__cards");
  for (let i = iterator; i < count + iterator; i++) {
    const playlist = playlists[i];
    let newPlaylist = playlistsTemplate.content.cloneNode(true);
    newPlaylist.querySelector(".playlist-card__name").innerText = playlist.name;
    newPlaylist.querySelector(".playlist-card__desc").innerText = playlist.desc;
    let countryClassList = `country-flag-${playlist.country}`
    newPlaylist.querySelector(".playlist-card__country-flag").classList.add(countryClassList)
    newPlaylist.querySelector(
      "#playlist-card__webp"
    ).srcset = `${playlist.webp_url}, ${playlist.webp_url_2x}`;
    newPlaylist.querySelector("#playlist-card__img-fallback").src = playlist.jpg_url;
    newPlaylist.querySelector("#playlist-card__img-fallback").srcset =
      playlist.jpg_url_2x;
      wrap.appendChild(newPlaylist);
  }
}

function formValidation() {
  let aboutForm = document.getElementById('about-form');
  aboutForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  })
}

function accordionInteractivity() {
  let items = document.querySelectorAll('.accordion__item');
  items.forEach(item => item.addEventListener('click', (ev) => {
    if (window.innerWidth > 468) {
      ev.preventDefault();
      toggleCard(ev);
    } else {
      toggleCard(ev);
    }
  }))
}

function toggleCard(ev) {
  let items = document.querySelectorAll('.accordion__item');
  let card = document.querySelector('.guest-card')
  let name = ev.target.innerText;
  items.forEach(item => {
    item.classList.remove('is-selected')
  })
  ev.target.parentNode.classList.add('is-selected')
  let currentCardDataObj = guests.filter(guest => guest.name == name);
  let cardDataObj = currentCardDataObj[0];
  let webpNode = card.querySelector('#guest-card___img-webp');
  let imgNode = card.querySelector('#guest-card___img-fallback');
  if (cardDataObj.webp_url) {
    if (webpNode) {
      webpNode.srcset = `${cardDataObj.webp_url}, ${cardDataObj.webp_url_2x}`;
    } else {
      let newWebpNode = document.createElement('source');
      newWebpNode.id = 'guest-card___img-webp';
      newWebpNode.srcset = `${cardDataObj.webp_url}, ${cardDataObj.webp_url_2x}`;
      newWebpNode.type = 'image/webp';
      let pictureTag = document.querySelector('.guest-card__picture');
      pictureTag.append(newWebpNode);
    }
  } else {
    if (webpNode) {
      webpNode.parentNode.removeChild(webpNode);
    }
  }
  imgNode.src = cardDataObj.jpg_url;
  imgNode.srcset = cardDataObj.jpg_url_2x;
  imgNode.alt = `На фото ${cardDataObj.name}`;
  card.querySelector('.guest-card__socials-inst').href = cardDataObj.socials.instagram;
  card.querySelector('.guest-card__socials-fb').href = cardDataObj.socials.facebook;
  card.querySelector('.guest-card__socials-twitter').href = cardDataObj.socials.twitter;
  card.querySelector('.guest-card__name').innerText = cardDataObj.name;
  card.querySelector('.guest-card__desc').innerText = cardDataObj.legend;
}

function addBroadcastHover() {
  let items = document.querySelectorAll('.broadcast-card__details')
  items.forEach(item => {
    item.addEventListener('focus', (ev) => {
      item.parentNode.parentNode.classList.add('card-is-focused');
    })
  })
  items.forEach(item => {
    item.addEventListener('blur', (ev) => {
      item.parentNode.parentNode.classList.remove('card-is-focused');
    })
  })
}

function setBtnWidth() {
  let playlistBtns = document.querySelectorAll('.playlists-button')
  playlistBtns.forEach(btn => {
    if (btn.innerText.length > 10) {
      btn.style.width = '256px'
      btn.style.minWidth = '256px'
    } else {
      btn.style.width = '113px'
      btn.style.minWidth = '113px'
    }
  })
}

function toggleBroadcastLive() {
  let headerBottom = document.querySelector('.header__bottom');
  let headerContainer = document.querySelector('.header__container');
  let container = headerContainer.parentElement
  let players = document.querySelector('.header__players');
  let btn = document.querySelector('.header__now-live');
  let ageWarning = document.querySelector('.header__age-warning-wrap')
  if (window.innerWidth <= 468) {
    headerBottom.appendChild(players);
    container.style.display = 'none'
  } else {
    headerContainer.insertBefore(players, ageWarning);
    container.style.display = 'block'
  }
  btn.addEventListener('click', showBroacastLive);

}

function showBroacastLive() {
  let players = document.querySelector('.header__players');
  let btn = document.querySelector('.header__now-live');
  if (players.style.display == 'none' ) {
    players.style.display = 'flex'
    btn.classList.add('is-active')
  } else {
    players.style.display = 'none'
    btn.classList.remove('is-active')
  }
}

function init() {
  setImgSrc(podcasts, "podcasts");
  setImgSrc(broadcasts, "broadcasts");
  setImgSrc(playlists, "playlists");
  setImgSrc(guests, "guests");
  if (window.innerWidth <= 468) {
    createPlayer(4, 0);
  } else {
    createPlayer(8, 0);
  }
  createBroadcast(6, 0);
  showMorePodcasts();
  choisesAddSelect("#broadcast__select");
  fillAccordion();
  createPlaylists(12, 0);
  formValidation();
  accordionInteractivity();
  addBroadcastHover();
  setBtnWidth();
  toggleBroadcastLive();
}

init();

function callResize() {
  accordionInteractivity();
  toggleBroadcastLive();
}

let onResizeInit = function(){
  let timeOut1;
  clearTimeout(timeOut1);
  timeOut1 = setTimeout(callResize, 100);
};

window.addEventListener('resize', onResizeInit) 
