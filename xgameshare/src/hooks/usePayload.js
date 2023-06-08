/** Helper method for query payload format */
const usePayload = (selectedGenre, selectedPlatform, searchText) => {

  let payload = "fields name; limit 30;";


  if (selectedGenre || selectedPlatform || searchText) {
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
    }
  }

  payload += ";"
  return payload;
}

export default usePayload
