export const isPresentInFavorites = (favorites, userFavoritePayload) =>{
    for(let item of favorites)
    {
        if(userFavoritePayload.restaurantId && 
            userFavoritePayload.restaurantId === item.restaurantId)
        {
            console.log(userFavoritePayload.title, " removed from favorites")
            return true
        }
        else if(userFavoritePayload.restaurantId && 
            userFavoritePayload.restaurantId !== item.restaurantId)
        {
            console.log(userFavoritePayload.title, " added to favorites")
        }
        else if(userFavoritePayload.id === item.restaurantId)
        {
            console.log(userFavoritePayload.title, " is favorite")
            return true
        }
        else
        {
            console.log("restaurantId in restaurantObject", userFavoritePayload.id)
            console.log("restaurantId in userFavoriteObject ", item.restaurantId)
            console.log(userFavoritePayload.title, " is not favorite")
        }
    }
    return false
}