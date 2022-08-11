import React, { useState, useEffect } from 'react';
import { Container, Table, Input } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SchoolUsers = () => {
  const { schoolId } = useParams('schoolId');
  const [schoolUsers, setSchoolUsers] = useState([]);

  useEffect(() => {
    const getSchoolUsers = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/schools/${schoolId}/users`, {
          withCredentials: true
        });
        setSchoolUsers(resp.data);
      }
      catch (err) {
        setSchoolUsers([]);
      }
    };
    getSchoolUsers();
  }, [schoolId]);

  return (
    <Container>
      <h3 className='h3 m-3'>School Users</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Teacher</th>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          {schoolUsers.map(su =>
            <tr key={su.id}>
              <th scope="row">{su.id}</th>
              <td>{su.name}</td>
              <td>{su.email}</td>
              <td align='center'><Input type="checkbox" checked={(su.schoolAdmin != null)} readOnly/></td>
              <td align='center'><Input type="checkbox" checked={(su.teacher != null)} readOnly/></td>
              <td align='center'><Input type="checkbox" checked={(su.student != null)} readOnly/></td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SchoolUsers;
