


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
  const uniquePlatformIds = platformIds.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  let payload = `fields name; where id = (${uniquePlatformIds.join(',')});`
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
  //Go through the list of games to get the list of their platfrom ids.
  // Then from the platform data find the corresponding id, and inject
  // the name of the platform inside the game data.
  const gamesWithPlatforms = gamesData.map(game => {
    const platformNames = game.platforms.map(platformId => {
      const platform = platformData.find(platform => platform.id === platformId);
      return platform ? platform.name : '';
    });
    return {
      ...game,
      platformNames: platformNames,
    };
  });

  console.log(gamesWithPlatforms);



  //Same thing for genres
  const gamesWithPlatormAndGenresNames = gamesWithPlatforms.map(game => {
    const genreNames = game.genres.map(genreId => {
      const genre = genreData.find(genre => genre.id === genreId);
      return genre ? genre.name : '';
    });
    return {
      ...game,
      genreNames: genreNames,
    };
  });

  return gamesWithPlatormAndGenresNames;
}
