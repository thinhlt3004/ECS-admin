import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChartView, Panel } from "../../Components";
import { customerState$, serviceCustomerState$ } from "../../redux/selectors";
import { useStyles } from "./style";
import { AttachMoney, Inventory2, Person } from "@mui/icons-material";
import { getReportChart } from "../../Api";
import { useDispatch } from "react-redux";
import * as serviceCustomerActions from './../../redux/actions/serviceCustomerActions';
import * as customerActions from './../../redux/actions/customerActions';
const Home = () => {
  const classes = useStyles();
  const {data : serviceCus} = useSelector(serviceCustomerState$);
  const {data: customers} = useSelector(customerState$);
  const [totalP, setTotalP] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serviceCustomerActions.getAllServiceCustomer.getAllServiceCustomerRequest());
    dispatch(customerActions.getCustomersAll.getCustomersAllRequest());
    const fetchData = async () => {
      try {
        const res = await getReportChart();
        if(res.status === 200){
          let total = 0;
          let result = res.data.map(({ totalProfit }) => total + totalProfit);
          result.forEach((i) => {
            total += i;
          })
          setTotalP(total);
        }  
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {/* <h2>Welcome , {user && user.userName} !</h2> */}
      <Grid container spacing={10} className={classes.gridContainer}>
        <Grid item xs={4} align="center">
          <Panel
            title="Total Profit"
            icon={
              <AttachMoney
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
            }
            value={totalP}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={4} align="center">
          <Panel
            title="Total Projects"
            icon={
              <Inventory2
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
            }
            value={serviceCus.length}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={4} align="center">
          <Panel
            title="Total Customer"
            icon={
              <Person
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
            }
            value={customers.length}
            color="#3f51b5"
          />
        </Grid>
      </Grid>
      <div className={classes.chartContainer}>
        <ChartView />
      </div>
    </div>
  );
};

export default Home;
