export { renderGallery };

const gallery = document.querySelector('.gallery');

const renderGallery = images => {
  const markup = images
    .map(image => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="photo-card" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes.toLocaleString()}</p>
              <p class="info-item"><b>Views</b>${views.toLocaleString()}</p>
              <p class="info-item"><b>Comments</b>${comments.toLocaleString()}</p>
              <p class="info-item"><b>Downloads</b>${downloads.toLocaleString()}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
};
