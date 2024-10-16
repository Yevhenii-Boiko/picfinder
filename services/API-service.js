const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '33163433-7381312326b7cb4a7310bb1a7';
// let page = 1;
// const imagesPerPage = 9;
// const searchQuery = '';

export function getImages(searchQuery, page, imagesPerPage) {
  const params = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(
    `${BASE_URL}/?${params}&page=${page}&per_page=${imagesPerPage}&key=${API_KEY}&q=${searchQuery}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // page += 1;
    // console.log('page in API', page);

    return response.json();
  });
}
