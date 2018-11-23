import { CHANGE_PROFILE } from "../Constants";

export default function changeProfile(
  Name,
  VeteranID,
  Photo,
  RegimentalNumber,
  PlaceOfBirth,
  Religion,
  Occupation,
  StreetName,
  City,
  State,
  Postcode,
  Coordinates,
  AgeAtEmbarkation,
  Height,
  Weight,
  NextOfKin,
  PreviousMilitaryService,
  EnlistmentDate,
  RankOnEnlistment,
  UnitName,
  AWMembarkationRollNumber,
  EmbarkationDetails,
  Summary
) {
  return {
    type: CHANGE_PROFILE,
    payload: {
      Name,
      VeteranID,
      Photo,
      RegimentalNumber,
      PlaceOfBirth,
      Religion,
      Occupation,
      StreetName,
      City,
      State,
      Postcode,
      Coordinates,
      AgeAtEmbarkation,
      Height,
      Weight,
      NextOfKin,
      PreviousMilitaryService,
      EnlistmentDate,
      RankOnEnlistment,
      UnitName,
      AWMembarkationRollNumber,
      EmbarkationDetails,
      Summary
    }
  };
}
