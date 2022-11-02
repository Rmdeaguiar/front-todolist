import './styles.css';
import { useState, useEffect } from 'react';
import Edit from '../../assets/edit-icon.svg'
import Delete from '../../assets/delete-icon.svg'
import Check from '../../assets/check.svg'
import { getItem } from '../../utils/storage'
import api from '../../services/api'
import ModalTask from '../ModalTask';

function Table() {
    const userId = getItem('userId');
    const token = getItem('token');
    const [openTask, setOpenTask] = useState(false);
    const [editTask, setEditTask] = useState(false)
    const [doneTasks, setDoneTasks] = useState([]);
    const [toDoTasks, setToDoTasks] = useState([]);
    const [description, setDescription] = useState('');
    const [task, setTask] = useState({});
    const [noTask, setNoTask] = useState(true)
    const [taskDoneOk, setTaskDoneOk] = useState(false)


    useEffect(() => {
        loadTasks()
        loadTasksDone()

    }, [openTask]);

    async function loadTasks() {
        const response = await api.get(`/task/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        setToDoTasks(response.data);

    }

    async function loadTasksDone() {
        const responseDone = await api.get(`/done/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        setDoneTasks(responseDone.data);
    }

    function handleEditTask(task) {
        setOpenTask(true);
        setEditTask(true);
        setTask(task)
        setDescription(task.description);
    }

    async function handleDeleteTask(task) {
        const response = await api.delete(`/task/${task.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        loadTasks()
    }

    async function handleDeleteTaskDone(task) {
        const response = await api.delete(`/done/${task.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        loadTasksDone()
    }

    async function handleCheckTask(task) {

        const response = await api.post(`/done/${userId}`, {
            idTask: task.id,
            description: task.description
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        loadTasks()
        loadTasksDone()
    }



    return (
        <>
            <div className='container-table'>
                <div className='table'>
                    <div className='table-title table-to-do'>
                        <h2>To-Do</h2>
                        <h4 onClick={() => setOpenTask(true)}>Nova Tarefa +</h4>
                    </div>
                    {!noTask ? toDoTasks.map((task) => (
                        <div key={task.id} className='tasks-list'>
                            <p>{task.description}</p>
                            <div className='icons'>
                                <img src={Check} onClick={() => handleCheckTask(task)} alt='check' />
                                <img src={Edit} onClick={() => handleEditTask(task)} alt='editar' />
                                <img src={Delete} onClick={() => handleDeleteTask(task)} alt='deletar' />
                            </div>
                        </div>
                    )) :
                        <div className='tasks-list'>
                            <h3>Não existem tarefas a fazer</h3>
                        </div>
                    }

                </div>
                <div className='table'>
                    <div className='table-title table-done'>
                        <h2>Done</h2>
                    </div>
                    {taskDoneOk ? doneTasks.map((task) => (
                        <div key={task.id} className='tasks-list'>
                            <p>{task.description}</p>
                            <div className='icons'>
                                <img src={Delete} onClick={() => handleDeleteTaskDone(task)} alt='deletar' />
                            </div>
                        </div>
                    )) :
                        <div className='tasks-list'>
                            <h3>Você ainda não concluiu nenhuma tarefa</h3>
                        </div>}

                </div>

            </div>
            {openTask &&
                <ModalTask
                    setOpenTask={setOpenTask}
                    openTask={openTask}
                    setEditTask={setEditTask}
                    editTask={editTask}
                    task={task}
                    description={description}
                    setDescription={setDescription}
                />}
        </>
    );
}

export default Table;


