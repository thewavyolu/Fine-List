import React, { useState,useEffect, useRef,useLayoutEffect,useMemo,memo} from 'react';
import  { Navigate ,NavLink,Link,useNavigate } from 'react-router-dom';
import { GoUnverified, GoVerified   } from "react-icons/go";   
import { TbHandStop,TbReload   } from "react-icons/tb";   
import { GiTrade} from "react-icons/gi";  
import { FiUsers} from "react-icons/fi";  
import { RiMessage3Fill} from "react-icons/ri";  
import { FaArrowLeft,FaUserTie} from "react-icons/fa";  
import { IoIosCloseCircle,IoIosOptions} from "react-icons/io";  
import {BsFillBellFill,BsSearch,BsThreeDotsVertical} from "react-icons/bs";    
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './Fines.css'; 
//import Pagination from './Pagination';
let PageSize = 3;




const Fines = (props) => {  
  const searchRef = useRef();
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);   
  const [page, setPage] = useState('')
////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
/**
 * 
 * 
 * 
 *   const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

         // <Pagination
        //   className="pagination-bar"
        //   currentPage={currentPage}
        //   totalCount={data.length}
        //   pageSize={PageSize}
        //   onPageChange={page => setCurrentPage(page)}
        // />
           
 */

 
  
    
      
    let active = data.length;
    let items = [];
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }

    const paginationBasic = (
      <div>
        <Pagination>{items}</Pagination>
        <br />
     
      </div>
    );




  const OnSearch = (text) => {
  
  
    if (text == ''){ 
      setData(oldData); 
    }else{
        let tempList = data.filter(item => {
      return item.book.toLowerCase().indexOf(text.toLowerCase()) > -1; 
    });
    
    setData(tempList);
   // currentTableData=tempList;
    
    }
 


  
  }
  const OnChangePage = (text) => {
  
  
    if (text == ''){ 
      setData(oldData); 
    }else{
        let tempList = data.filter(item => {
      return item.book.toLowerCase().indexOf(text.toLowerCase()) > -1; 
    });
    
    setData(tempList);
   // currentTableData=tempList;
    
    }
 


  
  }

 
 
  useLayoutEffect(() => {

    let runNow = true
   
      

        
        var headers = { 'Accept': 'application/json',  'Content-type': 'application/json'  }
        fetch("https://librarymanagementsys-20df705de90f.herokuapp.com/lib/v1/books/allfines",
           {
           method:'GET',
           header:headers
           })
                  
                 .then((response) => response.json())
                 .then((responseJson) =>
                 {  
                    
                
                  if(runNow){ 
  
                     setOldData(responseJson.fines);
                     setData(responseJson.fines);
              setPage(responseJson.fines.length)
                    }

           
                                
      
               })
               .catch((error) => { 
                  
                    
                 });
       
  
  
      return () => {
        runNow = false;
      }; 
   
   
   
    },[]);


 
 
   

 
 
  
 
    return (
  
          <Container style={{backgroundColor:'#f2f2f2'}} >
  
   

          <Row style={{paddingTop:20}}>
            <Col style={{fontSize:40,marginBottom:10,}}>
            USER FINE LIST
            </Col>

            <Col>                                    
              <input
              ref={searchRef}
              placeholder="Search by book here.." 
              style={{height:40,width:'76%',marginLeft:10,color:'black',borderRadius:15,fontSize:12}}
              onChange={e => OnSearch(e.target.value)}
              /> 
            </Col>
        </Row>
                 
                


             
                
             
          <Table  striped bordered hover responsive style={{width:'100%',padding:15 }}>
          
          <thead  style={{}} >
            <tr   style={{textAlign: 'left',backgroundColor:'#f2f2f2',}}>
             
              <th  style={{ width: '40%',padding:15 }}>User Names</th>
              <th  style={{ width: '30%',padding:15  }}>Books </th> 
              <th  style={{ width: '30%',padding:15  }}>Fine Amount </th> 
            </tr>
          </thead>

          <tbody  > 
            {data.map(item => {
              return (
                <tr    style={{textAlign: 'left'}} >

                  <td   style={{   display:'flex',flexDirection:'row',justifyContent:'space-around'}} >
                   <div > <img src="images/placeholder.png"   height={40} width={40}  />  </div>
                   <div style={{fontWeight:'bold',width:'50%',textAlign:'left'}}> {item.user}</div> 
                  </td>

                  <td    style={{    }} >
                   {item.book}
                  </td>

                  <td   style={{   }}>
                  {item.fineAmount}
                  </td> 
                </tr>
              );

              
            })}
          </tbody>

          <PaginationControl
          page={page}
          between={4}
          total={data.length}
          limit={10}
          changePage={(page) => { setPage(page)  }}
          
          ellipsis={1}
        />
        </Table>



  
 

 
            </Container>
      )
  
 
     
};
  


 
export default memo(Fines);  





          