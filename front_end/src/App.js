import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import SignUp from "./components/auth/SignupPage";
// import Home from "./components/Landing/Home";
// import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CartPage from "./components/CartPage"; 

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          ROUTES.LANDING
          <Route path={"/login"} element={<LoginPage />}>
            {/* <Route path={ROUTES.HOME} element={<Home />} /> */}
          </Route>
          {/* {/* <Route path={ROUTES.SIGN_IN} element={<SignIn />} /> */}
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/cart"} element={<CartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
