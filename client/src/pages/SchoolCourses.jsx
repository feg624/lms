import React, { useState, useEffect } from 'react';
import { Container, Table, Input } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SchoolCourses = () => {
  const { schoolId } = useParams('schoolId');
  const [schoolCourses, setSchoolCourses] = useState([]);

  useEffect(() => {
    const getSchoolCourses = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/schools/${schoolId}/courses`, {
          withCredentials: true
        });
        setSchoolCourses(resp.data);
      }
      catch (err) {
        setSchoolCourses([]);
      }
    };
    getSchoolCourses();
  }, [schoolId]);

  return (
    <Container>
      <h3 className='h3 m-3'>School Courses</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {schoolCourses.map(c =>
            <tr key={c.id}>
              <th scope="row">{c.id}</th>
              <td>{c.name}</td>
              <td>{c.teacher.name}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SchoolCourses;
