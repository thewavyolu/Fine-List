import React, { useState,useEffect, useRef,useLayoutEffect,memo} from 'react';
import  { Navigate ,NavLink,Link,useNavigate } from 'react-router-dom';
import { FaArrowLeft,FaUserTie} from "react-icons/fa";  
import { IoIosCloseCircle,IoIosOptions} from "react-icons/io"; 
import {Card, Modal} from 'react-bootstrap'; 
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';




function BookList() {
  const[fieldData, setFieldData] = useState([]); 
  const[oldfieldData, setOldFieldData] = useState([]); 
  const[searchBar, setSearchBar] = useState(false);
  const searchRef = useRef();
  const [search, setSearch] = useState();
  const[shortMenuModal, setShortMenuModal]   = useState(false); 


 
  
  const onSearch = (text) => {
  
  
    if (text == '') {
      
      setFieldData(oldfieldData);
  
    } 
    else
    {
  
      let tempList = fieldData.filter(item => {
        return item.user.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setFieldData(tempList);
  
    }
  
  
  
  }




  const callAllData = () =>{
   
  
  
    var headers = { 'Accept': 'application/json',  'Content-type': 'application/json'  }
    fetch("https://librarymanagementsys-20df705de90f.herokuapp.com/lib/v1/books/allfines",
       {
       method:'GET',
       header:headers
       })
              
             .then((response) => response.json())
             .then((responseJson) =>
             {  
                                 
              setFieldData(responseJson.fines);
              setOldFieldData(responseJson.fines);
       
           
           })
           .catch((error) => { 
               console.log(false);       
            });
   
  
  
  
  
  }
  
  useLayoutEffect(() => {

    let runNow = true
   
      
        if(runNow){ 
  
        callAllData();
  
        }
        
      
  
  
      return () => {
        runNow = false;
      }; 
   
   
   
    },[fieldData]);

 

    const columns = [
      
      { dataField: 'user', text: 'USER', sort: true },
      { dataField: 'book', text: 'BOOK', sort: true }, 
      { dataField: 'fineAmount', text: 'FINE AMOUNT', sort: true }, 
    ];
    
    const defaultSorted = [{
      dataField: 'title',
      order: 'desc'
    }];
    
    const pagination = paginationFactory({
      page: 2,
      sizePerPage: 5,
      lastPageText: '>>',
      firstPageText: '<<',
      nextPageText: '>',
      prePageText: '<',
      showTotal: true,
      alwaysShowAllBtns: true,
      onPageChange: function (page, sizePerPage) {
        console.log('page', page);
        console.log('sizePerPage', sizePerPage);
      },
      onSizePerPageChange: function (page, sizePerPage) {
        console.log('page', page);
        console.log('sizePerPage', sizePerPage);
      }
    });
    



  return (
    <div className="App">


           

            <div style={{ display:'flex', width: '40%',  height: 50,  borderRadius: 10, borderColor:'#777777',  borderWidth: 0.5, flexDirection: 'row', alignItems: 'center', marginLeft: 15,  padding: 10}} >

         
            <input
            ref={searchRef}
            placeholder="Search by department here.." 
            style={{height:40,width:'76%',marginLeft:10,color:'black',borderRadius:15,fontSize:12,padding:5}}
            onChange={e =>{onSearch(e.target.value)}}
            />

     


            <div style={{ width: '20%',padding:5}}>
            <div  onClick={() =>{  onSearch('') }}>
                  <IoIosCloseCircle size={30} color={'#777777'} />
            </div>
            </div>
            
            </div>
    
            <div>



                
                  {   fieldData.length < 5?

                            <BootstrapTable 
                            bootstrap4 keyField='id' 
                            data={fieldData} 
                            columns={columns} 
                            defaultSorted={defaultSorted} 
                            
                            />
                            :
                            <BootstrapTable 
                            bootstrap4 keyField='id' 
                            data={fieldData} 
                            columns={columns} 
                          
                            defaultSorted={defaultSorted} 
                            pagination={pagination} 
                            />
                  }
                    
              </div>   
    </div>
  );
}

export default BookList;
