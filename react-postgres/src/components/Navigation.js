import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink to="/">My Team</NavLink>
            </td>
            <td>
              <NavLink to="/login">Login</NavLink>
            </td>
            <td>
              <NavLink to="/register">Register</NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Navigation;