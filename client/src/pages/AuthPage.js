import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hooks';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => window.M.updateTextFields(), []);

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log('Data', data);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>sokrati ssilka</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Avtorizasiya</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Vvedi email"
                  id="email"
                  type="text"
                  className="validate"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Vvedi parole"
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Parole</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Zahodi
            </button>
            <button
              className="btn green lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registrazia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
