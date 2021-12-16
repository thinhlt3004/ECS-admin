import {
  Button,
  MenuItem,
  Select,
  TableCell,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  customerState$,
  empState$,
  serviceState$,
} from "../../redux/selectors";
import * as API from "./../../Api/index";
import * as notificationActions from './../../redux/actions/notificationActions';
import { useDispatch } from "react-redux";
const SerCusRow = ({ i }) => {
  const dispatch = useDispatch();
  const { data: customers } = useSelector(customerState$);
  const { data: services } = useSelector(serviceState$);
  const { data: emps } = useSelector(empState$);
  const [customer, setCustomer] = useState(null);
  const [service, setService] = useState(null);
  const [totalDates, setTotalDates] = useState(0);
  const [emp, setEmp] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [chooseEmp, setChooseEmp] = useState("");
  const [sEDate, setDates] = useState(null);
  const [uSEDate, setUSEDate] = useState({
    startDate: "",
    endDate: "",
  });
  const dates = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let dif = date2.getTime() - date1.getTime();
    let days = dif / (1000 * 3600 * 24);
    return days;
  };
  useEffect(() => {
    const fetchData = async () => {
      if (i) {
        const cus = customers.find((c) => c.id === i.customerId);
        if (cus) {
          setCustomer(cus);
        }
        const ser = services.find((c) => c.id === i.serviceId);
        if (ser) {
          setService(ser);
        }
        let days = dates(i.startDate, i.endDate);
        setTotalDates(days);
        const res = await API.getCurrentEmployeeOfCusSer(i.id);
        if (res.status === 200 && res.data !== null) {
          setDates({
            startDate: res.data.startDate.slice(0, 10),
            endDate: res.data.endDate.slice(0, 10),
          });
          const current = emps.find((i) => i.employeeId === res.data.empId);
          setEmp(current);
        }
      }
    };
    fetchData();
  }, [i, customers, services, emps]);

  const handleUpdate = () => {
    if (emp) {
      setChooseEmp(emp.employeeId);
      setUSEDate({
        startDate: sEDate.startDate,
        endDate: sEDate.endDate,
      });
    }

    setIsUpdate(true);
  };

  const handleUpdateRequest = async () => {
    if(chooseEmp === ''){
        dispatch(notificationActions.openNotifications('Employee must be choosen'));
        return;
    }
    if(uSEDate.startDate === ''){
        dispatch(notificationActions.openNotifications('Please select startDate'));
        return;
    }
    if(uSEDate.endDate === ''){
        dispatch(notificationActions.openNotifications('Please select endDate'));
        return;
    }
    if (emp === null) {
      const payload = {
        empId: chooseEmp,
        serviceOfCus: i.id,
        startDate: uSEDate.startDate,
        endDate: uSEDate.endDate,
      };
      const res = await API.createNewEmpOfCus(payload);
      if (res.status === 200) {
        dispatch(notificationActions.openNotifications('Update Success'));
        const current = emps.find((i) => i.employeeId === chooseEmp);
        setEmp(current);
        setDates({
          startDate: uSEDate.startDate,
          endDate: uSEDate.endDate,
        });
      }
    } else {
      const payload = {
        empId: chooseEmp,
        serviceOfCus: i.id,
        startDate: uSEDate.startDate,
        endDate: uSEDate.endDate,
      };
      const res = await API.updateNewEmpOfCus(payload);
      if (res.status === 200) {
        dispatch(notificationActions.openNotifications('Update Success'));
        const current = emps.find((i) => i.employeeId === chooseEmp);
        setEmp(current);
        setDates({
          startDate: uSEDate.startDate,
          endDate: uSEDate.endDate,
        });
      }
    }

    setIsUpdate(false);
  };

  return (
    <>
      <TableCell align="center">{i.id}</TableCell>
      <TableCell align="center">{customer && customer.fullName}</TableCell>
      <TableCell align="center">{service && service.name}</TableCell>
      <TableCell align="center">$ {i.currentPrice}</TableCell>
      <TableCell align="center">{i.product}</TableCell>
      <TableCell align="center">$ {i.productPrice}</TableCell>
      <TableCell align="center" style={{width: '130px'}}>{i.startDate.slice(0, 10)}</TableCell>
      <TableCell align="center" style={{width: '130px'}}>{i.endDate.slice(0, 10)}</TableCell>
      <TableCell align="center">{totalDates}</TableCell>
      <TableCell align="center">
        {isUpdate ? (
          <Select
            style={{ width: "100px" }}
            value={chooseEmp}
            onChange={(e) => setChooseEmp(e.target.value)}
            size="small"
          >
            <MenuItem value="">--Employee---</MenuItem>
            {emps.length > 0 &&
              emps.map((i, index) => (
                <MenuItem key={index} value={i.employeeId}>
                  {i.userName}
                </MenuItem>
              ))}
          </Select>
        ) : emp ? (
          emp.userName
        ) : (
          "No data"
        )}
      </TableCell>
      <TableCell align="center">
        {isUpdate ? (
          <TextField
            style={{ width: "170px" }}
            type="date"
            value={uSEDate.startDate}
            onChange={(e) =>
              setUSEDate({ ...uSEDate, startDate: e.target.value })
            }
            size="small"
          />
        ) : sEDate ? (
          sEDate.startDate
        ) : (
          "no data"
        )}
      </TableCell>
      <TableCell align="center">
        {isUpdate ? (
          <TextField
            style={{ width: "170px" }}
            type="date"
            value={uSEDate.endDate}
            onChange={(e) =>
              setUSEDate({ ...uSEDate, endDate: e.target.value })
            }
            size="small"
          />
        ) : sEDate ? (
          sEDate.endDate
        ) : (
          "no data"
        )}
      </TableCell>

      <TableCell align="center">
        {isUpdate ? (
          <>
            <Button
              variant="contained"
              onClick={handleUpdateRequest}
              style={{ marginRight: "10px" }}
            >
              OK
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsUpdate(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default SerCusRow;
