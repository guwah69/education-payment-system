import { BaseRemoteService } from "@ofqual/portal-core/core/dataAccess";
import {
  Opts,
  PagedResponse,
  QueryParams,
} from "@ofqual/portal-core/core/types";
import { paramsToSearchString } from "@ofqual/portal-core/core/utils/urlHelper";
import { Activity } from "../domain/Activity";

const DEFAULT_PAGE_SIZE = 10;
export class ActivitiesService extends BaseRemoteService {
  public async search(
    resourceId: string,
    params: QueryParams,
    opts: Opts
  ): Promise<PagedResponse<Activity>> {
    const url = `${this.apiRoot}/activity/${resourceId}/${paramsToSearchString({
      ...params,
      pageSize: DEFAULT_PAGE_SIZE,
    })}`;

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return {
    //   count: 2,
    //   page: 0,
    //   pageSize: 50,
    //   data: [
    //     {
    //       id: "1",
    //       activityTitle: "foo" + resourceId,
    //       createdAt: "2020-12-09T14:06:43.720Z",
    //     } as Activity,
    //     {
    //       id: "2",
    //       activityTitle: "bar" + resourceId,
    //       createdAt: "2020-12-08T14:07:43.720Z",
    //     } as Activity,
    //     {
    //       id: "3",
    //       activityTitle: "baz" + resourceId,
    //       createdAt: "2020-12-07T14:07:43.720Z",
    //     } as Activity,
    //   ],
    // };

    return await super.getRequest<PagedResponse<Activity>>(url, opts);
  }
}
