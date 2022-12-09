import ComicListContainer from "../comicList/ComicListContainer"
import AppBanner from './../appBanner/AppBanner'

const ComicsPage = () => {

    //debugger
    console.log('Comic Page')
    return (
        <>
            <AppBanner />
            <ComicListContainer />
        </>
    )
}

export default ComicsPage