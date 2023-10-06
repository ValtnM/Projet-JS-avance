


export const getUserCoords = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            resolve([latitude, longitude]);
        })
    })
};
