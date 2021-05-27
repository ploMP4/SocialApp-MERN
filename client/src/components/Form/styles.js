import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    width: '80%',
  },
  fileInput: {
    width: '77%',
    margin: '10px 0',
  },
  buttonSubmit: {
    margin: 20,
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      margin: 10
    },
  },
}));