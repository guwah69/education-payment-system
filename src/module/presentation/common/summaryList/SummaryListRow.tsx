import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { SummaryListItemTypes } from ".";

const useStyles = makeStyles(() => ({
    div: {
      padding: 4,
      margin: 4,
      borderBottom: "1px solid lightgray"
    },
}));

export const SummaryListRow: React.FC<{ itemKey: string, type: SummaryListItemTypes }> = ({
    itemKey, type, children
}) => {

    const classes = useStyles()

    let valElement: any = null

    if(type === SummaryListItemTypes.text){
        valElement = <Typography variant="body1">{children}</Typography>
    } else if (type === SummaryListItemTypes.element){
        valElement = children
    }

    return(
        <div className={`ofqual-summary-list-row ${classes.div}`}>
            <dt><Typography variant="body1"><strong>{itemKey}</strong></Typography></dt>
            <dd>{valElement}</dd>
        </div>
    )
}