

import React, { useState, useEffect } from 'react';
import Card from "../components/Card.jsx"
import axiosInstance from '../utils/axiosInstance';
import Search from "../components/Search.jsx"
import {Link} from "react-router-dom"

export default function PaginationButtons({url,
setData, data, special, page_size, setAllQuestion, cotButton, setDisplayData, displayData}) { 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const deleteQuestion = async (id) => {
    try {
      await axiosInstance.delete(`/question/delete_question/${id}`,
      {
        headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("my_ctf_token")}`,
      }
      }
      );
      const postsList = data.filter(post => post.id !== id);
      setData(postsList);
       } 
       catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  useEffect(() => {
    if (cotButton==="magic") {
    fetchData(currentPage);
    } else {
      fetchCotData(cotButton);
    }
  }, [currentPage, cotButton]); 

  useEffect(()=>{
    if (cotButton !=="magic") {
      setDisplayData(prev => data.slice((currentPage-1)*12, prev.length>currentPage*12 ? currentPage*12 : prev.length))
    }
  } , [data, currentPage])


  const fetchCotData = async (page) => {
    try {
      const response = await axiosInstance.get(`/question/question_host/${page}`);
      setData(response.data)
      setDisplayData(response.data)
    } catch (error) {
      console.log("no cards or another error occured")
      setDisplayData([])
    }
  };

  const fetchData = async (page) => {
    try {
      const response = await axiosInstance.get(`${url}?page=${page}&page_size=${page_size}`);
      setData(response.data.subcategories);
      setDisplayData(response.data.subcategories)
      setAllQuestion(response.data.total_subcategories)
      setTotalPages(Math.ceil(response.data.total_subcategories/12));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderPageButtons = () => {
    const pageNumbers = [];
    const maxButtons = 5; 

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button className={currentPage === i ? 'active' : 'page-button'} key={i} onClick={() => setCurrentPage(i)} disabled={i === currentPage}>
            {i}
          </button>
        );
      }
    } else {
      
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
        const response = (await axiosInstance.get(search ? `/search/${search}`
        : `${url}?page=1&page_size=12`,
         {headers: {
          'Content-Type': 'application/json',
        }})  
        );
        setData(search ? response.data : response.data.subcategories)
        setDisplayData(search ? response.data : response.data.subcategories)
        if (!search) {
          setTotalPages(Math.ceil(response.data.total_subcategories/12))
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status ===404) {
            setData([])
            setDisplayData([])
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


  return (
    <div className='big-column'>
      <div className="page-buttons">
        {data && <div className="paginated-button">
          <button className='page-button' onClick={handlePrevPage} disabled={currentPage === 1} >
            Öňki
          </button>
          {renderPageButtons()}
          <button className='page-button' onClick={handleNextPage} disabled={currentPage === totalPages}>
            Indiki
          </button>
        </div>}
      </div>
      <Search 
            setSearch={setSearch}
          />
      <div className="grid" id="grid">
        {displayData && displayData.map((item, index) => (
          <Link key={index} to={`/card-info/${item.id}`} className={"sidebar-item"}>
          <button className="card-button" >
           <Card 
             key={item.id}
             {...item}
             setQuestion = {setData}
             delete = {deleteQuestion}
             data={data}
             special = {special}
           />
         </button>
         </Link>
        ))}
     </div>
    </div>
  );
};

// function PaginationButtons({ totalPages, sortData, displayData, elemNumber, display }) {
//   const [currentPage, setCurrentPage] = useState(1);


//   // Function to handle pagination button click
//   const handlePaginationClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     display ? sortData(pageNumber-1) :
//     sortData(prevData => {
//       return displayData.slice((pageNumber-1)*elemNumber,pageNumber*elemNumber)
//     })
//   };

//   // Generate pagination buttons
//   const generatePaginationButtons = () => {
//     const paginationButtons = [];



//     const threshold = 5; // Threshold to display dots

//     // Display all buttons if the total pages are less than or equal to the threshold
    
//     if (totalPages <= threshold) {
//       for (let i = 1; i <= totalPages; i++) {
//         const button = (
//           <button
//             key={i}
//             onClick={() => handlePaginationClick(i)}
//             className={currentPage === i ? 'active' : 'page-button'}
//           >
//             {i}
//           </button>
//         );

//         paginationButtons.push(button);
//       }
//     } else {
//       const firstPage = (
//         <button
//           key={1}
//           onClick={() => handlePaginationClick(1)}
//           className={currentPage === 1 ? 'active' : 'page-button'}
//         >
//           1
//         </button>
//       );

//       paginationButtons.push(firstPage);

//       let start = Math.max(2, currentPage - 2);
//       let end = Math.min(totalPages - 1, currentPage + 2);

//       if (start > 2) {
//         paginationButtons.push(<span key="dots-start">...</span>);
//       }
      
//       for (let i = start; i <= end; i++) {
//         const button = (
//           <button
//             key={i}
//             onClick={() => handlePaginationClick(i)}
//             className={currentPage === i ? 'active' : 'page-button'}
//           >
//             {i}
//           </button>
//         );

//         paginationButtons.push(button);
//       }

//       if (end < totalPages - 1) {
//         paginationButtons.push(<span key="dots-end">...</span>);
//       }

//       if (totalPages>1) {
//         const lastPage = (
//           <button
//             key={totalPages}
//             onClick={() => handlePaginationClick(totalPages)}
//             className={currentPage === totalPages ? 'active' : 'page-button'}
//           >
//             {totalPages}
//           </button>
//         );
//         paginationButtons.push(lastPage);
//       }

//     }

//     return paginationButtons;
//   };



//   return (
//     <div className="row-statistics">
//         <p className={display ? "text-pagination"  : "offscreen"}>Görünýar: {currentPage===1 ? 1 : 10*(currentPage-1)+1}-
//         {currentPage!==totalPages ? currentPage*10 : displayData.length}, Jemi: {displayData.length}  sany</p>
//         <div>
//       <button
//         onClick={()=>handlePaginationClick(currentPage===1 ? 1 : currentPage-1)}
//         className='page-button'
//       >Öňki</button>
//       {generatePaginationButtons()}
//       <button
//         onClick={()=>handlePaginationClick(currentPage===totalPages ? totalPages : currentPage+1)}
//         disabled={currentPage === totalPages}
//         className='page-button'
//       >
//         Indiki
//       </button>
//     </div>
//       </div>
//   );
// }

// export default PaginationButtons