import React, {useState} from "react";
import axiosInstance from "../utils/axiosInstance";
import Image from "../images/icon.svg";
import { useNavigate } from "react-router-dom";

export default function Giris({setLogin, login}) {
    const history= useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inValidLogin, setInValidLogin] = React.useState(false)


    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        // Send login request to the server
        const response = await axiosInstance.post('/auth/logIn', { username, password });
        if (response.status === 200) {
        const token = response.data.data.token; 
        window.localStorage.removeItem("my_ctf_token")
        window.localStorage.setItem("my_ctf_token", token)
        if (token) {
            window.localStorage.setItem("isLogedIn", true)
            setLogin(window.localStorage.getItem("isLogedIn"))
            history("/")
        }
        
        if (response.data.check === "admin") {
            window.localStorage.setItem("realAdmin", "admin")
        }
        }
    } catch (error) {
        // Error during login
        console.log('An error occurred:', error.message);
        setInValidLogin(true)
    }
    };

    return (
    <div>
        <div className="giris-main">
            <div className="giris-header">
                <div className="div-logo-img"><img src={Image} className="logo-img-1" /></div>
            </div>
            <form onSubmit={handleLogin} className="div-giris-input">
                <input
                    type="text"
                    placeholder="Ulanyjy adyňyz" 
                    className="giris-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password" 
                    className="giris-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="dowam-et-button" type="submit">Giriş</button>
                <p className="input-text">Öň agza bolmadyk bolsaňyz agza boluň!</p>
                <p className="input-text-1">{ inValidLogin && "Ýalňyş Log in!"}</p>
            </form>
        </div>
    </div>
  );
}