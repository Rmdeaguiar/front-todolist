import './styles.css';
import Exit from '../../assets/exit-icon.svg'
import { useState } from 'react';
import { getItem, clear } from '../../utils/storage'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const [name, setName] = useState(getItem('userName'));

    function exitLogin() {
        clear();
        navigate("/");
    }

    return (
        <div className='container-header'>
            <div className='welcome-title'>
                <h1>Olá, {name}!</h1>
                <h3>Essas são as suas atividades</h3>
            </div>
            <img src={Exit} alt='exit' onClick={() => exitLogin()} />
        </div>
    );
}

export default Header;


