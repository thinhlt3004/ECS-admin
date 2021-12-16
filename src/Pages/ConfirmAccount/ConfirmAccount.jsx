import React, { useEffect } from "react";
import { useStyles } from "./style";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { confirmAccount } from "./../../Api/index";
const ConfirmAccount = () => {
  const classes = useStyles();
  const { id } = useParams();
  console.log(id);
  const history = useHistory();
  useEffect(() => {
    const confirmAccountByToken = async () => {
      if (id !== null) {
        try {
          await confirmAccount(id);
        } catch (error) {
            history.push('/not-found');
        }
      }
    };
    confirmAccountByToken();
  }, [id, history]);
  return (
    <div className={classes.container}>
      <h2>Your Account is confirm ! You can login right now !</h2>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default ConfirmAccount;
