import "./style.css"
import Home from "./pages/Home";
import Reagister from "./pages/Reagister";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import {
    Navigate,
} from 'react-router-dom';

function App() {
    const {currentUser} = useContext(AuthContext)

    return (
        <div>
            <BrowserRouter>
                <Routes path={""}>
                    <Route index element={
                        currentUser ? (
                            <Home />
                        ) : (
                            <Login />
                        )
                    }/>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Reagister />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
