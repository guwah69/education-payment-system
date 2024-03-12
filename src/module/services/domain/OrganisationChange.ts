export type OrganisationChange = {
    id: string;
    orgId: string,
    field: string,
    oldValue: string,
    newValue: string,
    status: OrganisationChangeStatus,
    statusNote: string,
    createdByUpn: string,
    modifiedByUpn: string,
    createdDate: Date;
    modifiedDate: Date;
};

export enum OrganisationChangeStatus {
    Active = 0,
    Approved = 1,
    Rejected = 2,
    Superseded = 3
}