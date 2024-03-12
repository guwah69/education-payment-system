// todo: does this go into `portal-core`
export type Activity = {
  id: string;
  resourceId: string;
  resourceType: string;
  activityType: number;
  activityTitle: string;
  activityMetaData: string;
  createdByUpn: string;
  createdDate: string;
};
