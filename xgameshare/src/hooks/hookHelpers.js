


export const getGamePayload = (selectedGenre, selectedPlatform, searchText) => {

  let payload = "fields name ";
  payload += " , cover, cover.url, platforms, aggregated_rating, first_release_date, created_at, genres, summary, storyline;";
  payload += "limit 100;";
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

  const flattenedIds = platformIds.flat(); // Flatten the array of arrays
  const uniquePlatformIds = flattenedIds.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  //remove extra commas
  const cleanedPlatformIds = uniquePlatformIds.join(",").split(",").filter((id) => id !== "").join(",");
  console.log("uniq:" + uniquePlatformIds);

  //let payload = `fields name; where id = (${cleanedPlatformIds.join(',')});`
  let payload = "fields name; where id = (" + cleanedPlatformIds + ");";
  console.log("in method: " + payload);
  return payload;

}

export const getFavoriteGamesPayload = (igdbIds) => {
  let payload = "fields name ";
  payload += " , cover, cover.url, platforms, aggregated_rating, first_release_date, created_at, genres, summary, storyline;";
  payload += "limit 100;";
  payload += " where cover.url!=null & ";
  return payload += ` id = (${igdbIds.join(',')});`
}



  export const addPlatformGenresNames = (gamesData, platformData, genreData) => {

    console.log(gamesData);
    console.log(platformData);
    console.log(genreData);

    const gamesWithPlatforms = gamesData.map((game) => {
      const platformIds = game.platforms || []; // Handle case where platforms are not specified
      const platformNames = platformIds.map((platformId) => {
        const platform = platformData.find((platform) => platform.id === platformId);
        return platform ? platform.name : '';
      });
  
  
      const updatedPlatformNames = platformNames.length ? platformNames : ["N/A"];
  
      return {
        ...game,
        platformNames: updatedPlatformNames,
      };
    });
  
  
    console.log(gamesWithPlatforms);
  
  




  //Same thing for genres
  const gamesWithPlatormAndGenresNames = gamesWithPlatforms.map(game => {
    const genreIds = game.genres || []; // Handle case where genres are not specified
    const genreNames = genreIds.map((genreId) => {
      const genre = genreData.find((genre) => genre.id === genreId);
      return genre ? genre.name : '';
    });
  
    const updatedGenreNames = genreNames.length ? genreNames : ["N/A"];
    return {
      ...game,
      genreNames: updatedGenreNames,
    };
  });

  return gamesWithPlatormAndGenresNames;
}
