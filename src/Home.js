import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Button } from '@mui/material';
import { toastify } from './Toast';
import './Home.css'
function Home() {
  const [branch, setBranch] = React.useState('');
  const [sem, setSem] = React.useState();
  const [students, setStudents] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [subject, setSubject] = React.useState('');
  const [student, setStudent] = React.useState('');
  const [iaMarks, setIaMarks] = React.useState(0);
  const [seeMarks, setSeeMarks] = React.useState([{}]);
  const [stIndex, setStIndex] = React.useState(0);
  const [eType, setEType] = React.useState('IA');
  const [year, setYear] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [shift, setShift] = React.useState('');
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
    if (sem && branch && shift && year) {
      console.log("sem", sem);
      axios.get(`http://localhost:4500/api/tiger/v1/students?sem=${sem}&branch=${branch.short_name}&year=${year}&shift=${shift}`).then(res => {
  
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

  const handleChangeSubject = (event) => {
    setStIndex(0);
    const subject = event.target.value;
    setSubject(subject);
  }

  const handleChangeExamType = (event) => {
    const eType = event.target.value;
    setEType(eType);
  }

  const handleChangeYear = (event) => {
    const year = event.target.value;
    setYear(year);
  }

  const handleChangeMonth = (event) => {
    const month = event.target.value;
    setMonth(month);
  }

  const handleChangeShift = (event) => { 
    const shift = event.target.value;
    setShift(shift);
  }

  const handleInputIaMarks = (event) => { 
    const iaMarks = event.target.value;
    setIaMarks(iaMarks);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let iaTotals = {};
    let seeTotals = {};
    if (eType === 'IA') {
      iaTotals = {
        marks: iaMarks,
        subject: subject._id,
      }
    } else { 
      seeTotals = {
        marks: iaMarks,
        subject: subject._id,
      }
    }
    
    toastify('Marks Updated Successfully');
    const data = {
      _id: students[stIndex]._id,
      reg_no: students[stIndex].reg_no,
    }
    if (Object.keys(iaTotals).length > 0) data.ia_totals = iaTotals;
    if (Object.keys(seeTotals).length > 0) data.end_totals = seeTotals;
        // setStIndex(stIndex + 1);
        // setIaMarks(0);
    axios.post('http://localhost:4500/api/tiger/v1/student/update_marks', data).then(res => {
      if (res.data.statusCode === 200) {
        toastify('Marks Updated Successfully');
        setStIndex(stIndex + 1);
        setIaMarks(0);

      }
    }
    ).catch(err => {
      console.log(err);
      toastify(err.message);
    }
    );
  }


  return (
      <div className="home">
      <div className="home__section">
        <div className="home__inputContainer">
            <FormControl fullWidth className="home__formControl">
  <InputLabel id="demo-simple-select-label">Year</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sem}
    label="Sem"
    onChange={handleChangeYear} >
              <MenuItem value={2021} key={1} >2021</MenuItem>
              <MenuItem value={2022} key={2} >2022</MenuItem>
              <MenuItem value={2023} key={3} >2023</MenuItem>
              <MenuItem value={2024} key={4} >2024</MenuItem>
              <MenuItem value={2025} key={5} >2025</MenuItem>
              <MenuItem value={2026} key={6} >2026</MenuItem>
  </Select>
</FormControl>
        </div>
        <div className="home__inputContainer">
            <FormControl fullWidth className="home__formControl">
  <InputLabel id="demo-simple-select-label">Month</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sem}
    label="Sem"
    onChange={handleChangeMonth} >
              <MenuItem value='nov' key={1} >Nov</MenuItem>
              <MenuItem value='may' key={2} >May</MenuItem>
              
  </Select>
</FormControl>
        </div>
        <div className="home__inputContainer">
            <FormControl fullWidth className="home__formControl">
  <InputLabel id="demo-simple-select-label">Shift</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sem}
    label="Sem"
    onChange={handleChangeShift} >
              <MenuItem value='shift 1' key={1} >Shift 1</MenuItem>
              <MenuItem value='shift 2' key={2} >Shift 2</MenuItem>
  </Select>
</FormControl>
              </div>
              <div className="home__inputContainer">
                  <FormControl fullWidth className="home__formControl">
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
            <FormControl fullWidth className="home__formControl">
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
          <FormControl fullWidth className="home__formControl">
  <InputLabel id="demo-simple-select-label">Subject</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={student.name}
    label="Student"
    onChange={handleChangeSubject} >
    {subjects.map(subject =>
    <MenuItem value={subject} key={subject._id} >{subject.name}</MenuItem>
    )}
  </Select>
          </FormControl>
          <FormControl fullWidth className="home__formControl">
  <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={student.name}
    label="Student"
    onChange={handleChangeExamType} >
              <MenuItem value='IA' >IA</MenuItem>
              <MenuItem value='SEE' >SEE</MenuItem>
  </Select>
</FormControl>
        </div>
        {students.length ? (
          <div className="home__marks">
          <form >
          <div className="home__row">
            <div className="home__colIndex">Student Reg No</div>
            <div className="home__col">Subject</div>
            <div className="home__col">Marks</div>
          </div>
            <div className="home__row">
              <div className="home__colIndex">{students[stIndex].reg_no}</div>
              <div className="home__col">{subject.name}</div>
              <div className="home__col"><input 
                    value={iaMarks}
                    onChange={handleInputIaMarks}
                     /></div>
            </div>
          
        <div className="home__button">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit">Submit</Button>
        </div>
          </form>
        </div> ) : <></>
      }
              </div>
    </div>
  )
}

export default Home