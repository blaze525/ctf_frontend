//register
import React, {useEffect, useRef} from "react";
import Image from "../images/contact.png";
import "../fontawesome/css/font-awesome.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import { format } from 'date-fns';
import axiosInstance from "../utils/axiosInstance.jsx";

export default function CardInfo({login}) {
  const {id} = useParams(); //string
  const admin = true //duzetmeli
  const [info, setInfo] = React.useState("");
  const [inputValue, setInputValue] = React.useState("")
  const [message, setMessage] = React.useState(false)
  const [done, setDone] = React.useState(info.done);
  const [answer, setAnswer] = React.useState(false)
  const [answerDone, setAnswerDone] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const history = useNavigate()


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/question/question_one/${id}`);
        setInfo(response.data[0]);
        setDone(response.data[0].done)
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range //duzetmeli
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("my_ctf_token")
      const response = await axiosInstance.post(`/question/check_answer/${info.id}/${inputValue}`, 
       {},
        {
          headers: {
          "Authorization": `Bearer ${token}`,
        }
        }
        );
        if (response.status === 200) {
          setMessage(response.data)
          setDone(prev=>prev+1)
          setAnswer(false)
        }
        
    } catch (err) {
      console.log(`Error: ${err.message}`);
      if (err.response.status === 403) {
        setAnswerDone(true)
      }
      else if (err.response.status !==200) {
        setAnswer(true)
      }
    }
  }
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdate = async (id) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);
      try {
        const response = await axiosInstance.put(`/upload/update-banner-image/${id}`, 
        formData,
        {
          headers: {
          "Authorization": `Bearer ${window.localStorage.getItem("my_ctf_token")}`,
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
        }
        );
        window.location.reload()
      } catch (error) {
        // Handle error
        console.error('Error occurred:', error);
      }
    }
  };
  return (
      <div className="card-info">
      <div className="div-card">
        <div className="row-main-info">
          <div className="column-title-info">
            <p className="info-gozleg">
              Gözleg
            </p>
            <p className="ctf-name">TDMI_CTF | <span className="info-title">{info.categories_name}</span></p>
          </div>
          <img src={Image} className="contact-img" />
          <p className="point-text">| {info.point} utuk</p>
        </div>
        <hr />
        <button onClick={()=> 
            history(-1)
          } className="x-button">X</button>
        <div className="row-middle-info">
          <div className="div-author-text">
            <p className="author-text">Awtory: {info.writer}</p>
            <hr className="sss"/>
          </div>
          <div className="div-help">
            <p>Kömek  <i className="fa fa-question question" aria-hidden="true" /></p>
            <p><i>Gözläliň onda</i></p>
          </div>

          {admin && <div className="div-file">
            <input type="file" onChange={handleFileChange} className="choose-file"/>
            <button onClick={()=>handleUpdate(info.id)} className="upload-button">Upload File</button>
          </div>}
        </div>

        <p className="menu-text">Mazmuny:</p>
        <p className="problem-info">{info.question}. 
        <a href={`http://10.10.73.47:5050${info.file}`} className="document-link">{info.file ? info.file : "Siz bu meselä degişli faýl goşmadyňyz!"}</a></p>
        <div className="div-answer">
        <p className="number-done-info">{done} çözen</p>
        <p className="number-done-info">{answer && "Jogap nädogry"} {answerDone && "Siz bu meseläni öň işlediňiz!"}</p>
        </div>
        <hr />
        {login ? 
          (!message ? <div className="div-input-answer">
            <input type="text" placeholder="TDMI_CTF" className="input-answer" 
            onChange={(e)=>setInputValue(e.target.value)} />
            <button className="button-answer" onClick={handleSubmit}>Barla</button>
          </div> : <p> Dogry jogap berdiňiz! </p>) 
          :
          <div className="row-bottom-info">
          <p className="info-about-giris">Jogap girizmek üçin öz ulanyjyňyzdan giriň!</p>
          <Link to="/giris" className="giris-button-info">
            Giriş
          </Link>
        </div> 
        }
      </div> 
    </div>
  )
}