import { Typography } from "@material-ui/core"
import React from "react"
import { SummaryListRow } from "./SummaryListRow"

export enum SummaryListItemTypes {
    element,
    text
}

export type SummaryListItem = {
    itemKey: string;
    itemValue: any;
    type: SummaryListItemTypes
}

export type SummaryListProps = {
    title: string;
    rows: SummaryListItem[]
}

export const SummaryList: React.FC<SummaryListProps> = ({
    title,
    rows
  }) => {
      return (
          <div className="ofqual-summary-list">
              <Typography variant="h6">{title}</Typography>
              <dl>
                  {rows.map((row: SummaryListItem) => 
                      <SummaryListRow itemKey={row.itemKey} type={row.type}>
                          {row.itemValue}
                      </SummaryListRow>
                  )}
              </dl>
          </div>
      )
  }