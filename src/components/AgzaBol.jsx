import React from "react";
import {useRef, useState, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/agza-bol.css"
import Image from "../images/icon.svg";
import {Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.jsx"; 


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/agza-bol";

export default function AgzaBol({setLogin}) {
    const history= useNavigate()
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [family, setFamily] = useState('');
    const [validFamily, setValidFamily] = useState(false);
    const [familyFocus, setFamilyFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidUser(result);
    }, [user])

    useEffect(() => {
        const result = USER_REGEX.test(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = USER_REGEX.test(family);
        setValidFamily(result);
    }, [family])

    useEffect(() => {
        const result= PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])
    
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd, family, name])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = USER_REGEX.test(family);
        const v4 = USER_REGEX.test(name);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const newPost = { "name": name, "surname":family, "pasword":pwd, "username":user };
            const response = await axiosInstance.post('/auth/create-users/', newPost);
            setPwd('');
            setUser('');
            setFamily('');
            setName('');
            setMatchPwd(false);
            window.localStorage.setItem("isLogedIn", true);
            const token = response.data.token;
            window.localStorage.removeItem("my_ctf_token")
            window.localStorage.setItem("my_ctf_token", token)
            setLogin(window.localStorage.getItem("isLogedIn"))
            history("/")
        } catch (err) {
        console.log(`Error: ${err.message}`);
        }
        setSuccess(true);
    }
    return (
        <div>
            <div className="giris-header">
                <div className="div-logo-img"><img src={Image} className="logo-img" /></div>
            </div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit} className="register-inputs">
                <div className="div-input">
                    <label htmlFor="ownname" className="checker">
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !name ? "hide" : "invalid" }>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="text"
                        id="ownname"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        required
                        aria-invalid={validName ? "false": "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setNameFocus(true)}
                        onBlur={()=> setNameFocus(false)}
                        placeholder="Adyňyzy giriziň"
                        className="register-input"
                    /> 
                    <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /><span>  </span>
                        Girizýän adyňyz 3 harpdan <br />az 24 harpdan köp bolmaly däl! <br />
                        Başy harp bilen başlamaly! <br />
                        Harplary, sanlary we aşak çyzyk belgini <br /> ulanyp bilýäňiz! 
                    </p>
                </div>

                <div className="div-input">
                    <label htmlFor="familyname" className="checker">
                        <span className={validFamily ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validFamily || !family ? "hide" : "invalid" }>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="text"
                        id="familyname"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setFamily(e.target.value)}
                        required
                        aria-invalid={validFamily ? "false": "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setFamilyFocus(true)}
                        onBlur={()=> setFamilyFocus(false)}
                        placeholder="Familiýaňyzy giriziň"
                        className="register-input"
                    /> 
                    <p id="uidnote" className={familyFocus && family && !validFamily ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /><span>  </span>
                        Girizýän familýaňyz 3 harpdan <br />az 24 harpdan köp bolmaly däl! <br />
                        Başy harp bilen başlamaly! <br />
                        Harplary, sanlary we aşak çyzyk belgini <br /> ulanyp bilýäňiz! 
                    </p>
                </div>

                <div className="div-input">
                    <label htmlFor="username" className="checker">
                        <span className={validUser ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validUser || !user ? "hide" : "invalid" }>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validUser ? "false": "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={()=> setUserFocus(false)}
                        placeholder="Ulanyjy adyňyzy giriziň"
                        className="register-input"
                    /> 
                    <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /><span>  </span>
                        Girizýän ulanyjy adyňyz 3 harpdan <br />az 24 harpdan köp bolmaly däl! <br />
                        Başy harp bilen başlamaly! <br />
                        Harplary, sanlary we aşak çyzyk belgini <br /> ulanyp bilýäňiz! 
                    </p>
                </div>

                <div className="div-input">
                    <label htmlFor="password" className="checker">
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid" }>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false": "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={()=> setPwdFocus(false)}
                        placeholder="Parolyňyzy giriziň"
                        className="register-input"
                    /> 
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /><span> </span>
                        Girizýän parolyňyz setir, baş harpy,<br /> sany we simwoly özünde saklamaly! <br />
                        Girizýän parolyňyz 8 belgiden uly<br />24 belgiden kiçi bolmaly!<br />
                        Girizip bilýän simwollaryňyz:  <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="percent">%</span>
                    </p>
                </div>

                <div className="div-input">
                    <label htmlFor="confirm_pwd" className="checker">
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid" }>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false": "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={()=> setMatchFocus(false)}
                        placeholder="Parolyňyzy barlaň"
                        className="register-input"
                    /> 
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> <span> </span>
                        Bu girizýän parolyňyz 1-nji girizen<br /> parolyňyz bilen gabat gelmeli!
                    </p>
                </div>

                <button disabled={!validName || !validPwd || !validMatch ? true : false} className="register-button">
                    Agza boluň
                </button>
            </form>
            <div className="div-sign-in">
                <p className="sign-in-text">Öň agza bolan bolsaňyz:<br /></p>
                <span className="line">
                <Link to="/giris" className="giris-button">Giriş</Link>
                </span>
            </div>
        </div>
    )
}




