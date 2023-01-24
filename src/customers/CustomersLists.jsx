import React, { useState } from 'react'
import { useCustomer } from '../Context/CustomerContext';
import { Form, Button, Row, Col, Container, Spinner, Dropdown } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';



const   CustomersLists =  () => {
      var [currentPage,setCurrentPage]=useState()
      var [nextPage,setNextPage]=useState()
      var [prevPage,setPrevPage]=useState()
      var [pageNum,setPageNum]=useState()
      var [first,setFirst]=useState()
      var [last,setLast]=useState()
      var [links,setLinks]=useState([])
      
      const {getCustomers,isLoading,setLoading}=useCustomer();
      var {pageNumber}=useParams()
      
      var [allCustomers,setAllCustomers]=useState([])
      var [foreLinks,setForeLinks]=useState([])
      var [meta,setMeta]=useState([])
      
      var prev;
      var next;

  
  async function  fetchCustomers (pageNumber){
        const customers=await getCustomers(pageNumber);
       
            setAllCustomers(customers.data) ;
            setForeLinks(customers.links)
            setMeta(customers.meta)
            setLinks(customers.meta.links)
            setFirst(foreLinks.next)
            setLast(foreLinks.last)
  }

  /****************************   Pagination  ********************************************* */

  const Pagination =()=>{
      setPageNum( pageNumber)
      const navigate=useNavigate()
     
      console.log('page number ',pageNumber)
      console.log('page num',pageNum)
      setPageNum(pageNumber)
      const nav =useNavigate()
      links.map(item=>console.log(item.label))
      prev=parseInt(pageNumber)-1;
      next=parseInt(pageNumber)+1;
    

return (
      <>
      <Link to={`/customers/page/${prev}`}>prev</Link>
      <h1> {meta.current_page} </h1>
      <Link to={`/customers/page/${next}`} >Next</Link>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        page number
      </Dropdown.Toggle>     

      <Dropdown.Menu>
            {          
            links.map(item=>     <div> <Link to={`/customers/page/${item.label}`} >{item.label}</Link></div>
            )
            }
      </Dropdown.Menu> 
       
    </Dropdown>      
      </>
)
}
/************************************************************************************************* */

/****************************************  Customer table ********************************************************* */
  const CustomersTale=()=>{

            /* return of the entire table with pagination    */
      return (
            <Container>
                  <Row>
                        <Col>
      <MDBTable align='middle'>
           <MDBTableHead>
             <tr>
               <th scope='col'>Name</th>
               <th scope='col'>type</th>
               <th scope='col'>State</th>
               <th scope='col'>City</th>
               <th scope='col'>address</th>
               <th scope='col'>postal code</th>
               
             </tr>
           </MDBTableHead>
           <MDBTableBody>
             
           {
                 allCustomers.map(item=>
                  <tr>
                       <td>
                         <div className='d-flex align-items-center'>
                         <img
                         src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                         alt=''
                         style={{ width: '45px', height: '45px' }}
                         className='rounded-circle'
                         />
                         <div className='ms-3'>
                         <p className='fw-bold mb-1'>{item.name}</p>
                         <p className='text-muted mb-0'>{item.email}</p>
                         </div>
                         </div>
                   </td>
                   <td>
       
                         <p className='fw-normal mb-1'>
                               {(item.type=='I')&& 'Individual'}
                               {(item.type=='B')&& 'Business'}
                         </p>
                         {/* <p className='text-muted mb-0'>IT department</p> */}
                   </td>
                   <td>
                         <p className='fw-normal mb-1'>
                                     {item.city}
                         </p>
                   </td>
                   <td>
                         <p className='fw-normal mb-1'>
                                     {item.state}
                         </p>
                   </td>
                         <td>
                               <p className='fw-normal mb-1'>
                                     {item.postalCode}
                               </p>
                         </td>
                   <td>
                         <MDBBadge color='success' pill>
                         Active
                         </MDBBadge>
                   </td>
                   <td>Senior</td>
                   <td>
                         <MDBBtn color='link' rounded size='sm'>
                         Edit
                         </MDBBtn>
                   </td>
                   </tr>
     )}
           
           </MDBTableBody>
         </MDBTable>
                        </Col>
                  </Row>
                  <Row>
                        <div>
                            <Pagination  />
                        </div>
                  </Row>
           </Container>

      )
}

   useEffect( ()=>{
       fetchCustomers(pageNumber);
        
    },[pageNumber])
    
  return (
            (allCustomers==null)? <Spinner animation='grow' /> :<CustomersTale  />      
  );
}        
     


export default CustomersLists