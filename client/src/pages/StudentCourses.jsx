import React, { useState, useEffect } from 'react';
import { Container, Table, Input } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentCourses = () => {
  const { studentId } = useParams('studentId');
  const [studentCourses, setStudentCourses] = useState([]);

  useEffect(() => {
    const getStudentCourses = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/students/${studentId}/courses`, {
          withCredentials: true
        });
        setStudentCourses(resp.data);
      }
      catch (err) {
        setStudentCourses([]);
      }
    };
    getStudentCourses();
  }, [studentId]);

  return (
    <Container>
      <h3 className='h3 m-3'>Student Courses</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {studentCourses.map(course => {
            return (
              <tr key={course.id}>
                <th scope="row">{course.id}</th>
                <td>{course.name}</td>
                <td>{course.teacher}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentCourses;
