import React, { useState, useEffect } from 'react';
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useSearchParams } from 'react-router-dom';

const Login = () => {

  const [ searchParams ] = useSearchParams();
  const [ oauthLoginFailure, setOauthLoginFailure ] = useState(searchParams.get('oauth_login_failure') === 'true');
  const [ localLoginFailure, setLocalLoginFailure ] = useState(searchParams.get('local_login_failure') === 'true');

  const onDismissOauthLoginFailure = () => setOauthLoginFailure(false);
  const onDismissLocalLoginFailure = () => setLocalLoginFailure(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (oauthLoginFailure) setOauthLoginFailure(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [oauthLoginFailure]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localLoginFailure) setLocalLoginFailure(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [localLoginFailure]);

  const google = () => {
    window.open(`${process.env.REACT_APP_BACKEND_DOMAIN}/auth/google`, '_self');
  };

  return (
    <Container>
      <h2 className='text-center mt-3'>Choose a login method</h2>
      <div className='d-flex align-items-stretch'>
        <Form className='border border-2 p-3 m-3 flex-grow-1'>
          <Alert color="danger" isOpen={oauthLoginFailure} toggle={onDismissOauthLoginFailure}>Couldn't authenticate with 3rd party provider.</Alert>
          <GoogleLoginButton onClick={google}/>
        </Form>
        <Form className='border border-2 p-3 m-3 flex-grow-1' method='POST' action={`${process.env.REACT_APP_BACKEND_DOMAIN}/auth/login`}>
          <Alert color="danger" isOpen={localLoginFailure} toggle={onDismissLocalLoginFailure}>Invalid email and/or password.</Alert>
          <FormGroup>
            <Label>Email</Label>
            <Input id='email' name='email' type='emai'/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input id='password' name='password' type='password'/>
          </FormGroup>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
