import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const CustomerManagementList = () => {
  const classes = useStyles();
  const session = useSelector(state => state.session);

  const [customers, setCustomers] = useState([]);

  const fetchCustomersOff = () => {
    setTimeout(() => {
      axios
        .get('/urls/autor', {
          headers: {
            Authorization: 'Bearer ' + session.token
          }
        })
        .then(response => {
          setCustomers(response.data.urls);
          console.log(response.data.urls);
        });
    }, 2000);
  };

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      axios
        .get('/urls/autor', {
          headers: {
            Authorization: 'Bearer ' + session.token
          }
        })
        .then(response => {
          if (mounted) {
            setCustomers(response.data.urls);
          }
        });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Lista de URLs">
      <Header fetchCustomers={fetchCustomersOff} />
      {customers && (
        <Results className={classes.results} customers={customers} />
      )}
    </Page>
  );
};

export default CustomerManagementList;
