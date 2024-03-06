import React, {useEffect} from "react";
import "../fontawesome/css/font-awesome.css";
import PaginationButtons from "./Button";
import axiosInstance from "../utils/axiosInstance.jsx";
import {Link, useNavigate } from "react-router-dom";




export default function RatingUsers() {
  const [users, setUsers] = React.useState([])
  const [totalPages, setTotalPages] = React.useState(1)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [search, setSearch] = React.useState("")
  const [displayUser, setDisplayUser] = React.useState(users)
  const history = useNavigate()

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

    const fetchData = async (page) => {
      try {
        const response = await axiosInstance.get(`/auth/get-users?page=${page}&page_size=10`);
        const getUsers =response.data.users;
        const totalPages = response.data.total_users;
        setUsers(getUsers);
        setTotalPages(Math.ceil(response.data.total_users/10))
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderPageButtons = () => {
    const pageNumbers = [];
    const maxButtons = 5; // Maximum number of buttons to show

    // If there are less than 5 pages, show all page numbers
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button className={currentPage === i ? 'active' : 'page-button'} key={i} onClick={() => setCurrentPage(i)} disabled={i === currentPage}>
            {i}
          </button>
        );
      }
    } else {
      // If there are more than 5 pages, show ellipsis (...) between first two and last two buttons
      const firstPages = [1, 2];
      const lastPages = [totalPages - 1, totalPages];

      firstPages.forEach((page) => {
        pageNumbers.push(
          <button className={currentPage === page ? 'active' : 'page-button'} key={page} onClick={() => setCurrentPage(page)} disabled={page === currentPage}>
            {page}
          </button>
        );
      });

      if (currentPage > 3) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }

      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 2 && i < totalPages - 1) {
          pageNumbers.push(
            <button className={currentPage === i ? 'active' : 'page-button'} key={i} onClick={() => setCurrentPage(i)} disabled={i === currentPage}>
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }

      lastPages.forEach((page) => {
        pageNumbers.push(
          <button className={currentPage === page ? 'active' : 'page-button'} key={page} onClick={() => setCurrentPage(page)} disabled={page === currentPage}>
            {page}
          </button>
        );
      });
    }

    return pageNumbers;
  };




  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = (await axiosInstance.get(search ? `/search/users_search/${search}`
        : `/auth/get-users?page=1&page_size=10`,
         {headers: {
          'Content-Type': 'application/json',
        }})  
        );
        setUsers(search ? response.data : response.data.users)  //mesele bar
        if (!search) {
          setTotalPages(Math.ceil(response.data.total_users/10))
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status ===404) {
            setUsers([])
            setTotalPages(0)
          }
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  }, [search])
  
 
  const statisticOfUsers = users.map((user,i) => {
    if (i==0 && currentPage===1) {
      return <tr>
      <td>{users.length<5 ? 1 : <i className="fa fa-trophy first-place"></i>}</td>
      <td>{user.username}</td>
      <td>{user.point}</td>
    </tr>
    }

    else if (i===1 && currentPage===1) {
      return <tr>
      <td>{users.length<5 ? 2 : <i className="fa fa-trophy second-place"></i>}</td>
      <td>{user.username}</td>
      <td>{user.point}</td>
    </tr>
    }

     else if (i==2 && currentPage===1) {
      return <tr>
      <td>{users.length<5 ? 3 : <i className="fa fa-trophy third-place"></i>}</td>
      <td>{user.username}</td>
      <td>{user.point}</td>
    </tr>
    }
    
      else {
      return <tr>
                <td>{i+1+(currentPage-1)*10}</td>
                <td>{user.username}</td>
                <td>{user.point}</td>
              </tr>
      }
  })

  return (
    <div className="div-table">
      <div className="statistic-table-name">
        Statistika
        <hr className="ssssss" />
      </div>
      <div>
        <div className="div-input-user">
        <input type="text" onChange={(e) => {
          setSearch(e.target.value)
          }} className="input-users" placeholder="Gözleg"/>
        </div>
      </div>
      <table className="rating-users-table">
        <tr>
          <td>
            <div className="head-table">
            <p>T/b</p>
            <i className="fa fa-sort"></i>
            </div>
          </td>
          <td>
            <div className="head-table">
            <p>Ulanyjynyň ady</p>
            <i className="fa fa-sort"></i>
            </div>
          </td>
          <td>
            <div className="head-table">
            <p>Utuk jemi</p>
            <i className="fa fa-sort"></i>
            </div>
          </td>
        </tr>
        {statisticOfUsers}
      </table>
      <div className="page-buttons" style={{"margin-top":"16px"}}>
        <div className="paginated-button">
          <button className='page-button' onClick={handlePrevPage} disabled={currentPage === 1} >
            Öňki
          </button>
          {renderPageButtons()}
          <button className='page-button' onClick={handleNextPage} disabled={currentPage === totalPages}>
            Indiki
          </button>
        </div>
      </div>
    </div>
    
  )
}