import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CloseEye from '../../assets/closeEye.svg'
import OpenEye from '../../assets/openEye.svg'
import api from '../../services/api';
import { setItem, getItem } from '../../utils/storage';


export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = getItem('token');

        if (token) {
            navigate('/home');
        }
    }, [navigate]);


    async function handleLogin(e) {
        e.preventDefault();
        setError(false)

        try {
            if (!email || !password) {
                return;
            }
            const response = await api.post('/login', {
                email,
                password
            })

            console.log(response);

            if (response.status > 204) {
                return
            }

            const { token, user } = response.data;
            setItem('token', token);
            setItem('userId', user.id);
            setItem('userName', user.name);

            navigate('/home')

        } catch (error) {
            console.log(error.response.data)
            setError(true)

        }
    }




    return (
        <div className="container-login">
            <div className='background'></div>
            <div className='content-login'>
                <h3>Bem-vindo!</h3>
                <h1>Faça login com sua conta</h1>
                <div className='form-login'>
                    <form onSubmit={handleLogin}>
                        <label htmlFor='email'>E-mail</label>
                        <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor='password'>Senha</label>
                        <input type={!showPassword ? 'password' : 'text'} name='password' onChange={(e) => setPassword(e.target.value)} />
                        {error && <span>O e-mail e a senha não coincidem</span>}
                        <img src={!showPassword ? CloseEye : OpenEye} alt='eye' onClick={() => setShowPassword(!showPassword)} />
                        <button className='green-btn'>Entrar</button>
                    </form>
                </div>
                <p>Ainda não tem uma conta? <span onClick={() => navigate('/signup')}>Faça seu cadastro aqui</span></p>
            </div>

        </div>
    );

}

