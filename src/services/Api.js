
export class MarvelAPI {

    __apiBase = `https://gateway.marvel.com:443/v1/public/`
    __apiKey = `ec937b49a92b5506cf1ffa3bc211029f`
    __offsetBase = 90

    _transformAllCharacter = (response) => {
        const total = response.data.total;
        const allCharacter = response.data.results.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                description: elem.description,
                thumbnail: `${elem.thumbnail.path}.${elem.thumbnail.extension}`
            }
        })
        return { allCharacter, total };
    }

    _transformOneCharacter = (character) => {
        //debugger
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            wiki: character.urls[0].url,
            homepage: character.urls[1].url,
            comicsTotal: character.comics.items.length,
            comics: character.comics.items
        }
    }

    getDataFromServer = async (url) => {
        const promiseResponse = await fetch(url);
        if (promiseResponse.status !== 200) {
            throw new Error(`Could not fetch to ${url}, status: ${promiseResponse.code}`);
        }
        return await promiseResponse.json();
    }

    getAllCharacters = async (offset = this.__offsetBase) => {
        console.log('getAllCharacters')
        return await this.getDataFromServer(`${this.__apiBase}characters?limit=9&offset=${offset}&apikey=${this.__apiKey}`)
            .then(this._transformAllCharacter);
    }

    getCharacter = async (id) => {
        console.log('getCharacter')
        return await this.getDataFromServer(`${this.__apiBase}characters/${id}?apikey=${this.__apiKey}`)
            .then(response => this._transformOneCharacter(response.data.results[0]));
    }

}
