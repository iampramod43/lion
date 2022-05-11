import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Button } from '@mui/material';
import './Home.css'
function Home() {
  const [branch, setBranch] = React.useState('');
  const [sem, setSem] = React.useState(1);
  const [students, setStudents] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [subject, setSubject] = React.useState('');
  const [student, setStudent] = React.useState('');
  const [iaMarks, setIaMarks] = React.useState([{}]);
  const [seeMarks, setSeeMarks] = React.useState([{}]);
  const [input, setInput] = React.useState('');
    const [branchList, setBranchList] = React.useState([]);
    
    React.useEffect(() => {
      axios.get('http://localhost:4500/api/tiger/v1/branch/get_all').then(res => {
         console.log(res.data);
        setBranchList(res.data.data);
      }
      ).catch(err => {
        console.log(err);
      }
      );
    }, []);

  const handleChange = (event) => {
    const branch = event.target.value;
    setBranch(branch);
    if (branch && sem) {
        console.log("sem", sem);
      axios.get(`http://localhost:4500/api/tiger/v1/students?sem=${sem}&branch=${branch.short_name}`).then(res => {
  
        console.log(res.data);
        setStudents(res.data.data);
      }
      ).catch(err => {
        console.log(err);
      }
      );
      axios.get(`http://localhost:4500/api/tiger/v1/subjects?sem=${sem}&branch=${branch._id}`).then(res => {
        console.log(res.data);
        setSubjects(res.data.data);
      }
      ).catch(err => {
        console.log(err);
      }
      );
    }
  };
  const handleChangeSem = (event) => {
    const sem = event.target.value;
    setSem(sem);
    if (sem && branch) {
      console.log("sem", sem);
      axios.get(`http://localhost:4500/api/tiger/v1/students?sem=${sem}&branch=${branch.short_name}`).then(res => {
  
        console.log(res.data);
        setStudents(res.data.data);
      }
      ).catch(err => {
        console.log(err);
      }
      );
      axios.get(`http://localhost:4500/api/tiger/v1/subjects?sem=${sem}&branch=${branch._id}`).then(res => {
        console.log(res.data);
        setSubjects(res.data.data);
      }
      ).catch(err => {
        console.log(err);
      }
      );
    }
  }
  const handleChangeStudent = (event) => {
    const student = event.target.value;
    setStudent(student);
    console.log("student", student);
  }

  const handleChangeSubject = (event) => {
    const subject = event.target.value;
    setSubject(subject);
  }

  const handleInputIa = index => e => {
    let newArr = [...iaMarks]; // copying the old datas array
    const marks = e.target.value;
    newArr[index] = { marks, subject: subjects[index] };
    setIaMarks(newArr);
    console.log("Ia>>>", iaMarks);

  }

  const handleInputSee = index => e => {
    let newArr = [...seeMarks]; // copying the old datas array
    const marks = e.target.value;

    newArr[index] = { marks, subject: subjects[index] };
    setSeeMarks(newArr);
    console.log("Seea>>>", seeMarks);
  }

  const handleSubmit = () => {
    const iaTotals = iaMarks.map(item => { 
      return {
      marks: parseFloat(item.marks), subject: item.subject._id
      }
    });
    const seeTotals = seeMarks.map(item => {
      return {
        marks: parseFloat(item.marks), subject: item.subject._id
      }
    }
    );
    const data = {
      _id: student._id,
      reg_no: student.reg_no,
      ia_totals: iaTotals,
      end_totals: seeTotals,
    }
    axios.post('http://localhost:4500/api/tiger/v1/student/update_marks', data).then(res => {
      if (res.data.status === 200) {
        alert("Marks Updated");
      }
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }


  return (
      <div className="home">
          <div className="home__section">
              <div className="home__inputContainer">
                  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Branch</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={branch.name}
    label="Branch"
    onChange={handleChange} >
    {branchList.map(branch =>
    <MenuItem value={branch} key={branch._id} >{branch.short_name}</MenuItem>
    )}
  </Select>
</FormControl>

              </div>
        <div className="home__inputContainer">
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Sem</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sem}
    label="Sem"
    onChange={handleChangeSem} >
              <MenuItem value={1} key={1} >1</MenuItem>
              <MenuItem value={2} key={2} >2</MenuItem>
              <MenuItem value={3} key={3} >3</MenuItem>
              <MenuItem value={4} key={4} >4</MenuItem>
              <MenuItem value={5} key={5} >5</MenuItem>
              <MenuItem value={6} key={6} >6</MenuItem>
  </Select>
</FormControl>
              </div>
        <div className="home__inputContainer">
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Student</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={student.name}
    label="Student"
    onChange={handleChangeStudent} >
    {students.map(student =>
    <MenuItem value={student} key={student._id} >{student.reg_no}</MenuItem>
    )}
  </Select>
</FormControl>
        </div>
        <div className="home__marks">
          <div className="home__row">
            <div className="home__colIndex">Sl. no</div>
            <div className="home__col">Subject</div>
            <div className="home__col">IA Marks</div>
            <div className="home__col">SEE Marks</div>
          </div>
          {subjects.map((subject, index) =>
            <div className="home__row" key={subject._id}>
              <div className="home__colIndex">{index + 1}</div>
              <div className="home__col">{subject.name}</div>
              <div className="home__col"><input 
                    value={subject.iaMarks}
                    onChange={handleInputIa(index)}
                    className="messageSender__input" placeholder='IA' /></div>
              <div className="home__col"><input 
                    value={subject.iaMarks}
                    onChange={handleInputSee(index)}
                    className="messageSender__input" placeholder='SEE' /></div>
            </div>
          )}
          
        </div>
        <div className="home__button">
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </div>
              </div>
    </div>
  )
}

export default Home