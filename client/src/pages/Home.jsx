import React from 'react';
import { Container } from 'reactstrap';

const Home = () => {
  return (
    <Container style={{height: 'calc(100vh - 56px)'}}>
      <div className='d-flex flex-column h-100 justify-content-center'>
        <div className='d-flex w-100 justify-content-center'>
          <h1 className='h1'>Welcome to the Learning Management System</h1>
        </div>
      </div>
    </Container>
  );
};

export default Home;
