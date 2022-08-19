import { fetchImages } from './js/fetchImg';
import { renderGallery } from './js/renderGallery';
import { imgIsFind, imgNotFind, reachEndOfResults } from './js/notify';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

loadMoreBtnHidden();

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

refs.searchForm.addEventListener('submit', onFormSubmitClick);
refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick);

async function onFormSubmitClick(ev) {
  ev.preventDefault();
  page = 1;
  query = ev.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  loadMoreBtnHidden();

  if (query === '') {
    return imgNotFind();
  }

  try {
    const imgArr = await fetchImages(query, page, perPage);
    console.log('imgArr:', imgArr);

    if (imgArr.data.totalHits === 0) {
      loadMoreBtnHidden();
      return imgNotFind();
    }

    const imagesList = await renderGallery(imgArr.data.hits);
    console.log('imagesList:', imagesList);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    imgIsFind();

    if (imgArr.data.totalHits > perPage) {
      loadMoreBtnShow();
    }
  } catch (error) {
    console.log('error:', error);
  }
}

async function onloadMoreBtnClick() {
  page += 1;
  simpleLightBox.destroy();

  try {
    const imgArr = await fetchImages(query, page, perPage);
    const imagesList = await renderGallery(imgArr.data.hits);
    console.log('imagesList:', imagesList);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    const totalPages = Math.ceil(imgArr.data.totalHits / perPage);

    if (page === totalPages) {
      loadMoreBtnHidden();
      return reachEndOfResults();
    }
  } catch (error) {
    console.log('error:', error);
  }
}

function loadMoreBtnShow() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function loadMoreBtnHidden() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
