import './css/styles.css';
import { fetchImages } from './js/fetchImg';
import { renderGallery } from './js/renderGallery';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

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
  refs.loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  try {
    const imgArr = await fetchImages(query, page, perPage);
    console.log('imgArr:', imgArr);

    if (imgArr.data.totalHits === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const imagesList = await renderGallery(imgArr.data.hits);
    console.log('imagesList:', imagesList);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    return Notify.success('Hooray! We found totalHits images.');

    if (imgArr.data.totalHits > perPage) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log('error:', error);
  }
}

function onloadMoreBtnClick() {}
