import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ email: '', password: '' });


        const apiURL = 'http://localhost:3001/users';

        const fetchUsers = async () => {
            try {
            const response = await axios.get(apiURL);
            setUsers(response.data);
            } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            }
        };

        const deleteUser = async (id) => {
            try {
            await axios.delete(`${apiURL}/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            }
        };

        const editUser = (user) => {
            setEditingUser(user);
            setFormData({ email: user.email, password: '' });
        };

        const saveEdit = async (id) => {
            try {
            const response = await axios.put(`${apiURL}/${id}`, formData);
            setUsers(
                users.map((user) =>
                user._id === id ? { ...user, email: response.data.user.email } : user
                )
            );
            setEditingUser(null);
            setFormData({ email: '', password: '' });
            } catch (error) {
            console.error('Erro ao editar usuário:', error);
            }
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevState) => ({ ...prevState, [name]: value }));
          };
        

        useEffect(() => {
            fetchUsers();
          }, []);
    return ( 
        <div className="d-flex justify-content-center align-items-center vw-100 vh-100 bg-secondary">
            <div className='h-75 w-75 p-3 border d-flex flex-column justify-content-center align-items-center gap-2 bg-white rounded overflow-y-scroll shadow-lg'>

            <h1>Usuários cadastrados</h1>

            <ul className='d-flex flex-column align-items-center list-style-none w-100 gap-2 list-group'>
                {users.map((user) => (
                     <li key={user._id} className='w-75  list-group-item shadow'>
                {editingUser?._id === user._id ? (

                <div>
                    <input
                    className='form-control'
                    type="email"
                    name="email"
                    placeholder="Novo email"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                    <input
                    className='form-control'
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                    <button onClick={() => saveEdit(user._id)}>Salvar</button>
                    <button className='btn btn-danger p-2' onClick={() => setEditingUser(null)}>Cancelar</button>
                </div>
                ) : (

                <div className="d-flex justify-content-between">
                    <span className="text-wrap text-break">{user.email}</span>
                    <div className="d-flex flex-nowrap">
                        <button className='btn btn-primary p-2 mx-2' onClick={() => editUser(user)}>Editar</button>
                        <button className='btn btn-danger p-2' onClick={() => deleteUser(user._id)}>Deletar</button>
                    </div>
                </div>
                )}
            </li>
            ))}
            </ul>
        <Link to="/Home">Gerenciar tarefas</Link>
        </div>
      </div>
     );

    }
 
export default Admin;
<>
</>