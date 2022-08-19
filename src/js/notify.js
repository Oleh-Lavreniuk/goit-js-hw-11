export { imgIsFind, imgNotFind, reachEndOfResults };

import { Notify } from 'notiflix/build/notiflix-notify-aio';

function imgIsFind() {
  Notify.success('Hooray! We found totalHits images.');
}

function imgNotFind() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function reachEndOfResults() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
}
