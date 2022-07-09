import React from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
import './Student.css'
// toast.configure();
function Student() {
  const notify = (message) => {
    toast(message);
  }
  
    const [regNo, setRegNo] = React.useState('');
    const [year, setYear] = React.useState('');
    const [studentData, setStudentData] = React.useState({});
  const [ia, setIa] = React.useState([]);
  const [end, setEnd] = React.useState([]);

    const handleInputRegNo = (data) => {
        const regNo = data.target.value;
        setRegNo(regNo);
    };

    const handleInputYear = (data) => { 
        const year = data.target.value;
        setYear(year);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:4500/api/tiger/v1/student?reg_no=${regNo}&year=${year}`).then(res => {
            if (res.data.statusCode === 200) {
                const studentData = res.data.data;
              setStudentData(studentData);
              setIa(studentData.ia_totals);
              setEnd(studentData.end_totals);
      }
    }
    ).catch(err => {
      console.log(err);
    }
    );
    }

    const handleIaMarks = (event, i) => {
      let iaMarks = ia;
      iaMarks[i].marks = event.target.value;
      setIa([...iaMarks]);

    }
  const handleEndMarks = (event, i) => {
      let endMarks = end;
      endMarks[i].marks = event.target.value;
      setEnd([...endMarks]);
        

  }
  const updateMarks = () => { 
    let student = studentData;
    student.ia_totals = ia;
    student.end_totals = end;
    setStudentData(student);
    let iaMarks = ia.map(i => {
        return {
          marks: i.marks || '0',
          subject: i.subject._id,
        }
    });
    let endMarks = end.map(j => {
        return {
          marks: j.marks || '0',
          subject: j.subject._id,
        }
    });
      setIa([...ia]);
      setEnd([...end]);
    const data = {
      _id: studentData._id,
      iaMarks: iaMarks,
      endMarks: endMarks,
    };
    axios.post('http://localhost:4500/api/tiger/v1/student/update_student', data).then(res => {
      if (res.data.statusCode === 200) {
        notify('Marks Updated Successfully');
        setIa([]);
        setEnd([]);
        setStudentData({});
      }
    }
    ).catch(err => {
      notify(err.message);
      console.log(err);
    }
    );
  }
  return (
    <div className="student">
      <ToastContainer />
          <div className="student__header">
              <div className="student__inputContainer">
                  <form>
                    
                      <input 
                    value={regNo}
                          onChange={handleInputRegNo}
                          placeholder="Enter RegNo"
                      />
                      <input

                          value={year}
                          onChange={handleInputYear}
                          placeholder="Enter Year"
                        />
                      <div className="home__button">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit">Submit</Button>
        </div>
            </form>
        </div>
          </div>
          <div className="student__body">
              <div className="student__left">
                  {ia && ia.map((res, i) => 
                        <div className="student__left__item">
                          <div className="student__label">
                              {res.subject.code}
                          </div>
                          <input
                          value={res.marks}
                          onChange={(e) => handleIaMarks(e, i)}
                          placeholder="Enter Year"
                        />
                      </div>
                    )}
              </div>
              <div className="student__right">
                  {end && end.map((res, i) => 
                        <div className="student__left__item">
                          <div className="student__label">
                              {res.subject.code}
                          </div>
                          <input
                        value={res.marks}
                        key={res._id}
                          onChange={(e) => handleEndMarks(e, i)}
                          placeholder="Enter Year"
                        />
                      </div>
                    )}
              </div>
      </div>
       <div className="student__button">
          <Button variant="contained" color="primary" onClick={updateMarks} type="submit">Submit</Button>
        </div>
    </div>
  )
  
}

export default Student