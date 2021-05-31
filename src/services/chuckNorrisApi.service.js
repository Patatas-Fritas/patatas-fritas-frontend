export const chuckNorrisApiService = {
    getRandomJoke
};

let counter = 0

async function getRandomJoke() {
    let url;
    if(counter === 0){
        url = 'https://api.chucknorris.io/jokes/randomka'
        ++counter;
    }else{
        url = 'https://api.chucknorris.io/jokes/random'
    }
    const response = await fetch(url)
    console.log(response);
    if (response.status != 200) {
        throw new Error(response.status);
    }
    return await response.json()
}