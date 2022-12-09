import { useEffect, useState, memo } from "react"
import CharacterList from "./CharacterList"
import ErrorMessage from "../secondaryComponents/errorMessage/Error"
import Spinner from "../secondaryComponents/spinner/Spinner"
import useMarvelAPI from "./../../services/Api"
import "./characterList.scss"

const StateMachineCharList = (process, data_0, data_1, newLoading) => {

  //debugger
  //console.log("State Machine")
  switch (process) {
    case 'waiting': return []
    case 'fetching': return newLoading
      ? <CharacterList charList={data_0} setCharItemId={data_1} />
      : <Spinner marginTop={50} />
    case 'error': return <ErrorMessage />
    case 'done': return <CharacterList charList={data_0} setCharItemId={data_1} />
    default: throw new Error

  }
}

const CharacterListContainer = (props) => {

  const [charList, setCharList] = useState([])
  const [newLoading, setNewLoading] = useState(false)
  const [end, setEnd] = useState(false)
  const [offsetCharacters, setOffsetCharacters] = useState(125)

  const { getAllCharacters, clearError, process, setProcess } = useMarvelAPI()

  const downloadComplete = (charListNew) => {
    const end = charListNew.total - offsetCharacters > 9 ? false : true
    setCharList((charList) => [...charList, ...charListNew.allCharacter])
    setEnd(end)
    setOffsetCharacters((offsetCharacters) => offsetCharacters + 9)
  }
  const charListLoading = (offset, initial) => {
    initial ? setNewLoading(false) : setNewLoading(true)
    clearError()
    getAllCharacters(offset)
      .then(downloadComplete)
      .then(() => setProcess('done'))
      .finally(() => setNewLoading(false))
  }
  const loadMoreCharacter = (offset) => charListLoading(offset)

  useEffect(() => charListLoading(offsetCharacters, true), [])

  const styleBtn = {
    display: (end || (process === "fetching" && !newLoading)) && "none",
    opacity: newLoading && 0.5,
  }

  //debugger
  console.log("Render Char List")
  return (
    <div className="char__list">
      {StateMachineCharList(process, charList, props.setCharItemId, newLoading)}
      <button
        className="button button__main button__long"
        disabled={newLoading}
        style={styleBtn}
        onClick={() => loadMoreCharacter(offsetCharacters)}
      >
        <div className="inner">
          {newLoading ? "Please, wait..." : "load more"}
        </div>
      </button>
    </div>
  )
}

export default memo(CharacterListContainer)
