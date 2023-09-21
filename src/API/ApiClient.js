import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { AppRoute } from '../const/app-routes';
import authenticationService from '../_services/authentication.service';
import Storage from '../_helpers/Storage';
import config from './config';
import isObject from '../_helpers/scripts/isObject';
import { APP_ID } from '../_constants/CONSTANT';
import FetchError from './FetchError';
import store from '../_enchancers/configureStore';
import history from '../_enchancers/history';

const axiosInstance = axios.create();

class ApiClient {
  static Headers = async (options) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (options.authorization) {
      const currentUser = Storage.getItem('currentUser');

      if (!currentUser) {
        return authenticationService.logout();
      }

      headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }

    /*
      use package i18next-browser-languageDetector
      localStorage (set key i18nextLng=LANGUAGE)
    */
    // const languages = { ru: 'ru-RU', uk: 'uk-UA', en: 'en-US' };
    // const current = Storage.get('i18nextLng');
    // headers['Accept-Language'] = languages[current] || languages.ru;

    if (options.reCaptchaToken) {
      headers.Recaptcha = options.reCaptchaToken;
    }

    if (options.Contracts) {
      if (isObject(options.Contracts)) {
        const { Contracts, ClientUnit } = options.Contracts;
        headers.Contracts = Contracts;

        if (ClientUnit) {
          headers.ClientUnits = ClientUnit;
        }
      }
    }

    if (options.NoCache) {
      headers['Cache-Control'] = 'no-cache';
    } else {
      headers['Cache-Control'] = undefined;
    }

    const appId = window.localStorage.getItem(APP_ID);
    if (appId) {
      headers.appId = appId;
    }

