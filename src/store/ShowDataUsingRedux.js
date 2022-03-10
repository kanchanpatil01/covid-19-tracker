import { DeleteIcon } from '@icons/material';
import { Button, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase';
import { getData, addDataToFirebase } from './actions';

function ShowDataUsingRedux({ cases, recovered, deaths }) {
    const dispatch = useDispatch();
    const { allData: covidData } = useSelector((state) => state.allData);
    console.log(covidData);
    useEffect(() => {
        console.log('in useeffect');
        dispatch(getData)
    }, []);

    // add data to the firebase
    const addData = (event) => {
        console.log(event, 'ee');
        event.preventDefault();
        const finalData = {
            cases: cases,
            recovered: recovered,
            deaths: deaths,
        }
        dispatch(addDataToFirebase(finalData));
    }

    return (
        <div>
            <Button onClick={(e) => addData(e)} color='primary' variant="contained">Add to the Firebase</Button>
            <div>{covidData.map((user) => {
                return <div>
                    <table>
                        <tr>
                            <th>Cases</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td><strong>{user.cases}</strong></td>
                            <td><strong>{user.recovered}</strong></td>
                            <td><strong>{user.deaths}</strong></td>
                            <td>
                                <IconButton aria-label="delete" color='secondary'>
                                    <DeleteIcon onClick={event => db.collection('coviddata').doc(user.id).delete()} color="primary" />
                                </IconButton>
                            </td>
                        </tr>
                    </table>

                </div>
            })}</div>
        </div >
    );
}

export default ShowDataUsingRedux;