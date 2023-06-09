/** Helper method for query payload format */
const usePayload = (endpoint, selectedGenre, selectedPlatform, sortOrder, searchText) => {

  let payload = "fields name ";

  if (endpoint.startsWith("/games")) {
    payload += " , platforms, aggregated_rating, first_release_date, genres, tags, summary, storyline, themes, url, cover;";
  } else {
    payload += ";"
  }

  payload += "limit 30;"

  if (selectedGenre || selectedPlatform || searchText ) {
  
    payload += " where";

    if (searchText) {
      payload += ` name ~  "${searchText}"*`;

    } else {

      if (selectedGenre) {
        payload += ` genres = [${selectedGenre}]`;
      }

      if (selectedPlatform) {
        payload += selectedGenre ? ` & platforms.platform_family= ${selectedPlatform}` : ` platforms.platform_family = ${selectedPlatform}`;
      }
      payload += ";"    
    }
    if (sortOrder) {
      payload += `sort ${sortOrder} desc;`;
    }
  }
  return payload;
}

export default usePayload
