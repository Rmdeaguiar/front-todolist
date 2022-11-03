import './styles.css';
import { getItem } from '../../utils/storage'
import api from '../../services/api'

function ModalTask({ setOpenTask, editTask, setEditTask, currentTask, description, setDescription, setNoTask, setUpdate, update, loadTasks }) {
    const userId = getItem('userId');
    const token = getItem('token')

    function handleCloseModal() {
        setOpenTask(false)
        setEditTask(false)
        setDescription('');
        setUpdate(!update)
    }

    async function handleTask(e) {
        e.preventDefault();
        setUpdate(!update)

        if (!description) {
            return
        }

        if (editTask) {
            const response = await api.put(`/task/${currentTask.id}`, {
                description
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                })

            if (response.status > 204) {
                return
            }
            loadTasks()
            setUpdate(!update)
            setNoTask(false)
            setEditTask(false)
            setOpenTask(false);
            setDescription('');
            return
        }

        const response = await api.post(`/task/${userId}`, {
            description
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })



        if (response.status > 204) {
            return
        }
        loadTasks()

        setNoTask(false)
        setOpenTask(false);
        setDescription('');
        setUpdate(!update)
    }

    return (
        <div className='new-task'>
            <form>
                <h1 onClick={() => handleCloseModal()}>X</h1>
                <h2>{editTask ? 'EDITAR TAREFA' : 'ADICIONAR UMA NOVA TAREFA'}</h2>
                <input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={(e) => handleTask(e)} className='green-btn'>{editTask ? 'Salvar Tarefa' : 'Adicionar Tarefa'}</button>
            </form>
        </div>
    );
}

export default ModalTask;


