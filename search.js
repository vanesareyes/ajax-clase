window.onload = function () {

    let form = document.querySelector('form#search')

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        let text = this.querySelector('input[name=text]').value
        let qty = this.querySelector('input[name=qty]').value
        document.querySelector('p').innerHTML = `Resultado de busqueda para: <b>${text}</b>`

        let url = `https://api.giphy.com/v1/gifs/search?api_key=zgPMiMkfZ8aN0jtKnWATBYpq1iKnYhHa&q=${text}&limit=${qty}&offset=0&rating=G&lang=en`

        fetch(url)
            .then(response => response.json())
            .then(json => {
                let images = json.data

                let gifs = document.querySelector('div#gifs')
                gifs.innerHTML = ''

                for (let i = 0; i < images.length; i++) {
                    gifs.innerHTML += `
                        <div>
                            <button class="favorite" data-url="${images[i].images.original.url}">Agregar a Favorito</button>
                            <img 
                                width="250px" 
                                src="${images[i].images.original.url}"
                            />
                        </div>`
                }

                let buttons = Array.from(document.querySelectorAll('.favorite'))

                buttons.forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        let favorites = []

                        if (localStorage.getItem('favorites')) {
                            favorites = JSON.parse(localStorage.getItem('favorites'))
                        }
                        
                        favorites.push({url: this.dataset.url})
                        favorites = JSON.stringify(favorites)
                        localStorage.setItem('favorites', favorites)
                    })
                })
            })
    })


}