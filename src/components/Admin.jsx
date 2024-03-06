import React, {useState, useRef, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Image from "../images/icon.svg";



export default function Admin({setLogin, login, realAdmin, setSpecial, special}) {
    const history= useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [admin, setAdmin] = useState(window.localStorage.getItem("my_ctf_token"));
    const [inValidLogin, setInValidLogin] =useState(false)
    const [cotegoryName, setCotegoryName] = useState("");
    const [point, setPoint] = useState(0)
    const [name, setName] = useState("")
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState("")
    const [cotegorId, setCotegorId] = useState(1)
    const [titleInformation, setTitleInformation] = useState("")
    const [subTitleInformation, setSubTitleInformation] = useState("")
    const [cotName, setCotName] = React.useState([]);
    const [numberOfCot, setNumberOfCot] = React.useState(0);
    const inputRef1 = useRef(null)
    const inputRef21 = useRef(null)
    const inputRef22 = useRef(null)
    const inputRef24 = useRef(null)
    const inputRef25 = useRef(null)
    const inputRef31 = useRef(null)
    const inputRef32 = useRef(null)
    
    
    const handleOptionChange = (event) => {
      const selectedCategoryId = event.target.value;
      setCotegorId(selectedCategoryId);
    }

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axiosInstance.get('/categories/get_subcategories');
          setCotName(response.data.categories); 
          setNumberOfCot(response.data.len);
        } catch (err) {
          if (err.response) { 
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      }
      fetchPosts();
    }, [])
    const options = cotName.map(x=> {
      return (
        <option value={`${x.id}`} className="options">{x.categories_name}</option>
      )
    })

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          // Send login request to the server
          const response = await axiosInstance.post('/auth/logIn', { username, password });
          if (response.status === 200 && realAdmin === response.data.check) {
            setSpecial(true)
            window.localStorage.removeItem("my_ctf_token")
            window.localStorage.setItem("my_ctf_token", response.data.data.token)
            window.localStorage.setItem("realAdmin", response.data.check)
            window.localStorage.setItem("isLogedIn", true)
            setLogin(window.localStorage.getItem("isLogedIn"))
            setAdmin(window.localStorage.getItem("my_ctf_token"))
            history("/admin")
            setInValidLogin(false)
          } 
      } catch (error) {
          // Error during login
          console.log('An error occurred:', error.message);
          setInValidLogin(true)
      }
      };

      const handleCotegory = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the server
            const response = await axiosInstance.post('/categories/add_categories', 
              {"categories_name": cotegoryName},
              {
                headers: {
                "Authorization": `Bearer ${admin}`,
              }
              }
            );
            if (response.status==201) {
              inputRef1.current.value = ""
              window.location.reload()
            }

        } catch (error) {
            // Error during login
            console.log('An error occurred:', error.message);
            if (error.response.status !==201) {
              inputRef1.current.value = "Ýalňyşlyk ýüze çykdy"
            }
        }
        };

        const handleSubCotegory = async (e) => {
          e.preventDefault();
          try {
              // Send login request to the server
              const response = await axiosInstance.post('/question/add_subcategories/', 
                {
                  "name" : name,
                  "answer" : answer,
                  "question" : question,
                  "categorid" : parseInt(cotegorId),
                  "point" : parseInt(point)
                 },
                {
                  headers: {
                  "Authorization": `Bearer ${admin}`,
                }
                }
              );
              if (response.status===201) {
                inputRef21.current.value = ""
                inputRef22.current.value = ""
                inputRef24.current.value = ""
                inputRef25.current.value = ""
                window.location.reload()
              }
  
          } catch (error) {
              // Error during login
              console.log('An error occurred:', error.message);
              if (error.response.status !==201) {
                inputRef21.current.value = "Ýalňyşlyk ýüze çykdy"
                inputRef22.current.value = "Ýalňyşlyk ýüze çykdy"
                inputRef24.current.value = "Ýalňyşlyk ýüze çykdy"
                inputRef25.current.value = "Ýalňyşlyk ýüze çykdy"
              }
          }
          };

          const handleInformation = async (e) => {
            e.preventDefault();
            try {
                // Send login request to the server
                const response = await axiosInstance.post('/information/add_information',  
                  {
                    "title": titleInformation,
                    "subtitle": subTitleInformation
                  },
                  {
                    headers: {
                    "Authorization": `Bearer ${token}`,
                  }
                  }
                );
                if (response.status==201) {
                  inputRef31.current.value = ""
                  inputRef32.current.value = ""
                  window.location.reload()
                }
    
            } catch (error) {
                // Error during login
                console.log('An error occurred:', error.message);
                if (error.response.status !==201) {
                  inputRef31.current.value = "Ýalňyşlyk ýüze çykdy"
                  inputRef32.current.value = "Ýalňyşlyk ýüze çykdy"
                }
            }
            };

    return (
        <div className="giris-main">
            <div className="giris-header">
                <div className="div-logo-img"><img src={Image} className="logo-img" /></div>
            </div>
            { !special ?
              <form onSubmit={handleLogin} className="div-giris-input">
                  <p className="input-text-1">{ inValidLogin && "Bu sahypa diňe admin girip bilýär!"}</p>
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
                  <p className="input-text">Bu sahypa diňe admin üçin!</p>
              </form>
            : 
            <div className="div-add">
              <hr />
              <form onSubmit={handleCotegory} className="div-giris-input div-giris-input-1">
                <input
                    ref = {inputRef1}
                    type="text"
                    placeholder="Kategoriýa goş" 
                    className="giris-input admin-input"
                    onChange={(e) => setCotegoryName(e.target.value)}
                />
                <button className="dowam-et-button" type="submit">Goş</button>
                <p className="input-text">Täze kategoriýa goşmak üçin!</p>
              </form>
              <hr />
              <hr />
              <form onSubmit={handleSubCotegory} className="div-giris-input div-giris-input-1">
                <select value={cotegorId} onChange={handleOptionChange} className="giris-input admin-input">
                  {options}
                </select>
                <input
                    ref={inputRef21}
                    type="text"
                    placeholder="Meseläniň utugy..." 
                    className="giris-input admin-input"
                    onChange={(e) => setPoint(e.target.value)}
                />
                <input
                    ref={inputRef22}
                    type="text"
                    placeholder="Meseläniň ady..." 
                    className="giris-input admin-input"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    ref={inputRef24}
                    type="text"
                    placeholder="Sorag üçin..." 
                    className="giris-input admin-input"
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <input
                    ref={inputRef25}
                    type="text"
                    placeholder="Soragyň jogaby üçin..." 
                    className="giris-input admin-input"
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="dowam-et-button" type="submit">Goş</button>
                <p className="input-text">Täze sorag goşmak üçin!</p>
              </form>
              <hr />
              <hr />
              <form onSubmit={handleInformation} className="div-giris-input div-giris-input-1">
                <input
                    ref={inputRef31}
                    type="text"
                    placeholder="Maglumatyň ady..." 
                    className="giris-input admin-input"
                    onChange={(e) => setTitleInformation(e.target.value)}
                />
                <input
                    ref={inputRef32}
                    type="text"
                    placeholder="Maglumat..." 
                    className="giris-input admin-input"
                    onChange={(e) => setSubTitleInformation(e.target.value)}
                />
                <button className="dowam-et-button" type="submit">Goş   </button>
                 <p className="input-text">Maglumatlara maglumat goşmak  üçin!</p>
                </form>
                <hr />
            </div>}
        </div>
        )
      }
 
      //corel braces galdy.