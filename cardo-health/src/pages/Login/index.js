import { useNavigate } from 'react-router-dom';
import { login } from '../../services/users';
import { setToken } from '../../utils/token';
import './styles.scss';

function Login() {
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value,
            password = e.target.password.value;

        login(name, password).then((token) => {
            if (token) {
                setToken(token);
                navigate('/');
            } else {
                window.alert(
                    'The was some problem with the login.\nPlease check the data and try again.'
                );
            }
        });
    };

    return (
        <div className="page-login">
            <div className="page-login-vf page-login-content">
                <img src={process.env.REACT_APP_LOGO} alt="logo" />

                <form
                    className="page-login-vf page-login-form"
                    onSubmit={onSubmit}
                >
                    <input
                        name="name"
                        className="page-login-input"
                        placeholder="User"
                        type="text"
                    />
                    <input
                        name="password"
                        className="page-login-input"
                        placeholder="Password"
                        type="password"
                    />
                    <button
                        className="page-login-input page-login-btn"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
