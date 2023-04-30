import axios from 'axios';

export const fetchImages = async (inputValue, pageNr) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=35922442-c118945269cf43d6168aad69e&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const fetchImages = async (inputValue, pageNr) => {
//     return await fetch(
//         `https://pixabay.com/api/?key=35922442-c118945269cf43d6168aad69e&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`
//     ).then(async response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return await response.json();
//     })
//         .catch(error => {
//             console.error(error);
//         });
// };
