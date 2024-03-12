import {
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editOrganisation, loadingActivities } from "../../redux/actions";
import { OrganisationState, OrganisationStatus } from "../../redux/state";
import { Organisation } from "../../services/domain/Organisation";
import { UserRole } from "../../services/domain/userRole";
import { useAuth } from "../../useAuth";
import { AppBarSaveButton } from "@ofqual/portal-components/components/SecondaryAppBar";
import { OrganisationAppBar } from "../OrganisationAppBar";
import { modelToJsonPatchDocument } from "@ofqual/portal-core/core/utils/JSONPatchDocumentHelper";
import { DatePicker } from "@ofqual/portal-components/components/DatePicker";
import { Error } from "../common/Error";
import { TextField } from "@ofqual/portal-components/components/TextField";
import { fieldLabels } from "./fieldLabels";
import { CompareArrows } from "@material-ui/icons";
import { SaveDialog } from "./dialogs/SaveDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "4px 8px",
    height: "100%",
    width: "100%",
  },
  flex: {
    flexGrow: 1,
  },
  formHeading: {
    color: "#9f9f9f",
    fontSize: "1em",
    marginBottom: "30px",
    fontWeight: 600,
    position: "relative",
  },
  formSection: {
    padding: 30,
    boxShadow: "0 0 19px -2px hsla(0,0%,63.9%,.3)",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "3px",
  },
  pendingChangeField: {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  pendingChangeFieldIcon: {
    color: theme.palette.primary.main,
  },
}));

