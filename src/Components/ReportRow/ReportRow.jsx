import { Button, TableCell, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as notificationActions from './../../redux/actions/notificationActions';
import * as reportActions from './../../redux/actions/reportActions';
import { serviceCustomerState$ } from '../../redux/selectors';
const ReportRow = ({i}) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const {data : serCus} = useSelector(serviceCustomerState$);
    const handleOpenUpdate = () => {
        const sC = serCus.find(c => c.id === i.serviceOfCus);
        if(sC){
            const price = i.count * sC.productPrice;
            setData({
                count: i.count,
                totalPrice : price,
            })
            setIsUpdate(true);

        }
    }
    const handleCount = (e) => {
        const sC = serCus.find(c => c.id === i.serviceOfCus);
        if(sC){
            const price = e.target.value * sC.productPrice;
            setData({
                count: e.target.value,
                totalPrice : price,
            })
        }
    }
    const handleUpdate = () => {
        if(data.count <= 0){
            dispatch(notificationActions.openNotifications('Amount must be greater than zero.'));
            return;
        }
        if(data.totalPrice <= 0){
            dispatch(notificationActions.openNotifications('Amount must be greater than zero.'));
            return;
        }
        const payload = {
            serviceOfCus: i.serviceOfCus,
            date: i.date,
            count: data.count,
            totalPrice: data.totalPrice,
        }
        dispatch(reportActions.updateReport.updateReportRequest(payload));
        setIsUpdate(false);
    }
    return (
        <>
            <TableCell align="center">{i.id}</TableCell>
            <TableCell align="center">{i.serviceOfCus}</TableCell>
            <TableCell align="center">{i.date.slice(0, 10)}</TableCell>
            <TableCell align="center">{
                isUpdate
                ? <TextField size='small' style={{width: '100px'}} type="number" value={data.count} onChange={handleCount} />
                :i.count
            }</TableCell>
            <TableCell align="center">{
                isUpdate
                ? data.totalPrice
                :i.totalPrice
            }</TableCell>
            <TableCell align="center"style={{width: '200px'}}>
                {isUpdate
                    ?<>
                    <Button variant="contained" style={{marginRight: '5px'}} size="small" onClick={handleUpdate}>OK</Button>
                    <Button variant="contained" size="small" color="warning" onClick={(e) => setIsUpdate(false)}>Cancel</Button>
                    </>
                    :<Button variant="contained" size="small" onClick={handleOpenUpdate}>Update</Button>
                }
            </TableCell>
        </>
    )
}

export default ReportRow
