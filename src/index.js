import { fetchImages } from './fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const inputValue = 'cat';
// const pageNr = 1;

// fetchImages(inputValue, pageNr)
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

const input = document.querySelector('.input');
const btnSearch = document.querySelector('.button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';
let page = 1;

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  if (input.value !== '') {
    fetchImages(input.value, page).then(searchData => {
      if (searchData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        createCards(searchData.hits);
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

function createCards(imgs) {
  console.log(imgs);
    const markup = imgs
      .map(img => {
        return `<a class="gallery__link" href="${img.largeImageURL}">
        <div class="gallery-item">
          <img class="gallery-item__img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes: </b>${img.likes}
            </p>
            <p class="info-item">
              <b>Views: </b>${img.views}
            </p>
            <p class="info-item">
              <b>Comments: </b>${img.comments}
            </p>
            <p class="info-item">
              <b>Downloads: </b>${img.downloads}
            </p>
          </div>
        </div>
      </a>`;
      })
      .join('');
    gallery.innerHTML += markup;
}

btnLoadMore.addEventListener('click', () => {
    page += 1;
    btnLoadMore.style.display = 'none';
    fetchImages(input.value, page).then(searchData => {
        if (searchData.hits.length === 0) {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        } else {
            createCards(searchData.hits);
            btnLoadMore.style.display = 'block';
        }
    })
})



function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}
