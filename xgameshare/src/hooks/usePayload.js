/** Helper method for query payload format */
const usePayload = (endpoint, selectedGenre, selectedPlatform, searchText) => {

  let payload = "fields name ";

  if (endpoint.startsWith("/games")) {
    payload += " , cover, cover.url, platforms, aggregated_rating, first_release_date, created_at, genres, summary;";
    payload += " where cover!=null & cover.url!=null ";
  } else {
    payload += ";"
  }

  
  

  if (selectedGenre || selectedPlatform || searchText ) {
    

    if (searchText) {
      //https://api-docs.igdb.com/#filters example: where name ~ *"the"*;;
      payload += " &  name ~ *\"" + searchText + "\"*;";   

    } else {
      

      if (selectedGenre) {
        payload += `  & genres = [${selectedGenre}]`;
      }

      if (selectedPlatform) {
        payload += selectedGenre ? ` & platforms.platform_family= ${selectedPlatform}` : ` & platforms.platform_family = ${selectedPlatform}`;
      }
      payload += ";"    
    }
    // if (sortOrder) {
    //   payload += `sort ${sortOrder} desc;`;
    // }
  } else {
    payload+= ";"
  }
  console.log(payload);
  return payload;
}

export default usePayload
