export default function createPhotosMurkup(photo) {
  return photo
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
  <a class="gallery__item" href="${largeImageURL}"><div class="gallery__item-wrapper">
  <img src="${webformatURL}" width=100 alt="${tags}" loading="lazy"  class="gallery__image" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-value">${views}</span>
    </p>
    <p class="info-item">
       <b>Comments</b><span class="info-value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-value">${downloads}</span>
    </p>
  </div>
</div></a>

`;
    })
    .join('');
}
