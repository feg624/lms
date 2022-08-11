import React, { useState, useEffect } from 'react';
import { Container, Table, Input } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeacherCourses = () => {
  const { teacherId } = useParams('teacherId');
  const [teacherCourses, setTeacherCourses] = useState([]);

  useEffect(() => {
    const getTeacherCourses = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/teachers/${teacherId}/courses`, {
          withCredentials: true
        });
        setTeacherCourses(resp.data);
      }
      catch (err) {
        setTeacherCourses([]);
      }
    };
    getTeacherCourses();
  }, [teacherId]);

  return (
    <Container>
      <h3 className='h3 m-3'>Teacher Courses</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Attendees</th>
          </tr>
        </thead>
        <tbody>
          {teacherCourses.map(course => {
            return (
              course.attendees.map((attendee, index) =>
                <tr key={course.id + '_' + index}>
                  {(index === 0) ? (
                    <>
                      <th scope="row" rowSpan={course.attendees.length}>{course.id}</th>
                      <td rowSpan={course.attendees.length}>{course.name}</td>
                    </>
                  ) : null}
                  <td>{attendee}</td>
                </tr>
              )
            )
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeacherCourses;
