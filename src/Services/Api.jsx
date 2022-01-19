export async function fetchImages(page, query) {
  const API_KEY = "23901512-731f3652ce829a0e5db3ff14f";
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(URL);
  return response.ok
    ? response.json()
    : Promise.reject(new Error("Something went wrong, please try again"));
}