    return headers;
  };

  static Response = async (response) => {
    if (response.message === 'Network Error') {
      if (process.env.NODE_ENV !== 'development') {
        return authenticationService.logout();
      }
      throw new Error(response.message);
    }

    if (response?.status === 410) {
      if (process.env.NODE_ENV !== 'development') {
        return authenticationService.logout();
      }
      throw new Error(response.message);
    }

    if (response.headers['content-type'] === 'application/pdf') {
      return response.data;
    }
    if (response.status === 200) {
      return response.data;
    }

    if (response.status === 204) {
      return undefined;
    }

    if (response.status === 400) {
      throw response.data;
    }

    if (response.status === 401) {
      throw new FetchError('Unauthorized', 401);
    }

    if (response.status === 404) {
      throw new FetchError('Not Found', 404);
    }

    if (process.env.NODE_ENV !== 'development') {
      if (response.status === 500 || response.status === 503) {
        store.dispatch(
          push(`${AppRoute.Error500}`, {
            from: history.location.pathname,
          })
        );
      }
    }

    // get error from api
    if (response.status === 501) {
      throw new Error(response.data);
    }

    throw Error(response.statusText);
  };

  /**
   *
   * @param {axios.AxiosRequestConfig} options
   */
  static Options = (options) => {
    if (options.withCredentials) {
      options.withCredentials = true;
    }

    return options;
  };

  static post = async (
    url,
    body = {},
    options = { authorization: true, withCredentials: false }
  ) => {
    const fullUrl = config.apiUrl + url;

    const headers = await ApiClient.Headers(options);
    const axiosOptions = ApiClient.Options(options);
    const response = await axiosInstance.post(fullUrl, body, {
      ...axiosOptions,
      headers,
    });

    return ApiClient.Response(response);
  };

  static postForm = async (
    url,
    body = {},
    options = { authorization: true, withCredentials: false }
  ) => {
    const fullUrl = config.apiUrl + url;

    const headers = await ApiClient.Headers(options);
    const axiosOptions = ApiClient.Options(options);
    const response = await axiosInstance.postForm(fullUrl, body, {
      ...axiosOptions,
      headers,
    });

    return ApiClient.Response(response);
  };

  /**
   *
   * @param {string} url
   * @param {AxiosRequestConfig} options
   * @param {ResponseType} responseType
   * @returns
   */
  static get = async (url, options = { authorization: true }, responseType) => {
    const fullUrl = config.apiUrl + url;
    const headers = await ApiClient.Headers(options);
    const axiosOptions = ApiClient.Options(options);
    const response = await axiosInstance.get(fullUrl, {
      ...axiosOptions,
      headers,
      responseType,
      signal: options.signal,
    });

    return ApiClient.Response(response);
  };

  /**
   *
   * @param {string} url
   * @param {AxiosRequestConfig} options
   * @param {ResponseType} responseType
   * @returns
   */
  static delete = async (url, options = { authorization: true }) => {
    const fullUrl = config.apiUrl + url;

    const headers = await ApiClient.Headers(options);
    const axiosOptions = ApiClient.Options(options);
    const response = await axiosInstance.delete(fullUrl, {
      ...axiosOptions,
      headers,
    });

    return ApiClient.Response(response);
  };

  /**
   *
   * @param {string} url
   * @param {*} body
   * @param {AxiosRequestConfig} options
   * @param {ResponseType} responseType
   * @returns
   */
  static patch = async (url, body, options = { authorization: true }) => {
    const fullUrl = config.apiUrl + url;

    const headers = await ApiClient.Headers(options);
    const response = await axiosInstance.patch(fullUrl, body, { headers });

    return ApiClient.Response(response);
  };

  /**
   *
   * @param {string} url
   * @param {*} body
   * @param {AxiosRequestConfig} options
   * @param {ResponseType} responseType
   * @returns
   */
  static put = async (url, body, options = { authorization: true }) => {
    const fullUrl = config.apiUrl + url;

    const headers = await ApiClient.Headers(options);
    const response = await axiosInstance.put(fullUrl, body, { headers });

    return ApiClient.Response(response);
  };

  // App
  static App = async (reCaptchaToken) =>
    ApiClient.get('/v1.0/App', { authorization: false, reCaptchaToken });

  // Barcode

  static getGenereteBarcode = async () =>
    ApiClient.get('/v1.0/GenerateBarcode');

  static postGenereteBarcode = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/GenerateBarcode', data, {
      authorization: true,
      reCaptchaToken,
    });

  // Commissionaires

  static Commissionaires = async (Contracts) =>
    ApiClient.get('/v1.0/Commissionaire', { authorization: true, Contracts });

  // Dialab
  static DialabOrders = async (startDate, endDate, pageNumber, pageSize) =>
    ApiClient.get(
      `/v1.0/Dialab/Orders?startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  // DiscountPrefix

  static CreateDiscountPrefix = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/DiscountPrefix/CreateDiscountPrefix', data, {
      authorization: true,
      reCaptchaToken,
    });

  static DiscountPrefixGenerationType = async () =>
    ApiClient.get('/v1.0/DiscountPrefix/DiscountPrefixGenerateType');

  static AllDiscountPrefix = async (prefix, pageNumber, pageSize) =>
    ApiClient.get(
      `/v1.0/DiscountPrefix/AllDiscountPrefix?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  static DiscountPrefix = async (prefix, pageNumber, pageSize) =>
    ApiClient.get(
      `/v1.0/DiscountPrefix/DiscountPrefix?prefix=${prefix}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  static ChangeDiscountPrefixStatus = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/DiscountPrefix/ChangeDiscountPrefixStatus', data, {
      authorization: true,
      reCaptchaToken,
    });

  static ChangeDiscountPrefix = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/DiscountPrefix/ChangeDiscountPrefix', data, {
      authorization: true,
      reCaptchaToken,
    });

  // Discount

  static SearchDiscountCardByFilters = async (data) =>
    ApiClient.post('/v1.0/Discount/SearchDiscountCardByFilters', data);

  static InitCreateDiscountCard = async () =>
    ApiClient.get('/v1.0/Discount/InitCreateDiscountCard');

  static InitSearchDiscountCardByFilters = async () =>
    ApiClient.get('/v1.0/Discount/InitSearchDiscountCardByFilters');

  static CreateDiscountCard = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/Discount/CreateDiscountCard', data, {
      authorization: true,
      reCaptchaToken,
    });

  static DiscountCards = async (pageNumber, pageSize) =>
    ApiClient.get(
      `/v1.0/Discount/DiscountCards?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  static InitUpdateDiscountCard = async (id) =>
    ApiClient.get(`/v1.0/Discount/InitUpdateDiscountCard?id=${id}`);

  static InitUpdateDiscountCardPool = async () =>
    ApiClient.get('/v1.0/Discount/InitUpdateDiscountCardPool');

  static UpdateDiscountCard = async (data) =>
    ApiClient.post('/v1.0/Discount/UpdateDiscountCard', data);

  static UpdateDiscountCardPool = async (data) =>
    ApiClient.post('/v1.0/Discount/UpdateDiscountCardPool', data);

  static UpdateDiscountCardStatus = async (data) =>
    ApiClient.post('/v1.0/Discount/UpdateDiscountCardStatus', data);

  // user
  static Registration = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/User', data, {
      authorization: false,
      reCaptchaToken,
    });

  static User = async (id, email, reCaptchaToken) =>
    ApiClient.get(`/v1.0/User?id=${id}&email=${email}`, {
      authorization: true,
      reCaptchaToken,
    });

  static UserSearch = async (email, reCaptchaToken) =>
    ApiClient.get(`/v1.0/User/Search?email=${email}`, {
      authorization: true,
      reCaptchaToken,
    });

  static UserSetting = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/User/Settings', data, {
      authorization: true,
      reCaptchaToken,
    });

  static ForgotPassword = async (email, reCaptchaToken) =>
    ApiClient.get(`/v1.0/User/ForgotPassword?email=${email}`, {
      authorization: false,
      reCaptchaToken,
    });

  static ChangeForgotPassword = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/User/ChangeForgotPassword', data, {
      authorization: false,
      reCaptchaToken,
    });

  static ChangeOwnUserPassword = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/User/ChangeOwnUserPassword', data, {
      authorization: true,
      reCaptchaToken,
    });

  // Token
  static Login = async (data, reCaptchaToken, AppId) =>
    ApiClient.post('/v1.0/Token/login', data, {
      authorization: false,
      reCaptchaToken,
      AppId,
    });

  static Refresh = async (data) =>
    ApiClient.post('/v1.0/Token/refresh', data, { authorization: false });

  static RevokeToken = async () => ApiClient.post('/v1.0/Token/revoke', {});

  //  IdentificationNumberType

  static GetIdentificationNumberTypes = (Contracts) =>
    ApiClient.get('/v1.0/IdentificationNumberType/All', {
      authorization: true,
      Contracts,
    });

  // Patient

  static GetPatient = (id, Contracts) =>
    ApiClient.get(`/v1.0/Patient?id=${id}`, {
      authorization: true,
      Contracts,
    });

  static CreatePatient = (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Patient', data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  static UpdatePatient = (data, reCaptchaToken, Contracts) =>
    ApiClient.put('/v1.0/Patient', data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  static PatientSearch = (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Patient/Search', data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  // Contract

  static getContractAll = (Contracts) =>
    ApiClient.get('/v1.0/Contract/All', {
      authorization: true,
      Contracts,
    });

  static ContractSettings = (Contracts) =>
    ApiClient.get('/v1.0/Contract/Settings', {
      authorization: true,
      Contracts,
    });

  static ContractChangeSetting = (data, Contracts) =>
    ApiClient.post('/v1.0/Contract/ChangeSettings', data, {
      authorization: true,
      Contracts,
    });

  static InitAddingContractFromSilab = () =>
    ApiClient.get('/v1.0/Contract/InitAddingContractFromSilab');

  static ActivateContractAndWorkSpace = (data) =>
    ApiClient.post('/v1.0/Contract/ActivateContractAndWorkSpace', data);

  static ContractAdditionalField = (Contracts) =>
    ApiClient.get('/v1.0/Contract/ContractAdditionalField', {
      authorization: true,
      Contracts,
    });

  // Order

  static CreateOrder = (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Order', data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  static UpdateOrder = (data, orderId, reCaptchaToken, Contracts) =>
    ApiClient.patch(`/v1.0/Order/Update?orderId=${orderId}`, data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  static GetOrderByBarcode = (barcode, Contracts) =>
    ApiClient.get(`/v1.0/Order?barcode=${barcode}`, {
      authorization: true,
      Contracts,
    });

  static OrderCreateOrdersFromExcelData = async (data, Contracts) =>
    ApiClient.postForm('/v1.0/Order/CreateOrdersByExcelTemplate', data, {
      authorization: true,
      Contracts,
    });

  static OrderExcelTemplate = async (Contracts) =>
    ApiClient.get('/v1.0/Order/ExcelTemplate', {
      authorization: true,
      Contracts,
    });

  static CalculateServices = async (
    codes,
    gender,
    reCaptchaToken,
    Contracts,
    isCalculateByContract = null,
    isBiomaterial = null
  ) => {
    let biomaterial = '';
    let calculateByContract = '';
    if (isCalculateByContract !== null) {
      calculateByContract = `&isCalculateByContract=${isCalculateByContract}`;
    }
    if (isBiomaterial !== null) {
      biomaterial = `&isBiomaterials=${isBiomaterial}`;
    }
    return ApiClient.get(
      `/v1.0/Order/CalculateServices?codes=${codes}&gender=${gender}${calculateByContract}${biomaterial}`,
      {
        authorization: true,
        reCaptchaToken,
        Contracts,
      }
    );
  };

  // Provider

  static ProviderOrders = (body) =>
    ApiClient.post('/v1.0/Provider/Orders', body);

  static ProviderOrderDetails = (barcode, providerId, isSent) => {
    const params = new URLSearchParams();
    params.append('barcode', barcode);
    params.append('providerId', providerId);
    params.append('isSent', isSent);

    return ApiClient.get(`/v1.0/Provider/OrderDetails?${params.toString()}`);
  };

  static ProviderImport = async (data) =>
    ApiClient.post('/v1.0/Provider/Import', data);

  static ProviderProviders = async () =>
    ApiClient.get('/v1.0/Provider/Providers');

  static GetOrdersByBarcodes = async (data) =>
    ApiClient.post('/v1.0/Provider/GetOrdersByBarcodes', data);

  static PrintProviderBarcodes = async (barcodes) =>
    ApiClient.get(`/v1.0/Provider/PrintBarcodes?barcodes=${barcodes}`);

  static GetOrdersDetails = async (body) =>
    ApiClient.post('/v1.0/Provider/GetOrdersDetails', body);

  // Role

  static GetAllRoles = () => ApiClient.get('/v1.0/Role/all');

  // SelectedService

  static CreateSelectedService = (serviceId, Contracts) => {
    const params = new URLSearchParams();
    params.append('serviceId', serviceId);

    return ApiClient.post(`/v1.0/SelectedService?${params.toString()}`, null, {
      authorization: true,
      Contracts,
    });
  };

  static DeleteSelectedService = (serviceId, Contracts) => {
    const params = new URLSearchParams();
    params.append('serviceId', serviceId);

    return ApiClient.delete(`/v1.0/SelectedService?${params.toString()}`, {
      authorization: true,
      Contracts,
    });
  };

  static GetSelectedServices = (page, pageSize, Contracts, signal) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('pageSize', pageSize);

    return ApiClient.get(`/v1.0/SelectedService/All?${params.toString()}`, {
      authorization: true,
      Contracts,
      signal,
    });
  };
  // Service

  static Service = (
    contractId,
    page,
    pageSize,
    reCaptchaToken,
    Contracts,
    selected = false,
    NoCache = false
  ) => {
    const params = new URLSearchParams();
    params.append('contractId', contractId);
    params.append('page', page);
    params.append('pageSize', pageSize);
    if (selected) {
      params.append('selected', selected);
    }

    return ApiClient.get(`/v1.0/service?${params.toString()}`, {
      authorization: true,
      reCaptchaToken,
      Contracts,
      NoCache,
    });
  };

  static ServiceSearch = (
    term,
    reCaptchaToken,
    Contracts,
    selected = false,
    NoCache = false
  ) => {
    const params = new URLSearchParams();
    params.append('term', term);
    params.append('selected', selected);

    return ApiClient.get(`/v1.0/Service/search?${params.toString()}`, {
      authorization: true,
      reCaptchaToken,
      Contracts,
      NoCache,
    });
  };

  // ServiceExtension

  static ServiceManualSearch = (term, pageNumber, pageSize, reCaptchaToken) =>
    ApiClient.get(
      `/v1.0/ServiceExtension/search?term=${term}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        authorization: true,
        reCaptchaToken,
      }
    );

  static ServiceManualSearchServices = (term, reCaptchaToken) =>
    ApiClient.get(`/v2.0/ServiceExtension/search?term=${term}`, {
      authorization: true,
      reCaptchaToken,
    });

  static ServiceManualDetails = (code, reCaptchaToken) =>
    ApiClient.get(`/v1.0/ServiceExtension/details?code=${code}`, {
      authorization: true,
      reCaptchaToken,
    });

  static ServiceManual = (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/ServiceExtension', data, {
      authorization: true,
      reCaptchaToken,
    });

  // Result
  static Results = async (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Result', data, {
      reCaptchaToken,
      authorization: true,
      Contracts,
    });

  static ResultsPdf = async (barcode, reCaptchaToken, Contracts) =>
    ApiClient.get(`/v1.0/Result?barcode=${barcode}`, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  // Sorting
  static Sorting = async (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Sorting', data, {
      authorization: true,
      Contracts,
      reCaptchaToken,
    });

  static SortingDelete = async (barcode, code, Contracts) =>
    ApiClient.delete(`/v1.0/Sorting?barcode=${barcode}&code=${code}`, {
      authorization: true,
      Contracts,
    });

  static SortingChangeOrderStatus = async (barcode, newStatus, Contracts) =>
    ApiClient.post(
      `/v1.0/Sorting/ChangeOrderStatus?barcode=${barcode}&newStatus=${newStatus}`,
      {},
      { authorization: true, Contracts }
    );

  static SortingDirections = async (barcode, reCaptchaToken, Contracts) =>
    ApiClient.get(`/v1.0/Sorting/Directions?barcodes=${barcode}`, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  static GetPreOrderByBarcode = (barcode, Contracts) =>
    ApiClient.get(`/v1.0/Sorting/PreOrder?barcode=${barcode}`, {
      authorization: true,
      Contracts,
    });

  /**
   * @param {number} barcodes Штрихкод для импорта
   */
  static SortingImport = async (barcodes, reCaptchaToken, Contracts) =>
    ApiClient.post(
      `/v1.0/Sorting/Import?barcodes=${barcodes}`,
      {},
      {
        authorization: true,
        reCaptchaToken,
        Contracts,
      }
    );

  static SearchPreOrderByFilters = async (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Sorting/SearchPreOrderByFilters', data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  // Synchronization

  static SyncCalculator = async (data, reCaptchaToken) =>
    ApiClient.postForm('/v1.0/Synchronization/Calculator', data, {
      authorization: true,
      reCaptchaToken,
    });

  static SyncMedCenters = async (data, reCaptchaToken) =>
    ApiClient.postForm('/v1.0/Synchronization/MedicalCenter', data, {
      authorization: true,
      reCaptchaToken,
    });

  static SynchronizationServiceExtension = async () =>
    ApiClient.get('/v1.0/Synchronization/ServiceExtension');

  static SynchronizationPriceBook = async () =>
    ApiClient.get('/v1.0/Synchronization/PriceBook');

  static SynchronizationProviders = async () =>
    ApiClient.get('/v1.0/Synchronization/Providers');

  // Mail
  static Mail = async (data, reCaptchaToken, Contracts) =>
    ApiClient.post('/v1.0/Mail', data, {
      authorization: true,
      reCaptchaToken,
      Contracts,
    });

  static FeedbackForm = async (data, reCaptchaToken) =>
    ApiClient.post('/v1.0/Mail/FeedbackForm', data, {
      authorization: true,
      reCaptchaToken,
    });

  // Report
  static Report = async (barcode, patientId, Contracts) => {
    let urlParams = '?';

    if (patientId) {
      urlParams += `patientId=${patientId}`;
    }
    if (barcode) {
      urlParams += `barcode=${barcode}`;
    }

    return ApiClient.get(`/v1.0/Report${urlParams}`, {
      authorization: true,
      Contracts,
    });
  };

  static GetBarcodePdfToPrint = async (barcode, Contracts) =>
    ApiClient.get(`/v1.0/Report/BarcodePdf?barcode=${barcode}`, {
      authorization: true,
      Contracts,
    });

  // SMTP

  static GetSmtpSettings = async (pageNumber, pageSize) => {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);

    return ApiClient.get(`/v1.0/Smtp/All?${params.toString()}`);
  };

  static GetSmtpSetting = async (id) => ApiClient.get(`/v1.0/Smtp?id=${id}`);

  static CreateSmtpSetting = async (body) => ApiClient.post('/v1.0/Smtp', body);

  static UpdateSmtpSetting = async (body) => ApiClient.put('/v1.0/Smtp', body);

  static DeleteSmtpSetting = async (id) =>
    ApiClient.delete(`/v1.0/Smtp?id=${id}`);

  static TestSmtpSetting = async (body) =>
    ApiClient.post('/v1.0/Smtp/Test', body);

  // Sender

  static GetSenders = async (pageNumber, pageSize) => {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);

    return ApiClient.get(`/v1.0/Sender/All?${params.toString()}`);
  };

  static GetSender = async (id) => ApiClient.get(`/v1.0/Sender?id=${id}`);

  static CreateSender = async (body) => ApiClient.post('/v1.0/Sender', body);

  static UpdateSender = async (body) => ApiClient.put('/v1.0/Sender', body);

  static DeleteSender = async (id) => ApiClient.delete(`/v1.0/Sender?id=${id}`);

  // ParseRule

  static GetParseRules = async (pageNumber, pageSize) => {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);

    return ApiClient.get(`/v1.0/ParseRule/All?${params.toString()}`);
  };

  static GetParseRule = async (id) => ApiClient.get(`/v1.0/ParseRule?id=${id}`);

  static CreateParseRule = async (body) =>
    ApiClient.post('/v1.0/ParseRule', body);

  static UpdateParseRule = async (body) =>
    ApiClient.put('/v1.0/ParseRule', body);

  static DeleteParseRule = async (id) =>
    ApiClient.delete(`/v1.0/ParseRule?id=${id}`);

  // Promotion

  static CreatePromotion = async (body) =>
    ApiClient.post('/v1.0/Promotion', body);

  static GetPromotion = async (id) => ApiClient.get(`/v1.0/Promotion?id=${id}`);

  static UpdatePromotions = async (body) =>
    ApiClient.put('/v1.0/Promotion', body);

  static GetPromotions = async (pageNumber, pageSize) => {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);

    return ApiClient.get(`/v1.0/Promotion/All?${params.toString()}`);
  };
}

export { axiosInstance };
export default ApiClient;
