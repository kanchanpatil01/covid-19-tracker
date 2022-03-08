import DeleteIcon from '@icons/material/DeleteIcon';
import { Button, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { db } from "./firebase";

function ShowFirebaseData({ cases, recovered, deaths }) {
    const [covidData, setCovidData] = useState([]);
    const [addCovidData, setAddCovidData] = useState([]);

    useEffect(() => {
        db.collection('coviddata').onSnapshot(snapshot => {
            setCovidData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        });
    }, []);

    const addData = (event) => {
        event.preventDefault();
        db.collection('coviddata').add({
            cases: cases,
            recovered: recovered,
            deaths: deaths
        });
        setAddCovidData([...covidData, { cases: cases, recovered: recovered, deaths: deaths }]);
    }

    return (
        <div>
            <Button onClick={addData} color='primary' variant="contained">Add to the Firebase</Button>
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

export default ShowFirebaseData;