import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { SendEmails } from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.fetchCustomers();
  };

  const body = (fx) => (
    <div className={classes.paper}>
      <SendEmails toClose={fx}></SendEmails>
    </div>
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Painel
          </Typography>
          <Typography component="h1" variant="h3">
            URLs
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body(handleClose)}
      </Modal>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
