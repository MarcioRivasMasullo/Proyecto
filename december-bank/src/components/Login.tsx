import { Input, FormControl, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../assets/images/decemberBankLogo.png';
import { login as loginButtonStyle } from './LoginStyles';
import axios from 'axios';
import { checkLoginData } from '../network/ApiClient';

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Arranca');
  }, []);

  const handleFormSubmit = () => {
    const body = {
      email,
      password,
    };

    // checkLoginData(body)
    //   .then((resp) => {
    //     console.log(resp.request);
    //     //localStorage.setItem('respStatus', JSON.stringify(resp.status));
    //     //navigate('/home');
    //   })
    //   .catch((resp) => {
    //     console.log('hubo un error');
    //   });

    // localStorage.setItem('usuarioAutenticado', JSON.stringify('true'));
  };

  return (
    <div>
      <img
        src={logo}
        alt="DB Logo"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '22%',
          marginTop: '10%',
        }}
      ></img>
      <div
        style={{
          width: '25%',
          margin: 'auto',
        }}
      >
        <p style={{ textAlign: 'center', fontSize: '25px' }}>
          INGRESE SUS DATOS PARA CONTINUAR
        </p>
        <form onSubmit={handleFormSubmit}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            style={{ fontFamily: 'Times New Roman' }}
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            fullWidth
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            style={{ fontFamily: 'Times New Roman' }}
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            fullWidth
          />
          <br></br>
          <Button
            disabled={!email || !password}
            type="submit"
            style={loginButtonStyle}
            size="large"
            fullWidth
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
