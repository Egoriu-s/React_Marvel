import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppHeader from './../appHeader/AppHeader'
import "./app.scss"
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))
const NotFound404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))

const App = () => {

  //debugger
  console.log("Render App")
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )

}

export default App
