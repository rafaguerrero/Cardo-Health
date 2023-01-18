import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/token';
import './styles.scss';

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate('/login');
  }

  return (
    <div className="comp-header">
      <Link to="/">
        <img src={process.env.REACT_APP_LOGO} alt="logo"/>
      </Link>

      <div onClick={logout}>
        <img src="/assets/logout.png" alt="logout"/>
      </div>
    </div>
  );
}

export default Header;
