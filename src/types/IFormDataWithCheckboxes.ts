import IFormData from "./IFormData";

export default interface IFormDataWithCheckbosex extends IFormData{
    preparationRules: boolean,
    personalDataProcessing: boolean,
    serviceAgreement: boolean,
}