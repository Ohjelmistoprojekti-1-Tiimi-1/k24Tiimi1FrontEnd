
import {CssBaseline } from '@mui/material'
import FrontPage from './components/FrontPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Menu from "./components/Menu"
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const settings = {
  palette: {
   
    primary: {
      main: "#000000", contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: { fontFamily: "'Open Sans', sans-serif" }
};

const theme = createTheme(settings);

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
