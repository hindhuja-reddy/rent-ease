import React, { useState } from 'react';
import { Container, Button, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

function AddProperty() {
   const [image, setImage] = useState(null);
   const [propertyDetails, setPropertyDetails] = useState({
      propertyType: 'residential',
      propertyAdType: 'rent',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });

   const handleImageChange = (e) => {
      const files = e.target.files;
      setImage(files);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!image || image.length === 0) {
         message.error('Please select at least one image');
         return;
      }

      try {
         const formData = new FormData();
         formData.append('propertyType', propertyDetails.propertyType);
         formData.append('propertyAdType', propertyDetails.propertyAdType);
         formData.append('propertyAddress', propertyDetails.propertyAddress);
         formData.append('ownerContact', propertyDetails.ownerContact);
         formData.append('propertyAmt', propertyDetails.propertyAmt);
         formData.append('additionalInfo', propertyDetails.additionalInfo);

         // Append all selected images
         for (let i = 0; i < image.length; i++) {
            formData.append('propertyImages', image[i]);
         }

         const res = await axios.post(
            'http://localhost:8001/api/owner/postproperty', 
            formData, 
            {
               headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
               }
            }
         );

         if (res.data.success) {
            message.success(res.data.message);
            
            // Reset form after successful submission
            setPropertyDetails({
               propertyType: 'residential',
               propertyAdType: 'rent',
               propertyAddress: '',
               ownerContact: '',
               propertyAmt: 0,
               additionalInfo: ''
            });
            setImage(null);
            
            // Reset file input
            e.target.reset();
         } else {
            message.error(res.data.message);
         }
      } catch (error) {
         console.error('Error adding property:', error);
         if (error.response?.status === 401) {
            message.error('Session expired. Please login again.');
         } else {
            message.error('Failed to add property. Please try again.');
         }
      }
   };

   return (
      <Container style={{ border: '1px solid lightblue', borderRadius: '5px', padding: '30px' }}>
         <h3 className="mb-4">Add New Property</h3>
         <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
               <Form.Group as={Col} md="4">
                  <Form.Label>Property type</Form.Label>
                  <Form.Select 
                     name='propertyType' 
                     value={propertyDetails.propertyType} 
                     onChange={handleChange}
                     required
                  >
                     <option value="">Choose...</option>
                     <option value="residential">Residential</option>
                     <option value="commercial">Commercial</option>
                     <option value="land/plot">Land/Plot</option>
                  </Form.Select>
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Label>Property Ad type</Form.Label>
                  <Form.Select 
                     name='propertyAdType' 
                     value={propertyDetails.propertyAdType} 
                     onChange={handleChange}
                     required
                  >
                     <option value="">Choose...</option>
                     <option value="rent">Rent</option>
                     <option value="sale">Sale</option>
                  </Form.Select>
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Label>Property Full Address</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Address"
                     required
                     name='propertyAddress'
                     value={propertyDetails.propertyAddress}
                     onChange={handleChange}
                  />
               </Form.Group>
            </Row>
            <Row className="mb-3">
               <Form.Group as={Col} md="6">
                  <Form.Label>Property Images</Form.Label>
                  <Form.Control
                     type="file"
                     placeholder="images"
                     required
                     accept="image/*"
                     name="images"
                     multiple
                     onChange={handleImageChange}
                  />
                  <Form.Text className="text-muted">
                     You can select multiple images
                  </Form.Text>
               </Form.Group>
               <Form.Group as={Col} md="3">
                  <Form.Label>Owner Contact No.</Form.Label>
                  <Form.Control 
                     type="tel" 
                     placeholder="contact number" 
                     required
                     name='ownerContact'
                     value={propertyDetails.ownerContact}
                     onChange={handleChange}
                  />
               </Form.Group>
               <Form.Group as={Col} md="3">
                  <Form.Label>Property Amount</Form.Label>
                  <Form.Control 
                     type="number" 
                     placeholder="amount" 
                     required
                     name='propertyAmt'
                     value={propertyDetails.propertyAmt}
                     onChange={handleChange}
                     min="0"
                  />
               </Form.Group>
            </Row>
            <Row className="mb-3">
               <Form.Group as={Col}>
                  <FloatingLabel label="Additional details for the Property">
                     <Form.Control 
                        name='additionalInfo' 
                        value={propertyDetails.additionalInfo} 
                        onChange={handleChange} 
                        as="textarea" 
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                     />
                  </FloatingLabel>
               </Form.Group>
            </Row>
            <div className="d-flex justify-content-end">
               <Button variant='primary' type="submit">
                  Add Property
               </Button>
            </div>
         </Form>
      </Container>
   );
}

export default AddProperty;