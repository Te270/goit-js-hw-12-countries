export default function fetchCountries(searchQuery) {
  if (searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
