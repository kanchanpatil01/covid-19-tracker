import * as types from './actionTypes';
import { db } from '../firebase';
import { async } from '@firebase/util';
import { collection, getDoc } from 'firebase/firestore';

const getDetailsStart = () => ({
    type: types.GET_DETAILS_START
})

const getDetailsSuccess = (data) => ({
    type: types.GET_DETAILS_SUCCESS,
    payload: data
})

const getDetailsFail = () => ({
    type: types.GET_DETAILS_FAIL
})

const addDetails = () => ({
    type: types.ADD_Details
})

export const getData = (dispatch) => {
    console.log('1st line');
    // return function (dispatch) {
    console.log('2nd line');
    dispatch(getDetailsStart());

    db.collection('coviddata').onSnapshot(snapshot => {
        console.log(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        // data.push(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        getDetailsSuccess(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        try {
            if (snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) !== null) {
                dispatch(getDetailsSuccess(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
            } else {
                dispatch(getDetailsSuccess({}));
            }
        } catch (error) {
            dispatch(getDetailsFail(error));
        }
    });
    return dispatch(getDetailsSuccess)
    // }
}

export const addDataToFirebase = (dispatch) => {
    addDetails(db.collection('coviddata').add({
        cases: dispatch.cases,
        recovered: dispatch.recovered,
        deaths: dispatch.deaths
    }))
}

export const add = (req) => {
    return function (dispatch) {
        dispatch({
            type: types.ADD_Details,
        });
        return function () {
            addDetails(db.collection('coviddata').add({
                cases: req.cases,
                recovered: req.recovered,
                deaths: req.deaths
            }))
        }
    }
}



export const getCovidData = () => async (dispatch) => {
    let covidData = [];
    async function getCovidCases(db) {
        const abcd = collection(db, 'coviddata')
        const qwer = await getDoc(abcd)
        const pqrs = qwer.docs.map((doc) => doc.data())
        return pqrs
    }
    try {
        dispatch({ type: getDetailsStart })
        covidData = await getCovidCases(db)
        dispatch({ type: getDetailsSuccess, payload: covidData })
    } catch (error) {
        console.log(error);
    }
}

// console.log(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),'snapshot data');
//             console.log(snapshot, 'dddddddd')