import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CloseEye from '../../assets/closeEye.svg'
import OpenEye from '../../assets/openEye.svg'
import api from '../../services/api';

export default function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [error, setError] = useState(false)

    function handleChangeForm(e) {
        setErrorEmail(false)
        setError(false)
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleClearInput() {
        setForm({ name: '', email: '', password: '' });
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!form.name || !form.email || !form.password) {
                setError(true)
                return;
            }

            const response = await api.post('/sign-up', {
                name: form.name,
                email: form.email,
                password: form.password
            })

            if (response.status > 204) {
                return
            }

            navigate('/')

        } catch (error) {
            console.log(error.response.data)
            setErrorEmail(true)
        }
    }

    return (
        <div className="container-signup">
            <div className='content-signup'>
                <h1>Cadastre-se</h1>
                <div className='form-signup'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' name='name' value={form.name} onChange={(e) => handleChangeForm(e)} />
                        <label htmlFor='email'>E-mail</label>
                        <input type='email' name='email' value={form.email} onChange={(e) => handleChangeForm(e)} />
                        {errorEmail && <span>Este e-mail já existe</span>}
                        <label htmlFor='password'>Senha</label>
                        <input type={!showPassword ? 'password' : 'text'} name='password' value={form.password} onChange={(e) => handleChangeForm(e)} />
                        <img src={!showPassword ? CloseEye : OpenEye} alt='eye' onClick={() => setShowPassword(!showPassword)} />
                        {error && <span>Todos os campos são obrigatórios!</span>}
                        <button className='green-btn'>Cadastrar</button>
                        <button type='button' className='red-btn' onClick={() => handleClearInput()}>Cancelar</button>
                    </form>
                </div>
                <p>Já tem cadastro? <span onClick={() => navigate('/')}>Clique aqui para o login!</span></p>
            </div>
            <div className='background'></div>
        </div>
    );

}

