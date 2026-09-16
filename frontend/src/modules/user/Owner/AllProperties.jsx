import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Form, Modal, Col, InputGroup, Row, FloatingLabel } from 'react-bootstrap';

const AllProperties = () => {
   const [image, setImage] = useState(null);
   const [editingPropertyId, setEditingPropertyId] = useState(null);
   const [editingPropertyData, setEditingPropertyData] = useState({
      propertyType: '',
      propertyAdType: '',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });
   const [allProperties, setAllProperties] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => {
      setShow(false);
      setImage(null);
      setEditingPropertyId(null);
   };

   const handleShow = (propertyId) => {
      const propertyToEdit = allProperties.find(property => property._id === propertyId);
      if (propertyToEdit) {
         setEditingPropertyId(propertyId);
         setEditingPropertyData(propertyToEdit);
         setImage(null);
         setShow(true);
      }
   };

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallproperties', {
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error('Something went wrong');
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to load properties');
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingPropertyData({ ...editingPropertyData, [name]: value });
   };

   const saveChanges = async (e, propertyId) => {
      e.preventDefault();
      
      console.log('=== UPDATE DEBUG ===');
      console.log('Property ID:', propertyId);
      console.log('Editing data:', editingPropertyData);
      console.log('Image:', image);
      console.log('===================');
      
      try {
         const formData = new FormData();
         formData.append('propertyType', editingPropertyData.propertyType);
         formData.append('propertyAdType', editingPropertyData.propertyAdType);
         formData.append('propertyAddress', editingPropertyData.propertyAddress);
         formData.append('ownerContact', editingPropertyData.ownerContact);
         formData.append('propertyAmt', editingPropertyData.propertyAmt);
         formData.append('additionalInfo', editingPropertyData.additionalInfo || '');
         formData.append('isAvailable', 'Available');
         
         if (image) {
            formData.append('propertyImage', image);
         }

         const res = await axios.patch(
            `http://localhost:8001/api/owner/updateproperty/${propertyId}`, 
            formData, 
            {
               headers: { 
                  'Authorization': `Bearer ${sessionStorage.getItem("token")}`
               }
            }
         );

         console.log('Update response:', res.data);

         if (res.data.success) {
            message.success(res.data.message || 'Property updated successfully');
            handleClose();
            getAllProperty();
         } else {
            message.error(res.data.message || 'Failed to update property');
         }
      } catch (error) {
         console.log('Update error:', error);
         console.log('Error response:', error.response?.data);
         message.error(error.response?.data?.message || 'Failed to save changes');
      }
   };

   const handleDelete = async (propertyId) => {
      const assure = window.confirm("Are you sure you want to delete this property?");
      
      if (assure) {
         console.log('=== DELETE DEBUG ===');
         console.log('Property ID:', propertyId);
         console.log('Token:', sessionStorage.getItem("token"));
         console.log('===================');
         
         try {
            const response = await axios.delete(
               `http://localhost:8001/api/owner/deleteproperty/${propertyId}`, 
               {
                  headers: { 
                     'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
                  }
               }
            );

            console.log('Delete response:', response.data);

            if (response.data.success) {
               message.success(response.data.message || 'Property deleted successfully');
               getAllProperty();
            } else {
               message.error(response.data.message || 'Failed to delete property');
            }
         } catch (error) {
            console.log('Delete error:', error);
            console.log('Error response:', error.response?.data);
            
            if (error.response?.status === 401) {
               message.error('Session expired. Please login again.');
            } else if (error.response?.status === 404) {
               message.error('Property not found');
            } else {
               message.error(error.response?.data?.message || 'Failed to delete property');
            }
         }
      }
   };

   return (
      <div>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Property ID</TableCell>
                     <TableCell align="center">Property Type</TableCell>
                     <TableCell align="center">Property Ad Type</TableCell>
                     <TableCell align="center">Property Address</TableCell>
                     <TableCell align="center">Owner Contact</TableCell>
                     <TableCell align="center">Property Amt</TableCell>
                     <TableCell align="center">Property Availability</TableCell>
                     <TableCell align="center">Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allProperties.map((property) => (
                     <TableRow
                        key={property._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {property._id}
                        </TableCell>
                        <TableCell align="center">{property.propertyType}</TableCell>
                        <TableCell align="center">{property.propertyAdType}</TableCell>
                        <TableCell align="center">{property.propertyAddress}</TableCell>
                        <TableCell align="center">{property.ownerContact}</TableCell>
                        <TableCell align="center">{property.propertyAmt}</TableCell>
                        <TableCell align="center">{property.isAvailable}</TableCell>
                        <TableCell align="center">
                           <Button 
                              variant='outline-info' 
                              onClick={() => handleShow(property._id)}
                           >
                              Edit
                           </Button>
                           
                           <Modal show={show && editingPropertyId === property._id} onHide={handleClose}>
                              <Modal.Header closeButton>
                                 <Modal.Title>Edit Property</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                 <Form onSubmit={(e) => saveChanges(e, property._id)}>
                                    <Row className="mb-3">
                                       <Form.Group as={Col} md="4">
                                          <Form.Label>Property type</Form.Label>
                                          <Form.Select
                                             name='propertyType'
                                             value={editingPropertyData.propertyType}
                                             onChange={handleChange}
                                             required
                                          >
                                             <option value="" disabled>Choose...</option>
                                             <option value="residential">Residential</option>
                                             <option value="commercial">Commercial</option>
                                             <option value="land/plot">Land/Plot</option>
                                          </Form.Select>
                                       </Form.Group>
                                       <Form.Group as={Col} md="4">
                                          <Form.Label>Property Ad type</Form.Label>
                                          <Form.Select 
                                             name='propertyAdType' 
                                             value={editingPropertyData.propertyAdType} 
                                             onChange={handleChange}
                                             required
                                          >
                                             <option value="" disabled>Choose...</option>
                                             <option value="rent">Rent</option>
                                             <option value="sale">Sale</option>
                                          </Form.Select>
                                       </Form.Group>
                                       <Form.Group as={Col} md="4">
                                          <Form.Label>Property Full Address</Form.Label>
                                          <InputGroup hasValidation>
                                             <Form.Control
                                                type="text"
                                                placeholder="Address"
                                                required
                                                name='propertyAddress'
                                                value={editingPropertyData.propertyAddress}
                                                onChange={handleChange}
                                             />
                                          </InputGroup>
                                       </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                       <Form.Group as={Col} md="6">
                                          <Form.Label>Property Image (optional)</Form.Label>
                                          <Form.Control
                                             type="file"
                                             placeholder="image"
                                             accept='image/*'
                                             name='image'
                                             onChange={handleImageChange}
                                          />
                                          <Form.Text className="text-muted">
                                             Leave empty to keep existing image
                                          </Form.Text>
                                       </Form.Group>
                                       <Form.Group as={Col} md="3">
                                          <Form.Label>Owner Contact No.</Form.Label>
                                          <Form.Control 
                                             type="tel" 
                                             placeholder="contact number" 
                                             required
                                             name='ownerContact'
                                             value={editingPropertyData.ownerContact}
                                             onChange={handleChange}
                                          />
                                       </Form.Group>
                                       <Form.Group as={Col} md="3">
                                          <Form.Label>Property Amt.</Form.Label>
                                          <Form.Control 
                                             type="number" 
                                             placeholder="amount" 
                                             required
                                             name='propertyAmt'
                                             value={editingPropertyData.propertyAmt}
                                             onChange={handleChange}
                                          />
                                       </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                       <Form.Group as={Col}>
                                          <FloatingLabel label="Additional details for the Property">
                                             <Form.Control 
                                                name='additionalInfo' 
                                                value={editingPropertyData.additionalInfo} 
                                                onChange={handleChange} 
                                                as="textarea" 
                                                placeholder="Leave a comment here"
                                                style={{ height: '100px' }}
                                             />
                                          </FloatingLabel>
                                       </Form.Group>
                                    </Row>
                                    <div className="d-flex justify-content-end">
                                       <Button 
                                          variant='secondary' 
                                          onClick={handleClose}
                                          className="me-2"
                                       >
                                          Cancel
                                       </Button>
                                       <Button 
                                          type='submit' 
                                          variant='primary'
                                       >
                                          Update Property
                                       </Button>
                                    </div>
                                 </Form>
                              </Modal.Body>
                           </Modal>

                           <Button 
                              className='mx-2' 
                              variant='outline-danger' 
                              onClick={() => handleDelete(property._id)}
                           >
                              Delete
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default AllProperties;