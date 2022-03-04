import { Input, FormControl, Button } from '@material-ui/core';
import { useState } from 'react';
import logo from '../assets/images/decemberBankLogo.png';
import { login as loginButtonStyle } from './LoginStyles';

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

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
        <form>
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
