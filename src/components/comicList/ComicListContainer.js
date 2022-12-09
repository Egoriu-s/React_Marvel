import { useEffect, useState, memo } from "react"
import ComicList from "./ComicList"
import ErrorMessage from "../secondaryComponents/errorMessage/Error"
import Spinner from "../secondaryComponents/spinner/Spinner"
import useMarvelAPI from "./../../services/Api"
import "./comicList.scss"

const StateMachineComicList = (process, data, newLoading) => {

  //debugger
  //console.log("State Machine")
  switch (process) {
    case 'waiting': return []
    case 'fetching': return newLoading
      ? <ComicList comicList={data} />
      : <Spinner marginTop={250} />
    case 'error': return <ErrorMessage />
    case 'done': return <ComicList comicList={data} />
    default: throw new Error

  }
}

const ComicListContainer = () => {
  const [comicList, setComicList] = useState([])
  const [newLoading, setNewLoading] = useState(false)
  const [end, setEnd] = useState(false)
  const [offsetComic, setOffsetComic] = useState(210)
  const { getAllComics, clearError, process, setProcess } = useMarvelAPI()

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
      .then(() => setProcess('done'))
      .finally(() => setNewLoading(false))
  }
  const loadMoreComics = (offset) => comicListLoading(offset)

  useEffect(() => comicListLoading(offsetComic, true), [])

  const styleBtn = {
    display: (end || (process === 'fetching' && !newLoading)) && "none",
    opacity: newLoading && 0.5,
  };

  //debugger
  console.log("Render Comic List")
  return (
    <>
      {StateMachineComicList(process, comicList, newLoading)}
      <button onClick={() => loadMoreComics(offsetComic)} style={styleBtn}
        className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </>
  )
}

export default memo(ComicListContainer)