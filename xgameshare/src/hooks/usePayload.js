/** Helper method for query payload format */
const usePayload = (selectedGenre, selectedPlatform) => {
  
    let payload = "fields name; limit 30;";
    
    if (selectedGenre || selectedPlatform) {
      payload += " where";
      
      if (selectedGenre) {
        payload += ` genres = [${selectedGenre}]`;
      }
  
      if (selectedPlatform) {
        payload += selectedGenre ? ` & platforms.platform_family= ${selectedPlatform}` : ` platforms.platform_family = ${selectedPlatform}`;
      }
    }
    
    payload += ";"
    return payload;
}

export default usePayload
