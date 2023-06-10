
export const getGamePayload = (selectedGenre, selectedPlatform, searchText) => {

    let payload = "fields name ";
  
    payload += " , cover, cover.url, platforms, aggregated_rating, first_release_date, created_at, genres, summary, storyline;";
    payload += "limit 5;";
    payload += " where cover!=null & cover.url!=null ";
  
  
    if (selectedGenre || selectedPlatform || searchText) {
  
  
      if (searchText) {
        //https://api-docs.igdb.com/#filters example: where name ~ *"the"*;;
        payload += " &  name ~ *\"" + searchText + "\"*;";
  
      } else {
  
  
        if (selectedGenre) {
          payload += `  & genres = [${selectedGenre.id}]`;
        }
  
        if (selectedPlatform) {
          payload += selectedGenre ? ` & platforms.platform_family= ${selectedPlatform.id}` : ` & platforms.platform_family = ${selectedPlatform.id}`;
        }
        payload += ";"
      }
      // if (sortOrder) {
      //   payload += `sort ${sortOrder} desc;`;
      // }
    } else {
      payload += ";"
    }
  
    console.log(payload);
    return payload;
  }


  export const getGamePlatformIdsPayload = (platformIds) => {
    const uniquePlatformIds = platformIds.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    let payload = `fields name; where id = (${uniquePlatformIds.join(',')});`
    return payload;
  
}


  
