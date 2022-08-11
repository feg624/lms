import React, { useState, useEffect } from 'react';
import { Container, Table, Input } from 'reactstrap';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/users`, {
          withCredentials: true
        });
        setUsers(resp.data);
      }
      catch (err) {
        setUsers([]);
      }
    };
    getUsers();
  }, []);

  return (
    <Container>
      <h3 className='h3 m-3'>Users</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th align='center'>Super Admin</th>
            <th>School</th>
            <th>Admin</th>
            <th>Teacher</th>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u =>
            <tr key={u.id}>
              <th scope="row">{u.id}</th>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td align='center'><Input type="checkbox" checked={u.superAdmin != null} readOnly/></td>
              <td>{u.school?.name}</td>
              <td align='center'><Input type="checkbox" checked={(u.schoolAdmin != null)} readOnly/></td>
              <td align='center'><Input type="checkbox" checked={(u.teacher != null)} readOnly/></td>
              <td align='center'><Input type="checkbox" checked={(u.student != null)} readOnly/></td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
