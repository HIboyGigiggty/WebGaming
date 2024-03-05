import {createBrowserRouter} from "react-router-dom"
import Glist from "../compements/gameList.js"
import App from '../App';
import TicGame from "../compements/ticTacToe.js"
import BakGame from "../compements/backgammon.js"
const router = createBrowserRouter([
    {
        path:"/games",
        element:<Glist/>
    },
    {
        path:"/",
        element:<App/>
    },
    {
        path:"/tieTacToe",
        element:<TicGame/>
    },
    {
        path:"/backgammon",
        element:<BakGame/>
    }
])

export default router;