
import {CssBaseline } from '@mui/material'
import FrontPage from './components/FrontPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Menu from "./components/Menu"
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const asetukset = {
};

const theme = createTheme(asetukset);

const router = createBrowserRouter([
  {
    element: <Menu></Menu>,
    children: [
      {
        path:"/",
        element:<FrontPage ></FrontPage>
      },
      
    ]
  }
])
function App() {
  


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  )
}

export default App
