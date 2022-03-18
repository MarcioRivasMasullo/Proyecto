import { Input, Button } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/decemberBankLogo.png';
import { login as loginButtonStyle } from '../Login/LoginStyles';
import { checkLoginData, checkLoginResponse } from '../../network/ApiClient';
import { transactionListPath } from '../../routes/PathsConstants';

const storageData = (response: checkLoginResponse) => {
  localStorage.setItem('userName', response.data.name);
  localStorage.setItem('userRestData', JSON.stringify(response.data));
  localStorage.setItem('userToken', response.data.token);
};

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    checkLoginData(body)
      .then((resp) => {
        const response: checkLoginResponse = resp.data;
        storageData(response);
        navigate(transactionListPath);
      })
      .catch((resp) => {
        setError(
          'EMAIL O CONTRASEÑA INVALIDOS. POR FAVOR, INTENTE NUEVAMENTE.'
        );
      });
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
          <h5 style={{ color: 'red' }}>{error}</h5>
        </form>
      </div>
    </div>
  );
}

export default Login;
