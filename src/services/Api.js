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

  const transformOneComic = (response) => {
    //debugger
    const comic = response.data.results[0];
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is no description',
      language: comic.textObjects[0] ? comic.textObjects[0].language : 'en-us',
      pageCount: comic.PageCount ? `${comic.PageCount} pages` : 'No information about the count of pages',
      price: comic.prices[0].price ? `${comic.prices[0].price} $` : 'No information about the price of comic',
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    }
  }

  const transformAllComics = (response) => {
    //debugger;
    const total = response.data.total
    const allComics = response.data.results.map((elem) => {
      return {
        id: elem.id,
        title: elem.title,
        price: elem.prices[0].price ? `${elem.prices[0].price} $` : 'No information about the price of comic',
        thumbnail: `${elem.thumbnail.path}.${elem.thumbnail.extension}`
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
      `${__apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${__apiKey}`
    ).then(transformAllComics)
  }
  const getComic = async (id) => {
    console.log("getComic")
    return await request(
      `${__apiBase}comics/${id}?apikey=${__apiKey}`
    ).then(transformOneComic)
  }

  return {
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    loading,
    error,
    clearError,
  }

}

export default useMarvelAPI;
