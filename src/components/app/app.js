import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AppHeader from "../appHeader/AppHeader"
import MainPage from "../pages/MainPage"
import ComicsPage from './../pages/ComicsPage'
import "./app.scss"

const App = () => {

  //debugger
  console.log("Render App")
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )

}

export default App
