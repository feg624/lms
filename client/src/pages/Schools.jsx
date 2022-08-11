import React, { useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import axios from 'axios';

const Schools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const getSchools = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/schools`, {
          withCredentials: true
        });
        setSchools(resp.data);
      }
      catch (err) {
        setSchools([]);
      }
    };
    getSchools();
  }, []);

  return (
    <Container>
      <h3 className='h3 m-3'>Schools</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {schools.map(s =>
            <tr key={s.id}>
              <th scope="row">{s.id}</th>
              <td>{s.name}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Schools;
