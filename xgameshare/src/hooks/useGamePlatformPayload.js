export const useGamePlatformIdsPayload = (endpoint, platformIds) => {
    
    let payload = `fields name; where id = (${platformIds.join(',')});`
    return payload;
  
}

