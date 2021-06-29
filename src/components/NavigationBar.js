import React from 'react';
import {
    Container, 
    Row,
    Col
} from 'reactstrap';
import PhoneImg from '../media/phone.png';
import UserImg from '../media/profile.png';

function NavigationBar({setSearchText, setAuth}) {
    const searchRef = React.useRef();

    const onSearchChange = () => {
        setSearchText(searchRef.current.value)
    }

     const LogOut = () => {
         const aa = window.confirm('Rostan ham chiqasizmi');
         if(aa){
             window.localStorage.removeItem('email');
             setAuth(false);
         }else {
             console.log();
         }
     }
    
    
    return(
        <>
        <div className="navbar-div">
            <Container fluid>
                <Row>
              <Col className=' py-2 ' sm={{size:3}} md={{size:2}}>
                  <img className='logo-img' src={PhoneImg} alt='phone'>

                  </img>
              </Col>  
              <Col className='py-2 align-item-center d-flex' md={{size:6 , offset: 1}} sm={{size:6, offset:0}}>
                  <input onChange={onSearchChange} ref={searchRef} placeholder='Search' type='search' className=' form-control search-input p-2'>
                  </input>
              </Col>  
              <Col className='text-end py-2 ' sm={{size:3}} md={{size:2 , offset:1}}>
                <span onClick={LogOut}> 
                  <img className='logo-img' src={UserImg} alt='phone'/>
                  </span>
                  
              </Col>
                </Row>
            </Container>
        </div>
            
        </>
    )
}

export default NavigationBar;