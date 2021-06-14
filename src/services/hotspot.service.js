export const hotspotService = {
    saveHotspot
};

async function saveHotspot(img, rect) {
    console.log(img, rect)
    const dataObj = {
        img,
        rect
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(dataObj)});

    return await response.json()
}
