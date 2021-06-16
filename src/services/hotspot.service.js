export const hotspotService = {
    saveHotspot
};

async function saveHotspot(image, rectangle, title) {
    // console.log(image, rectangle)
    const dataObj = {
        image,
        title,
        rectangle
    }
    console.log(dataObj)
    console.log(JSON.stringify(dataObj))
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/hotspot/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'patatas-fritas-token': token
        },
        body: JSON.stringify(dataObj)});

    return await response.json()
}
