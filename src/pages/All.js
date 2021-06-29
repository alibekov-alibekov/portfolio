import React, { useState} from 'react';
import {
    Card,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Container,
    Row,
    Col,
} from 'reactstrap';

const All = ({ contacts, searchText }) => {
    const [ allContacts, setAllContacts ] = React.useState(contacts);
    const [edit, setEdit] = React.useState(false);
    const [editObj, setEditObj] = React.useState(null);
    const [modal, setModal] = React.useState(false);
    const toggle = () => {
        setModal(!modal)
        if(edit){
            setEdit(false)
        }
    };
    const nameRef = React.useRef();
    const phoneRef = React.useRef();
    const emailRef = React.useRef();
    const companyRef = React.useRef();
    const famRef = React.useRef();
    const frRef = React.useRef();
    const favRef = React.useRef();

    const Delete = (id) => {
        let allObj = [];
        allContacts.map((contact, index) => {
            index !== id ? allObj.push(contact) : console.log();
            return true;
        });

        setAllContacts(allObj);
        delete contacts[id];
    }

    const Add = () => {
        if(!edit){
            setEdit(false);
            let newContact = {
                full_name: nameRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                company: companyRef.current.value,
                isFam: famRef.current.checked,
                isFr: frRef.current.checked,
                isFav: favRef.current.checked,
               
            }
    
            let con = [];
            con.push(newContact);
            allContacts.map(contact => {
                con.push(contact);
                return true
            })
            contacts.push(newContact);
            toggle();

        } else {
            let editContact = {
                full_name: nameRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                company: companyRef.current.value,
                isFam: famRef.current.checked,
                isFr: frRef.current.checked,
                isFav: favRef.current.checked,
               
            }
            let contactEdit = [];
            allContacts.map((contact, index)=>{
                contactEdit.push(contact);
                return true
            });
            contactEdit[editObj] = editContact;
            setAllContacts(contactEdit);
            contacts = contactEdit;
            toggle();
        }
    }
    const Edit = (obj, index) => {
        setEdit(true);
        setEditObj(index);
        toggle();
        setTimeout(function() {
            nameRef.current.value = obj.full_name ;
            phoneRef.current.value = obj.phone;
            emailRef.current.value = obj.email;
            companyRef.current.value = obj.company;
            famRef.current.checked = obj.isFam;
            frRef.current.checked = obj.isFr;
            favRef.current.checked = obj.isFav;

        }, 200);

    }
    console.log(searchText);
    return(
        <>
            <div className="content">
            <div className="text-end">
                <Button color="success" className="m-2" onClick={toggle}><i className="fas fa-plus"></i> Add</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    {edit ?
                        <ModalHeader toggle={toggle}> Edit Contact</ModalHeader>
                        :
                        <ModalHeader toggle={toggle}> Add Contact</ModalHeader>
                        
                    }
                    <ModalBody>
                       <Container fluid>
                           <Row>
                               <Col md='6'>
                               <div className='mb-2'>
                                   <label htmlFor='name' className='form-label'>
                                    Full Name
                                   </label>
                                   <input type='text' className='from-control' ref={nameRef}/>
                               </div>
                               </Col>
                               <Col md='6'>
                               <div className='mb-2'>
                                   <label htmlFor='phone' className='form-label'>
                                    Phone Number
                                   </label>
                                   <input type='text' className='from-control' ref={phoneRef}/>
                               </div>
                               </Col>
                               <Col sm='12'>
                               <div className='mb-2'>
                                   <label htmlFor='email' className='form-label'>
                                    Email
                                   </label>
                                   <input type='email' className='from-control' ref={emailRef}/>
                               </div>
                               </Col>
                               <Col sm='12'>
                               <div className='mb-2'>
                                   <label htmlFor='company' className='form-label'>
                                    Company
                                   </label>
                                   <input type='text' className='from-control' ref={companyRef}/>
                               </div>
                               </Col>
                               <Col className='d-flex justify-content-between'>
                               
                               <div>
                                 <div className='my-3 form-check'>
                                     <input type='checkbox' ref={famRef} className='form-check-input' id='exampleCheck1'/>
                                    <label className='form-check-label' for='exampleCheck1'>Family</label>
                                 </div>
                               </div>
                               <div>
                                 <div className='my-3 form-check'>
                                     <input type='checkbox' ref={frRef} className='form-check-input' id='exampleCheck1'/>
                                    <label className='form-check-label' for='exampleCheck1'>Friends</label>
                                 </div>
                               </div>
                               <div>
                                 <div className='my-3 form-check'>
                                     <input type='checkbox' ref={favRef} className='form-check-input' id='exampleCheck1'/>
                                    <label className='form-check-label' for='exampleCheck1'>Favourites</label>
                                 </div>
                               </div>
                               </Col>

                           </Row>
                       </Container>
                    </ModalBody>
                    <ModalFooter>
                        {
                            edit ?
                            <Button color="primary" onClick={Add}>Edit</Button>
                            :
                            <Button color="primary" onClick={Add}>Save</Button>
                            

                        }
                    <Button color="secondary" onClick={()=>{toggle(); setEdit(false);}}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                </div>
                 <div className="table-responsive">

                    <table className="table">
                      <Card>
                            <h2 className='m-2'>All Contacts</h2>
                            <table className='table'>
                                <thead>
                                    <tr>
                                      
                                        <th>Full Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Company</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allContacts.map((contact, index)=>{
                                            if(contact.full_name.toLowerCase().indexOf(searchText.toLowerCase()) === -1){
                                                return;
                                                
                                            }else {
                                                if(contact !== undefined) {
                                                    return(
                                                        <tr key={index}>
                                                          
                                                            <td>{ contact.full_name }</td>
                                                            <td>{ contact.phone }</td>
                                                            <td>{ contact.email }</td>
                                                            <td>{ contact.company }</td>
                                                            <td className='btn-group'>
                                                                <Button className='btn btn-info' onClick={()=> Edit(contact, index)}>
                                                                <i  className="fas fa-edit text-white"></i>
                                                                </Button>
                                                                <Button className='btn btn-danger' onClick={()=> Delete(index)}>
                                                                <i  className="fas fa-trash text-white"></i>
        
                                                                </Button>
                                                            
                                                            </td>
                                                        </tr>
                                                    )

                                                }
                                            } return true
                                        }
                                        )
                                    }
                                </tbody>
                            </table>

                            </Card>
                    </table>
                    </div>
              
            </div>
        </>
    )
}

export default All; 
