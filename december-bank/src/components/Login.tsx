import { Input, FormControl, Button } from '@material-ui/core';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../assets/images/decemberBankLogo.png';
import Home from './Home';
import { login as loginButtonStyle } from './LoginStyles';

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    // Deberia hacer el chequeo del par (email,password)
    localStorage.setItem('usuarioAutenticado', 'true');
    console.log(localStorage.getItem('usuarioAutenticado'));
    navigate('/home');
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
