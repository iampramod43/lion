import './Result.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import React from 'react'

function Result() {
  const [branch, setBranch] = React.useState('');
  const [sem, setSem] = React.useState();
  const [year, setYear] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [shift, setShift] = React.useState('');
  const [result, setResult] = React.useState([]);
const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
  
   const handleChangeSem = (event) => {
    const sem = event.target.value;
     setSem(sem);
     console.log('sem',sem);
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

  const handleSubmit = () => {
    // event.preventDefault();
    console.log('limits', rowsPerPage, page);
    let url = `http://localhost:4500/api/tiger/v1/result?branch=${branch.short_name}&sem=${sem}&shift=${shift}&year=${year}&month=${month}`;
    // if (rowsPerPage) url += `&limit=${rowsPerPage}`;
    // if (page) url += `&page=${page}`;
    axios.get(url).then(res => {
      if (res.data.statusCode === 200) {
        const data = res.data.data.filter(item => item !== null);
        console.log('res>>>', data);
        const result = data.map(res => {
          return {
            reg_no: res.reg_no,
            name: res.name,
            marks: res.marks,
            total: res.total,
            finalResult: res.finalResult
          }
        });
        setResult(result);

      }
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

   const handleChange = (event) => {
    const branch = event.target.value;
    setBranch(branch);
   };
  
  const handleChangePage = (event, newPage) => {
    const p = newPage;
    setPage(p);
    console.log('page>>', page);
    // handleSubmit();
  };

  const handleChangeRowsPerPage = (event) => {
    const rows = event.target.value;
    setRowsPerPage(rows);
    
    console.log('rows',rowsPerPage);
    setPage(0);
    // handleSubmit();
  };

  return (
    <div className="result">
      <div className="result__header">
         <div className="result__inputContainer">
            <FormControl fullWidth className="result__formControl">
  <InputLabel id="demo-simple-select-label">Year</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={year}
    label="Year"
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
        <div className="result__inputContainer">
            <FormControl fullWidth className="result__formControl">
  <InputLabel id="demo-simple-select-label">Month</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={month}
    label="Month"
    onChange={handleChangeMonth} >
              <MenuItem value='nov' key={1} >Nov</MenuItem>
              <MenuItem value='may' key={2} >May</MenuItem>
              
  </Select>
</FormControl>
        </div>
        <div className="result__inputContainer">
            <FormControl fullWidth className="result__formControl">
  <InputLabel id="demo-simple-select-label">Shift</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={shift}
    label="Shift"
    onChange={handleChangeShift} >
              <MenuItem value='shift 1' key={1} >Shift 1</MenuItem>
              <MenuItem value='shift 2' key={2} >Shift 2</MenuItem>
  </Select>
</FormControl>
              </div>
              <div className="result__inputContainer">
                  <FormControl fullWidth className="result__formControl">
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
        <div className="result__inputContainer">
            <FormControl fullWidth className="result__formControl">
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
        <div className="home__button">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit">Submit</Button>
        </div>
      </div>
      <div className="result__table">
        <TableContainer >
          <Table className="result__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>REG No</TableCell>
                <TableCell align="center">Name</TableCell>
                <div className="result__subjects">
                  <TableCell align="center">Subject 1</TableCell>
                  <TableCell align="center">Subject 2</TableCell>
                  <TableCell align="center">Subject 3</TableCell>
                  <TableCell align="center">Subject 4</TableCell>
                  <TableCell align="center">Subject 5</TableCell>
                  <TableCell align="center">Subject 6</TableCell>
                  <TableCell align="center">Subject 7</TableCell>
                </div>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Final Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.roll}>
                  <TableCell component="th" scope="row">
                    {row.reg_no}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <div className="result__subjectMarks">
                    <TableCell align="center">{row.marks[0]?.cie || '--'} <br/>{row.marks[0]?.see || '--'} </TableCell>
                    <TableCell align="center">{row.marks[1]?.cie || '--'} <br/>{row.marks[1]?.see || '--'} </TableCell>
                    <TableCell align="center">{row.marks[2]?.cie || '--'} <br/>{row.marks[2]?.see || '--'} </TableCell>
                    <TableCell align="center">{row.marks[3]?.cie || '--'} <br/>{row.marks[3]?.see || '--'} </TableCell>
                    <TableCell align="center">{row.marks[4]?.cie || '--'} <br/>{row.marks[4]?.see || '--'} </TableCell>
                    <TableCell align="center">{row.marks[5]?.cie || '--'} <br/>{row.marks[5]?.see || '--'} </TableCell>
                    <TableCell align="center">{row.marks[6]?.cie || '--'} <br/>{row.marks[6]?.see || '--'} </TableCell>
                  </div>
                  <TableCell align="center">{row.total}</TableCell>
                  <TableCell align="center">{row.finalResult}</TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 5, 10, 25]}
          component="div"
          count={parseInt(result.length)}
          rowsPerPage={parseInt(rowsPerPage)}
          page={parseInt(page)}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default Result