import React, { useState } from 'react'
import { useCustomer } from '../Context/CustomerContext';
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';




const CustomersTale=({dataset,links,pageNumber,meta})=>{
      var [currentPage,setCurrentPage]=useState()
      var [nextPage,setNextPage]=useState()
      var [prevPage,setPrevPage]=useState()
      var [first,setFirst]=useState()
      var [last,setLast]=useState()
      var [links,setLinks]=useState()
      


    
      
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
                 dataset.map(item=>
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
                            <Link to='customers/page/:pageNumber' />  
                        </div>
                  </Row>
           </Container>

      )
}

const   CustomersLists =  () => {

      var {pageNumber}=useParams()

  const {getCustomers,isLoading,setLoading}=useCustomer();

  var [allCustomers,setAllCustomers]=useState([])
  var [forLinks,setForLinks]=useState([])
  var [meta,setMeta]=useState([])
  
  async function  fetchCustomers (){
        const customers=await getCustomers(3);
     setAllCustomers(customers.data) ;
     setForLinks(customers.links)
     setMeta(customers.meta)

     console.log('links',customers)
  }

   useEffect( ()=>{
       fetchCustomers();
    },[])
    

 
  return (
     
      
            (allCustomers==null)? <Spinner animation='grow' /> :<CustomersTale  dataset={allCustomers}  />
      
   
  );
}        
     


export default CustomersLists