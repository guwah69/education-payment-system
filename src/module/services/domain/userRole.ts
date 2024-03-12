export enum UserRole {
  OFQUALStaff = 0,
  OfqualQualAdmin = 1,
  OfqualAccreditationAdmin = 2,
  ITAdmin = 3,
  CCEAStaff = 4,
  CCEAQualAdmin = 5,
  CCEAAccreditationAdmin = 6,
  AOQualAdmin = 7,
  AODataAdmin = 8,
  AOAdmin = 9,
  AO = 10,
  OfqualContactOfqualAdmin = 11,
  OfqualSubmissionAdmin = 12,
  OfqualEventNotificationsAdmin = 13,
  AOEventNotificationsAdmin = 14,
  CCEAEventNotificationsAdmin = 15,
  OfqualRegulatoryAdmin = 16,
  OfqualNewsAdmin = 17,
  AoResponsibleOfficer = 18,
  AoChair = 19,
  AoCEO = 20,
  OfqualExpertsAdmin = 21,
  OfqualExpertsEvaluator = 22,
  OfqualExpertsCommissioner = 23,
  OfqualRecognitionAdmin = 24,
  OfqualRecognitionUser = 25,
  AORegulationTeam = 26,
  OfqualAssessmentPlanAdmin = 27,
  OfqualAssessmentPlanReviewer = 28,
  ComplaintsCaseAdmin = 29,
  ComplaintsCaseCollaborator = 30,
  ComplaintsCaseReader = 31,
  ComplaintsCaseHelpdesk = 32,
  OfqualRecognitionExpansionAdmin = 33,
  OfqualRecognitionExpansionReader = 34,
}

const UserRoleText = [
  "Ofqual Standard User",
  "Ofqual Qualification Admin",
  "Ofqual Accreditation Admin",
  "Ofqual Global Admin",
  "CCEA Standard User",
  "CCEA Qualification Admin",
  "CCEA Accreditation Admin",
  "Qualification Admin",
  "Data Portal Admin",
  "Global Admin",
  "Standard User",
  "Ofqual Communications Admin",
  "Ofqual SVR Admin",
  "Ofqual Event Notifications Admin",
  "Event Notifications Admin",
  "CCEA Event Notifications Admin",
  "Ofqual Awarding Organisation Admin",
  "Ofqual News Admin",
  "Responsible Officer",
  "Chair of Governing Body",
  "CEO",
  "Ofqual Experts Admin",
  "Ofqual Experts Evaluator",
  "Ofqual Experts Commissioner",
  "Ofqual Recognition Admin",
  "Ofqual Recognition User",
  "Regulation Team",
  "Ofqual Assessment Plan Admin",
  "Ofqual Assessment Plan Reviewer",
  "Complaints Case Admin",
  "Complaints Case Collaborator",
  "Complaints Case Reader",
  "Complaints Case Helpdesk",
  "Recognition Expansion Admin",
  "Recognition Expansion Reader",
];

// ordering of roles in this array is important to
//  the order as displayed in the UI
const OfqualRoles = [
  UserRole.OFQUALStaff,
  UserRole.ITAdmin,
  UserRole.OfqualAccreditationAdmin,
  UserRole.OfqualContactOfqualAdmin,
  UserRole.OfqualEventNotificationsAdmin,
  UserRole.OfqualNewsAdmin,
  UserRole.OfqualQualAdmin,
  UserRole.OfqualRegulatoryAdmin,
  UserRole.OfqualSubmissionAdmin,
  UserRole.OfqualExpertsAdmin,
  UserRole.OfqualExpertsEvaluator,
  UserRole.OfqualExpertsCommissioner,
  UserRole.OfqualRecognitionAdmin,
  UserRole.OfqualRecognitionUser,
  UserRole.OfqualAssessmentPlanAdmin,
  UserRole.OfqualAssessmentPlanReviewer,
  UserRole.ComplaintsCaseAdmin,
  UserRole.ComplaintsCaseCollaborator,
  UserRole.ComplaintsCaseHelpdesk,
  UserRole.ComplaintsCaseReader,
  UserRole.OfqualRecognitionExpansionAdmin,
  UserRole.OfqualRecognitionExpansionReader,
];

// ordering of roles in this array is important to
//  the order as displayed in the UI
const CCEARoles = [
  UserRole.CCEAStaff,
  UserRole.CCEAAccreditationAdmin,
  UserRole.CCEAEventNotificationsAdmin,
  UserRole.CCEAQualAdmin,
];

// ordering of roles in this array is important to
//  the order as displayed in the UI
const AoRoles = [
  UserRole.AO,
  UserRole.AOAdmin,
  UserRole.AODataAdmin,
  UserRole.AoChair,
  UserRole.AoCEO,
  UserRole.AoResponsibleOfficer,
  UserRole.AOEventNotificationsAdmin,
  UserRole.AOQualAdmin,
  UserRole.AORegulationTeam,
];

const AllRoles = [...OfqualRoles, ...CCEARoles, ...AoRoles];

export { UserRoleText, CCEARoles, OfqualRoles, AllRoles, AoRoles };