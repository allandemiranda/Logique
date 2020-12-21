import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Divider
} from '@material-ui/core';
import { Alert } from './../../../../../../components';
import useRouter from 'utils/useRouter';
import { criar } from 'actions';
import { useSelector, useDispatch, useStore } from 'react-redux';
var validUrl = require('valid-url');

const useStyles = makeStyles(theme => ({
  root: {},
  content: {},
  sendButton: {
    marginTop: theme.spacing(2)
  },
  mailIcon: {
    marginRight: theme.spacing(1)
  },
  table: {
    marginTop: theme.spacing(2)
  },
  cell: {
    padding: theme.spacing(1)
  }
}));
const SendEmails = props => {
  const { customer, className, ...rest } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const classes = useStyles();

  const [alert, setAlert] = useState(false);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!validUrl.isUri(formState.values.url)) {
      setAlert(true);
    } else {
      dispatch(criar(formState, router, session.token));
      props.toClose();
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Criar URL" />
      {alert ? (
        <Alert
          message="URL Inválida"
          variant="error"
          onClose={() => setAlert(false)}></Alert>
      ) : null}
      <Divider />      
      <CardContent className={classes.content}>
        <TextField
          fullWidth
          id="outlined-basic"
          name="url"
          onChange={handleChange}
          variant="outlined"></TextField>
        <Button
          className={classes.sendButton}
          variant="contained"
          onClick={handleSubmit}>
          Criar
        </Button>
      </CardContent>
    </Card>
  );
};

SendEmails.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default SendEmails;
