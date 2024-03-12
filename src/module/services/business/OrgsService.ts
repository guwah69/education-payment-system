import { BaseRemoteService } from "@ofqual/portal-core/core/dataAccess";
import { Opts, PagedResponse, QueryParams, ValidatedResponse, JSONPatchDocument } from "@ofqual/portal-core/core/types";
import { paramsToSearchString } from "@ofqual/portal-core/core/utils/urlHelper";
import { getValidationError } from "@ofqual/portal-core/core/utils/validationHelper";
import { Organisation } from "../domain/Organisation";

export class OrgsService extends BaseRemoteService {
  public async search(
    params: QueryParams,
    opts: Opts
  ): Promise<PagedResponse<Organisation>> {
    const url = `${this.apiRoot}/organisations/${paramsToSearchString(params)}`;
    const response = await super.getRequest<PagedResponse<Organisation>>(
      url,
      opts
    );
    return {
      ...response,
      data: response.data.sort((a, b) => (a.name < b.name ? -1 : 1)),
    };
  }

  public async getAll(opts: Opts): Promise<Organisation[]> {
    const url = `${this.apiRoot}/organisations/${paramsToSearchString({
      pageSize: 999,
    })}`;
    const response = await super.getRequest<PagedResponse<Organisation>>(
      url,
      opts
    );
    return response.data.sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  public async getOrganisationByItemId(itemId: number, opts: Opts): Promise<Organisation | null> {
    const url = `${this.apiRoot}/organisations/${itemId.toString()}`
    const response = await super.getRequest<Organisation>(url, opts)
    return response;
  }

  public async patchOrganisationByItemId(itemId: number, patchDoc: JSONPatchDocument, opts: Opts): Promise<ValidatedResponse<Organisation>> {
    try {
      const url = `${this.apiRoot}/organisations/${itemId.toString()}`
      const response = await super.patchRequest<Organisation>(url, patchDoc, opts)
      return {
        isValid: true,
        data: response,
      };
    } catch (err) {
        const validationError = getValidationError(err)
        if (validationError.isValidationError) {
          return { isValid: false, error: validationError.error };
        }
        throw err;
    }
  }
  public async approveChange(
    id: string,
    changeId: string,
    opts: Opts
  ) {
    const url = `${this.apiRoot}/organisations/${id}/changes/${changeId}/approve`
    return await super.postRequest(url, null, opts);
  }

    public async rejectChange(
    id: string,
    changeId: string,
    opts: Opts
  ) {
    const url = `${this.apiRoot}/organisations/${id}/changes/${changeId}/reject`
    return await super.postRequest(url, null, opts);
  }
}
