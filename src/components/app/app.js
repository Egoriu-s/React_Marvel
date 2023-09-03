import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppHeader from './../appHeader/AppHeader'
import "./app.scss"
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'))
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
              <Route path='//Petrichenko_React_Marvel' element={<MainPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/characters/:charId" element={<SingleCharPage />} />
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

// function arrayDiff1(a, b) {
//   if (b.length === 0) return a
//   //debugger
//   for (let i = 0; i < b.length; i++) {
//     for (let j = 0; j < a.length; j++) {
//       debugger
//       if (a[j] === b[i]) {
//         a.splice(j, 1)
//         j--
//       }
//     }
//   }
//   return a
// }

function arrayDiff(a, b) {
  if (b.length === 0) return a
  for (let i = 0; i < b.length; i++) a = a.filter(elem => elem !== b[i])
  return a
}

console.log(arrayDiff([1, 2, 2, 4, -10.5, 0, "hello"], [2, 0]))