import React from 'react';

export const AuthPage = () => {
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
                />
                <label htmlFor="password">Parole</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }}>
              Zahodi
            </button>
            <button className="btn green lighten-1 black-text">
              Registrazia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
