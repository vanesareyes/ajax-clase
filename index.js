window.onload = function () {

    document
        .querySelector('button#refresh')
        .addEventListener('click', getRandomGif)
    
    getRandomGif()

    getTrendingGifs()

    function getTrendingGifs() {
        let limit = prompt('Cantidad de imagenes')

        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=zgPMiMkfZ8aN0jtKnWATBYpq1iKnYhHa&limit=${limit}&rating=G`)
            .then(response => response.json())
            .then(json => {
                let images = json.data

                let gifs = document.querySelector('div#gifs')

                for (let i = 0; i < images.length; i++) {
                    gifs.innerHTML += `
                        <img 
                            width="50px" 
                            src="${images[i].images.original.url}"
                        />`
                }
            })
    }

    function getRandomGif() {
        fetch('https://api.giphy.com/v1/gifs/random?api_key=zgPMiMkfZ8aN0jtKnWATBYpq1iKnYhHa&tag=&rating=G')
            .then(response => response.json())
            .then(function (json) {
                let {image_url, title} = json.data

                document.querySelector('h1#title').innerHTML = title
                document.querySelector('img#url').src = image_url
            })
    }

}