export const OrganisationViewDetails: React.FC<{
  orgState: OrganisationState;
}> = ({ orgState }) => {
  const { org } = orgState;

  const pendingOrgChangesFields = orgState.org?.organisationChanges.map(
    (x) => x.field as keyof typeof fieldLabels
  );

  const { isInRole } = useAuth();
  const dispatch = useDispatch();

  const canEdit =
    orgState.status !== OrganisationStatus.updating &&
    isInRole(UserRole.AOAdmin, UserRole.ITAdmin);

  const {
    handleSubmit,
    control,
    formState,
    watch,
    errors,
    reset,
  } = useForm<Organisation>({
    defaultValues: orgState.org!,
  });

  useEffect(() => {
    if (orgState.org) {
      // once user is available in redux, load it in to the form via the `reset` function
      reset(orgState.org);
      dispatch(loadingActivities(orgState.org.id));
    }
  }, [orgState.org, reset, dispatch]);

  const { dirtyFields } = formState;

  const [hasSaved, setHasSaved] = useState(false);

  const hasNotifiableSaveJustHappened = !!(
    hasSaved &&
    orgState.lastCrudResult.isSuccess &&
    pendingOrgChangesFields?.length
  );

  const onSubmit = (newOrg: Organisation) => {
    // todo: refactor this into a separate module/method
    const changedFields = (Object.keys(
      dirtyFields
    ) as (keyof Organisation)[]).filter((field) => {
      return (
        // because this is a simple form  with one-to-one fields we can filter
        //  for only values that have changed from the incoming model (just because
        //  a field is dirty it still may have been returned to its initial )
        ((orgState.org && orgState.org[field]) ?? null) !==
        (newOrg[field] ?? null)
      );
    });

    const patch = modelToJsonPatchDocument(newOrg, changedFields);
    dispatch(editOrganisation(org?.itemId!, patch));
    setHasSaved(true);
  };

  const {
    hasCompanyNumber,
    hasCharityNumber,
    isOtherUkLegalEntity,
    isRegisteredInOtherCountry,
    isIndividualOrPartnership,
  } = watch([
    "hasCompanyNumber",
    "hasCharityNumber",
    "isOtherUkLegalEntity",
    "isRegisteredInOtherCountry",
    "isIndividualOrPartnership",
  ]);

  const checkboxRequired =
    hasCompanyNumber ||
    hasCharityNumber ||
    isOtherUkLegalEntity ||
    isRegisteredInOtherCountry ||
    isIndividualOrPartnership;

  const checkboxErrors =
    errors.hasCompanyNumber ||
    errors.hasCharityNumber ||
    errors.isOtherUkLegalEntity ||
    errors.isRegisteredInOtherCountry ||
    errors.isIndividualOrPartnership;

  const classes = useStyles();
  return (
    <>
      {hasNotifiableSaveJustHappened && (
        <SaveDialog
          onClose={() => setHasSaved(false)}
          fields={pendingOrgChangesFields ?? []}
        />
      )}
      <div>
        <OrganisationAppBar breadcrumbs={[{ label: `${org?.name}` }]}>
          <AppBarSaveButton
            onClick={handleSubmit(onSubmit)}
            isSubmitting={orgState.status === OrganisationStatus.updating}
            isSubmitted={orgState.lastCrudResult.isSuccess}
            dataTest="save-button"
            disabled={!canEdit}
          />
        </OrganisationAppBar>
        <div data-test="organisation-details">
          <div id="data-panel">
            <h6
              className={classes.formHeading}
              data-test="organisation-details-main-header"
              style={{ marginTop: "0" }}
            >
              Main Details
            </h6>
            <Paper
              className={classes.formSection}
              data-test="organisation-details-main-section"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: true, maxLength: 500 }}
                    as={
                      <TextField
                        className={
                          pendingOrgChangesFields?.includes("name")
                            ? classes.pendingChangeField
                            : undefined
                        }
                        variant="outlined"
                        label={fieldLabels["name"]}
                        data-test="organisation-details-main-name"
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                          endAdornment: pendingOrgChangesFields?.includes(
                            "name"
                          ) ? (
                            <InputAdornment position="end">
                              <CompareArrows
                                className={classes.pendingChangeFieldIcon}
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                        required
                      />
                    }
                  />
                  {errors.name?.type === "required" && (
                    <Error>This field is required</Error>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <Error>Name must be less than 500 characters</Error>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="legalName"
                    rules={{ required: true, maxLength: 500 }}
                    as={
                      <TextField
                        className={
                          pendingOrgChangesFields?.includes("legalName")
                            ? classes.pendingChangeField
                            : undefined
                        }
                        variant="outlined"
                        label={fieldLabels["legalName"]}
                        data-test="organisation-details-main-legalName"
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                          endAdornment: pendingOrgChangesFields?.includes(
                            "legalName"
                          ) ? (
                            <InputAdornment position="end">
                              <CompareArrows
                                className={classes.pendingChangeFieldIcon}
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                        required
                      />
                    }
                  />
                  {errors.legalName?.type === "required" && (
                    <Error>This field is required</Error>
                  )}
                  {errors.legalName?.type === "maxLength" && (
                    <Error>Legal Name must be less than 500 characters</Error>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="acronym"
                    rules={{ required: true, maxLength: 20 }}
                    as={
                      <TextField
                        className={
                          pendingOrgChangesFields?.includes("acronym")
                            ? classes.pendingChangeField
                            : undefined
                        }
                        data-test="organisation-details-main-acronym"
                        variant="outlined"
                        label={fieldLabels["acronym"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                          endAdornment: pendingOrgChangesFields?.includes(
                            "acronym"
                          ) ? (
                            <InputAdornment position="end">
                              <CompareArrows
                                className={classes.pendingChangeFieldIcon}
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                        required
                      />
                    }
                  />
                  {errors.acronym?.type === "required" && (
                    <Error>This field is required</Error>
                  )}
                  {errors.acronym?.type === "maxLength" && (
                    <Error>Acroynm must be less than 20 characters</Error>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="recognitionNumber"
                    as={
                      <TextField
                        className={
                          pendingOrgChangesFields?.includes("recognitionNumber")
                            ? classes.pendingChangeField
                            : undefined
                        }
                        data-test="organisation-details-main-recognitionNumber"
                        variant="outlined"
                        label={fieldLabels["recognitionNumber"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                          endAdornment: pendingOrgChangesFields?.includes(
                            "recognitionNumber"
                          ) ? (
                            <InputAdornment position="end">
                              <CompareArrows
                                className={classes.pendingChangeFieldIcon}
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="email"
                    as={
                      <TextField
                        variant="outlined"
                        label={fieldLabels["email"]}
                        fullWidth
                        data-test="organisation-details-main-email"
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="website"
                    as={
                      <TextField
                        variant="outlined"
                        label={fieldLabels["website"]}
                        data-test="organisation-details-main-website"
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="listOfStandardFeesUrl"
                    as={
                      <TextField
                        data-test="organisation-details-main-listOfStandardFeesUrl"
                        variant="outlined"
                        label={fieldLabels["listOfStandardFeesUrl"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Controller
                    control={control}
                    name="hasCompanyNumber"
                    rules={{
                      required: !checkboxRequired,
                    }}
                    render={(props) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            data-test="checkbox-hasCompanyNumber"
                            onChange={(e) => {
                              props.onChange(e.target.checked);
                            }}
                            checked={props.value}
                            disabled={!canEdit}
                          />
                        }
                        label={fieldLabels["hasCompanyNumber"]}
                      />
                    )}
                  />
                  {checkboxErrors && (
                    <>
                      <br></br>
                      <Error>You must select at least one checkbox</Error>
                    </>
                  )}
                </Grid>
                {hasCompanyNumber ? (
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="companyNumber"
                      rules={{
                        required: hasCompanyNumber,
                      }}
                      as={
                        <TextField
                          className={
                            pendingOrgChangesFields?.includes("companyNumber")
                              ? classes.pendingChangeField
                              : undefined
                          }
                          data-test="organisation-details-main-companyNumber"
                          variant="outlined"
                          label={fieldLabels["companyNumber"]}
                          fullWidth
                          InputProps={{
                            readOnly: !canEdit,
                            endAdornment: pendingOrgChangesFields?.includes(
                              "companyNumber"
                            ) ? (
                              <InputAdornment position="end">
                                <CompareArrows
                                  className={classes.pendingChangeFieldIcon}
                                />
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      }
                    />
                    {errors.companyNumber?.type === "required" && (
                      <Error>This field is required</Error>
                    )}
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="hasCharityNumber"
                    rules={{
                      required: !checkboxRequired,
                    }}
                    render={(props) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            data-test="checkbox-hasCharityNumber"
                            onChange={(e) => props.onChange(e.target.checked)}
                            checked={props.value}
                            disabled={!canEdit}
                          />
                        }
                        label={fieldLabels["hasCharityNumber"]}
                      />
                    )}
                  />
                  {checkboxErrors && (
                    <>
                      <br></br>
                      <Error>You must select at least one checkbox</Error>
                    </>
                  )}
                </Grid>
                {hasCharityNumber ? (
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="charityNumber"
                      rules={{
                        required: hasCharityNumber,
                      }}
                      as={
                        <TextField
                          className={
                            pendingOrgChangesFields?.includes("charityNumber")
                              ? classes.pendingChangeField
                              : undefined
                          }
                          data-test="organisation-details-main-charityNumber"
                          variant="outlined"
                          label={fieldLabels["charityNumber"]}
                          fullWidth
                          InputProps={{
                            readOnly: !canEdit,
                            endAdornment: pendingOrgChangesFields?.includes(
                              "charityNumber"
                            ) ? (
                              <InputAdornment position="end">
                                <CompareArrows
                                  className={classes.pendingChangeFieldIcon}
                                />
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      }
                    />
                    {errors.charityNumber?.type === "required" && (
                      <Error>This field is required</Error>
                    )}
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="isOtherUkLegalEntity"
                    rules={{
                      required: !checkboxRequired,
                    }}
                    render={(props) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            data-test="checkbox-isOtherUkLegalEntity"
                            onChange={(e) => props.onChange(e.target.checked)}
                            checked={props.value}
                            disabled={!canEdit}
                          />
                        }
                        label={fieldLabels["isOtherUkLegalEntity"]}
                      />
                    )}
                  />
                  {checkboxErrors && (
                    <>
                      <br></br>
                      <Error>You must select at least one checkbox</Error>
                    </>
                  )}
                </Grid>
                {isOtherUkLegalEntity ? (
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="otherLegalEntityType"
                      rules={{
                        required: isOtherUkLegalEntity,
                      }}
                      as={
                        <TextField
                          className={
                            pendingOrgChangesFields?.includes(
                              "otherLegalEntityType"
                            )
                              ? classes.pendingChangeField
                              : undefined
                          }
                          data-test="organisation-details-main-otherLegalEntityType"
                          variant="outlined"
                          label={fieldLabels["otherLegalEntityType"]}
                          fullWidth
                          InputProps={{
                            readOnly: !canEdit,
                            endAdornment: pendingOrgChangesFields?.includes(
                              "otherLegalEntityType"
                            ) ? (
                              <InputAdornment position="end">
                                <CompareArrows
                                  className={classes.pendingChangeFieldIcon}
                                />
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      }
                    />
                    {errors.otherLegalEntityType?.type === "required" && (
                      <Error>This field is required</Error>
                    )}
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="isRegisteredInOtherCountry"
                    rules={{
                      required: !checkboxRequired,
                    }}
                    render={(props) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            data-test="checkbox-isRegisteredInOtherCountry"
                            onChange={(e) => props.onChange(e.target.checked)}
                            checked={props.value}
                            disabled={!canEdit}
                          />
                        }
                        label={fieldLabels["isRegisteredInOtherCountry"]}
                      />
                    )}
                  />
                  {checkboxErrors && (
                    <>
                      <br></br>
                      <Error>You must select at least one checkbox</Error>
                    </>
                  )}
                </Grid>
                {isRegisteredInOtherCountry ? (
                  <>
                    <Grid item xs={12}>
                      <Controller
                        control={control}
                        name="otherCountryOfRegistration"
                        rules={{
                          required: isRegisteredInOtherCountry,
                        }}
                        as={
                          <TextField
                            className={
                              pendingOrgChangesFields?.includes(
                                "otherCountryOfRegistration"
                              )
                                ? classes.pendingChangeField
                                : undefined
                            }
                            data-test="organisation-details-main-otherCountryOfRegistration"
                            variant="outlined"
                            label={fieldLabels["otherCountryOfRegistration"]}
                            fullWidth
                            InputProps={{
                              readOnly: !canEdit,
                              endAdornment: pendingOrgChangesFields?.includes(
                                "otherCountryOfRegistration"
                              ) ? (
                                <InputAdornment position="end">
                                  <CompareArrows
                                    className={classes.pendingChangeFieldIcon}
                                  />
                                </InputAdornment>
                              ) : null,
                            }}
                          />
                        }
                      />
                      {errors.otherCountryOfRegistration?.type ===
                        "required" && <Error>This field is required</Error>}
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        control={control}
                        name="otherCountryIdentifier"
                        as={
                          <TextField
                            className={
                              pendingOrgChangesFields?.includes(
                                "otherCountryIdentifier"
                              )
                                ? classes.pendingChangeField
                                : undefined
                            }
                            data-test="organisation-details-main-otherCountryIdentifier"
                            variant="outlined"
                            label={fieldLabels["otherCountryIdentifier"]}
                            fullWidth
                            InputProps={{
                              readOnly: !canEdit,
                              endAdornment: pendingOrgChangesFields?.includes(
                                "otherCountryIdentifier"
                              ) ? (
                                <InputAdornment position="end">
                                  <CompareArrows
                                    className={classes.pendingChangeFieldIcon}
                                  />
                                </InputAdornment>
                              ) : null,
                            }}
                          />
                        }
                      />
                    </Grid>
                  </>
                ) : null}

                <Grid item xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: !checkboxRequired,
                    }}
                    name="isIndividualOrPartnership"
                    render={(props) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            data-test="checkbox-isIndividualOrPartnership"
                            onChange={(e) => props.onChange(e.target.checked)}
                            checked={props.value}
                            disabled={!canEdit}
                          />
                        }
                        label={fieldLabels["isIndividualOrPartnership"]}
                      />
                    )}
                  />
                  {checkboxErrors && (
                    <>
                      <br></br>
                      <Error>You must select at least one checkbox</Error>
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
            <h6
              className={classes.formHeading}
              data-test="organisation-details-dates"
            >
              Recognition Dates
            </h6>
            <Paper
              className={classes.formSection}
              data-test="organisation-details-dates"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <h6
                    className={classes.formHeading}
                    style={{ marginTop: "0px", marginBottom: "8px" }}
                    data-test="organisation-details-dates-ofqual"
                  >
                    Ofqual
                  </h6>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="ofqualRecognisedOnDate"
                    as={
                      <DatePicker
                        returnDayBoundary="startOfDay"
                        className={
                          pendingOrgChangesFields?.includes(
                            "ofqualRecognisedOnDate"
                          )
                            ? classes.pendingChangeField
                            : undefined
                        }
                        dataTest="organisation-details-dates-ofqual-ofqualRecognisedOnDate"
                        label={fieldLabels["ofqualRecognisedOnDate"]}
                        readOnly={!canEdit}
                        startAdornment={
                          pendingOrgChangesFields?.includes(
                            "ofqualRecognisedOnDate"
                          ) ? (
                            <CompareArrows
                              className={classes.pendingChangeFieldIcon}
                              style={{ order: 1 }}
                            />
                          ) : undefined
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="ofqualSurrenderedDate"
                    as={
                      <DatePicker
                        returnDayBoundary="startOfDay"
                        className={
                          pendingOrgChangesFields?.includes(
                            "ofqualSurrenderedDate"
                          )
                            ? classes.pendingChangeField
                            : undefined
                        }
                        dataTest="organisation-details-dates-ofqual-ofqualSurrenderedOnDate"
                        label={fieldLabels["ofqualSurrenderedDate"]}
                        readOnly={!canEdit}
                        startAdornment={
                          pendingOrgChangesFields?.includes(
                            "ofqualSurrenderedDate"
                          ) ? (
                            <CompareArrows
                              className={classes.pendingChangeFieldIcon}
                              style={{ order: 1 }}
                            />
                          ) : undefined
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="ofqualWithdrawnOnDate"
                    as={
                      <DatePicker
                        returnDayBoundary="startOfDay"
                        className={
                          pendingOrgChangesFields?.includes(
                            "ofqualWithdrawnOnDate"
                          )
                            ? classes.pendingChangeField
                            : undefined
                        }
                        dataTest="organisation-details-dates-ofqual-ofqualWithdrawnOnDate"
                        label={fieldLabels["ofqualWithdrawnOnDate"]}
                        readOnly={!canEdit}
                        startAdornment={
                          pendingOrgChangesFields?.includes(
                            "ofqualWithdrawnOnDate"
                          ) ? (
                            <CompareArrows
                              className={classes.pendingChangeFieldIcon}
                              style={{ order: 1 }}
                            />
                          ) : undefined
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <h6
                    className={classes.formHeading}
                    style={{ marginTop: "8px", marginBottom: "8px" }}
                    data-test="organisation-details-dates-ccea"
                  >
                    CCEA Regulator
                  </h6>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="cceaRecognisedOnDate"
                    as={
                      <DatePicker
                        returnDayBoundary="startOfDay"
                        className={
                          pendingOrgChangesFields?.includes(
                            "cceaRecognisedOnDate"
                          )
                            ? classes.pendingChangeField
                            : undefined
                        }
                        dataTest="organisation-details-dates-ccea-cceaRecognisedOnDate"
                        label={fieldLabels["cceaRecognisedOnDate"]}
                        readOnly={!canEdit}
                        startAdornment={
                          pendingOrgChangesFields?.includes(
                            "cceaRecognisedOnDate"
                          ) ? (
                            <CompareArrows
                              className={classes.pendingChangeFieldIcon}
                              style={{ order: 1 }}
                            />
                          ) : undefined
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="cceaSurrenderedDate"
                    as={
                      <DatePicker
                        returnDayBoundary="startOfDay"
                        className={
                          pendingOrgChangesFields?.includes(
                            "cceaSurrenderedDate"
                          )
                            ? classes.pendingChangeField
                            : undefined
                        }
                        dataTest="organisation-details-dates-ccea-cceaSurrenderedOnDate"
                        label={fieldLabels["cceaSurrenderedDate"]}
                        readOnly={!canEdit}
                        startAdornment={
                          pendingOrgChangesFields?.includes(
                            "cceaSurrenderedDate"
                          ) ? (
                            <CompareArrows
                              className={classes.pendingChangeFieldIcon}
                              style={{ order: 1 }}
                            />
                          ) : undefined
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="cceaWithdrawnOnDate"
                    as={
                      <DatePicker
                        returnDayBoundary="startOfDay"
                        className={
                          pendingOrgChangesFields?.includes(
                            "cceaWithdrawnOnDate"
                          )
                            ? classes.pendingChangeField
                            : undefined
                        }
                        dataTest="organisation-details-dates-ccea-cceaWithdrawnOnDate"
                        label={fieldLabels["cceaWithdrawnOnDate"]}
                        readOnly={!canEdit}
                        startAdornment={
                          pendingOrgChangesFields?.includes(
                            "cceaWithdrawnOnDate"
                          ) ? (
                            <CompareArrows
                              className={classes.pendingChangeFieldIcon}
                              style={{ order: 1 }}
                            />
                          ) : undefined
                        }
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
            <h6
              className={classes.formHeading}
              data-test="organisation-details-address-header"
            >
              Organisation Address
            </h6>
            <Paper
              className={classes.formSection}
              data-test="organisation-details-address-section"
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="line1"
                    as={
                      <TextField
                        data-test="organisation-details-address-line1"
                        variant="outlined"
                        label={fieldLabels["line1"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="line2"
                    as={
                      <TextField
                        data-test="organisation-details-address-line2"
                        variant="outlined"
                        label={fieldLabels["line2"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="line3"
                    as={
                      <TextField
                        data-test="organisation-details-address-line3"
                        variant="outlined"
                        label={fieldLabels["line3"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="line4"
                    as={
                      <TextField
                        data-test="organisation-details-address-line4"
                        variant="outlined"
                        label={fieldLabels["line4"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="postCode"
                    as={
                      <TextField
                        data-test="organisation-details-address-postcode"
                        variant="outlined"
                        label={fieldLabels["postCode"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="country"
                    as={
                      <TextField
                        data-test="organisation-details-address-country"
                        variant="outlined"
                        label={fieldLabels["country"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    as={
                      <TextField
                        data-test="organisation-details-address-phoneNumber"
                        variant="outlined"
                        label={fieldLabels["phoneNumber"]}
                        fullWidth
                        InputProps={{
                          readOnly: !canEdit,
                        }}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};
