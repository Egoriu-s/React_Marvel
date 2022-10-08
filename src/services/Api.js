import useHttp from "./../hooks/http.hook";

const useMarvelAPI = () => {
  const __apiBase = `https://gateway.marvel.com:443/v1/public/`;
  const __apiKey = `ec937b49a92b5506cf1ffa3bc211029f`;
  const __offsetBaseChar = 90;
  const __offsetBaseComics = 40;
  const { request, loading, error, clearError } = useHttp();

  const transformAllCharacters = (response) => {
    const total = response.data.total
    const allCharacter = response.data.results.map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
        description: elem.description,
        thumbnail: `${elem.thumbnail.path}.${elem.thumbnail.extension}`,
      }
    })
    return { allCharacter, total };
  }
  const transformOneCharacter = (response) => {
    // debugger
    const character = response.data.results[0];
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      wiki: character.urls[0].url,
      homepage: character.urls[1].url,
      comicsTotal: character.comics.items.length,
      comics: character.comics.items,
    }
  }
  const transformAllComics = (response) => {
    //debugger;
    const total = response.data.total
    const allComics = response.data.results.map((elem) => {
      return {
        id: elem.id,
        title: elem.title,
        price: elem.prices[0].price,
        thumbnail: `${elem.thumbnail.path}.${elem.thumbnail.extension}`,
      }
    })
    return { allComics, total }
  }

  const getAllCharacters = async (offset = __offsetBaseChar) => {
    console.log("getAllCharacters")
    return await request(
      `${__apiBase}characters?limit=9&offset=${offset}&apikey=${__apiKey}`
    ).then(transformAllCharacters)
  }
  const getCharacter = async (id) => {
    console.log("getCharacter")
    return await request(
      `${__apiBase}characters/${id}?apikey=${__apiKey}`
    ).then(transformOneCharacter)
  }
  const getAllComics = async (offset = __offsetBaseComics) => {
    console.log("getComics")
    return await request(
      `${__apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=ec937b49a92b5506cf1ffa3bc211029f`
    ).then(transformAllComics)
  }

  return {
    getAllCharacters,
    getCharacter,
    getAllComics,
    loading,
    error,
    clearError,
  }

}

export default useMarvelAPI;
