import { useEffect, useState, memo } from "react"
import ComicList from "./ComicList"
import ErrorMessage from "../secondaryComponents/errorMessage/Error"
import Spinner from "../secondaryComponents/spinner/Spinner"
import useMarvelAPI from "./../../services/Api"
import "./comicList.scss"

const ComicListContainer = () => {
  const [comicList, setComicList] = useState([])
  const [newLoading, setNewLoading] = useState(false)
  const [end, setEnd] = useState(false)
  const [offsetComic, setOffsetComic] = useState(210)
  const { getAllComics, loading, error, clearError } = useMarvelAPI()

  const downloadComplete = (comicListNew) => {
    // const end = comicListNew.total - offsetComic > 8 ? false : true
    const end = comicListNew.length < 8 ? true : false
    setComicList((comicList) => [...comicList, ...comicListNew.allComics])
    setEnd(end)
    setOffsetComic(offsetComic + 8)
  }
  const comicListLoading = (offset, initial = false) => {
    initial ? setNewLoading(false) : setNewLoading(true)
    clearError()
    getAllComics(offset)
      .then(downloadComplete)
      .finally(() => {
        setNewLoading(false)
      })
  }
  const loadMoreComics = (offset) => comicListLoading(offset)

  useEffect(() => comicListLoading(offsetComic, true), [])

  const errorImg = error && <ErrorMessage />
  const spinner = loading && !newLoading && <Spinner marginTop={250} />

  const styleBtn = {
    display: (end || (loading && !newLoading)) && "none",
    opacity: newLoading && 0.5,
  };

  //debugger
  console.log("Render Comic List")
  return (
    <>
      {errorImg}
      {spinner}
      <ComicList comicList={comicList} />
      <button onClick={() => loadMoreComics(offsetComic)} style={styleBtn}
        className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </>
  )
}

export default memo(ComicListContainer)