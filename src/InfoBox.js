import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css'
import { prettyPrintStat } from './util';

function InfoBox({ title, cases, total, isRed, active, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"
                }`}
        >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                </h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox; 