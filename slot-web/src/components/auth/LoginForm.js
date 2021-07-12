import { useState } from 'react';

// Style
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { login } from '../../middleware/auth';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1, 0, 1),
    fontSize: 17,
  },
}));

const LoginForm = props => {
  const classes = useStyles();

  // Init State
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = e => {
    if (e.target.id === 'name') setName(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    let data = {
      name,
      password,
    };

    login(props, data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登入
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField value={name} onChange={onChangeHandler} variant="outlined" margin="normal" required fullWidth id="name" label="user name" name="name" autoComplete="off" />
          <TextField
            value={password}
            onChange={onChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="記住我" /> */}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            確定
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
