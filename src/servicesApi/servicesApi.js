import axios1 from 'axios';

const axios = axios1.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40557394-a61faa7e415e46037d2629f71',
    image_type: 'photo',
    // safesearch: true,
    // orientation: 'horizontal',
  },
});

export async function getImages(searchName, page, per_page) {
  const params = { q: searchName, per_page, page };

  const { data } = await axios.get('', { params });
  return data;
}
