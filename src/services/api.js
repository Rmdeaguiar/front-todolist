import axios from 'axios';

export default axios.create({
    baseURL: 'https://sualistadetarefas.herokuapp.com/',
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
});


