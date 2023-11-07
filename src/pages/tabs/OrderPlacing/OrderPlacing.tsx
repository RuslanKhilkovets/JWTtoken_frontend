// Остаточна версія коду Tab2
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputMask from "react-input-mask";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Phone, Email } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import uk from 'dayjs/locale/uk';

import { ukUA } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


import { getItemFromStorage, setItemInStorage } from "../../../utils/localStorageItems";
import { DATE_FORMAT } from "../../../globals/dateFormat";


import Card from "../../../components/Card/Card";
import Button from "../../../components/UI/Button/Button";

import { emailRegex } from "../../../regex/emailRegex";
import { initialsRegex, initialsRegexString } from "../../../regex/initialsRegex";
import { placeSelectData } from "../../../globals/selectData";
import CustomSelect from "../../../components/UI/Select/Select";

import cl from "./OrderPlacing.module.scss";
import IFormDataWithCheckboxes from "../../../types/IFormDataWithCheckboxes";




dayjs.extend(customParseFormat);
dayjs.locale('uk');




export const OrderPlacing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormDataWithCheckboxes>({
    place: "",
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
    gender: "",
    birthdayDate: null,
    email: "",
    paymentMethod: "",
    preparationRules: false,
    personalDataProcessing: false,
    serviceAgreement: false,
  });

  const [emailError, setEmailError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const storedData = getItemFromStorage("formData");
    if (storedData) {
      const birthdayDate = storedData.birthdayDate
        ? dayjs(storedData.birthdayDate, DATE_FORMAT)
        : null;
      setFormData((prevData) => ({
        ...prevData,
        ...storedData,
        birthdayDate,
      }));
    }
  }, []);

  useEffect(() => {
    // Update storage whenever formData changes
    setItemInStorage("formData", formData);
  }, [formData]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("kl;mk")
  };

  const handleDatePickerChange = (date: any) => {
    const formattedDate = dayjs(date);
    setFormData((prevData) => ({
      ...prevData,
      birthdayDate: formattedDate,
    }));
  };

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    if (!emailRegex.test(email)) {
      setEmailError("Невалідна адреса електронної пошти");
    } else {
      setEmailError("");
    }

    setFormData((prevData) => ({
      ...prevData,
      email: email,
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const checked = e.target.checked; // Отримати значення чекбоксу

    setFormData((prevData) => ({
      ...prevData,
      [name]: checked, // Встановити булеве значення для чекбокса
    }));
  };
  const onFormSubmit = () => {
    if (validateForm()) {
      const shoppingCart = getItemFromStorage("shoppingCart") || [];
      if (shoppingCart.length > 0) {
        setItemInStorage("formData", {
          ...formData,
          birthdayDate: formData.birthdayDate
            ? dayjs(formData.birthdayDate, DATE_FORMAT).format(DATE_FORMAT)
            : null,
        });
        navigate("../tab3");
      } else {
        setFormErrors("Додайте щось до корзини перед оформленням замовлення");
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData, formData]);

  const validateForm = () => {
    const isFormValid = (
      formData.surname &&
      formData.name &&
      formData.birthdayDate &&
      formData.phone &&
      formData.email &&
      formData.place &&
      formData.paymentMethod &&
      formData.preparationRules &&
      formData.personalDataProcessing &&
      formData.serviceAgreement &&
      !emailError
    );

    setIsFormValid(!!isFormValid);
  
    if (!isFormValid) {
      setFormErrors("Заповніть всі поля та відзначте всі обов'язкові чекбокси для переходу на наступну сторінку");
      return false;
    }
    setFormErrors("")
    return true;
  };
  
  return (
    <div className={cl.Tab2}>
      <div className={cl.Tab2__Container}>
        <div className={cl.Tab2__Items}>
          <div className={cl.Tab2__Card}>
            <Card title="Информация">
              <FormControl sx={{ width: "100%", margin: "20px 0" }}>
                <InputLabel id="place">Пункт сдачи</InputLabel>
                  <CustomSelect
                    labelId="place"
                    id="place"
                    name="place"
                    value={formData.place}
                    label="Пункт сдачи"
                    onChange={handleInputChange}
                    options={placeSelectData}
                    sx={{
                      borderRadius: "25px",
                    }}
                  />
              </FormControl>
            </Card>
            <Card title="Карточка клиента" className={cl.Tab2__Inputs}>
              <div className={cl.Tab2__Items_Container}>
                <TextField
                  name="surname"
                  label="Фамилия*"
                  variant="outlined"
                  value={formData.surname}
                  onChange={handleInputChange}
                  inputProps={{
                    pattern: initialsRegexString, 
                    title: "Прізвище повинне містити лише букви",
                    onInput: (e: any) => {
                      e.preventDefault();
                      const inputValue = e.target.value;
                      const sanitizedInput = inputValue.replace(initialsRegex, "");
                      e.target.value = sanitizedInput;
                      handleInputChange({ target: { name: "surname", value: sanitizedInput } });
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                    },
                  }}

                />
                <TextField
                  name="name"
                  label="Имя*"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleInputChange}
                  inputProps={{
                    pattern: initialsRegexString,
                    title: 'Имя должно содержать только буквы',
                    onInput: (e: any) => {
                      e.preventDefault();
                      const inputValue = e.target.value;
                      const sanitizedInput = inputValue.replace(initialsRegex, "");
                      e.target.value = sanitizedInput;
                      handleInputChange({ target: { name: "name", value: sanitizedInput } });
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                    },
                  }}
                />
                <TextField
                  name="patronymic"
                  label="Отчество"
                  variant="outlined"
                  value={formData.patronymic}
                  onChange={handleInputChange}
                  inputProps={{
                    pattern: initialsRegexString,
                    title: 'Отчество должно содержать только буквы',
                    onInput: (e: any) => {
                      e.preventDefault();
                      const inputValue = e.target.value;
                      const sanitizedInput = inputValue.replace(initialsRegex, "");
                      e.target.value = sanitizedInput;
                      handleInputChange({ target: { name: "patronymic", value: sanitizedInput } });
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                    },
                  }}
                />

              </div>
              <div className={cl.Tab2__Items_Grid}>
                <FormControl>
                  <InputLabel id="gender">Пол</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    label="Пол"
                    onChange={handleInputChange}
                    sx={{
                      borderRadius: "25px",
                    }}
                  >
                    <MenuItem value={"Мужской"}>
                      <MaleIcon /> Мужской
                    </MenuItem>
                    <MenuItem value={"Женский"}>
                      <FemaleIcon /> Женский
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={String(uk)}
                    localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
                  >
                    <DatePicker
                      label="Дата рождения*"
                      value={formData.birthdayDate}
                      onChange={handleDatePickerChange}
                      format={DATE_FORMAT}
                      maxDate={dayjs(new Date())}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl>
                  <InputMask
                    mask="+38 (099) 999-99-99"
                    value={formData.phone}
                    onChange={handleInputChange}
                  >
                    {(inputProps: any) => (
                      <TextField
                        name="phone"
                        label="Телефон*"
                        variant="outlined"
                        InputProps={{
                          ...inputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: "20px",
                          },
                        }}
                      />
                    )}
                  </InputMask>
                </FormControl>
                <FormControl>
                <TextField
                  name="email"
                  label="Email*"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleEmailChange}
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                  {emailError && (
                    <div style={{ color: "red" }}>{emailError}</div>
                  )}
                </FormControl>
              </div>
              <div className={cl.Tab2__Checkboxes}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="preparationRules"
                        checked={formData.preparationRules}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="С правилами подготовки к исследованию ознакомлен. Несоблюдение правил подготовки может влиять на корректность результата"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="personalDataProcessing"
                        checked={formData.personalDataProcessing}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Я даю согласие на обработку персональных данных"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="serviceAgreement"
                        checked={formData.serviceAgreement}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Я согласен с условиями Публичного договора о возмездном оказании медицинских услуг"
                  />
                </FormGroup>
              </div>
            </Card>
          </div>
        </div>
        <div className={cl.Tab2__Items}>
          <Card title="Оплата">
            <div className={cl.Tab2__Checkboxes}>
              <FormControl>
                <RadioGroup
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="На сайте"
                    control={<Radio />}
                    label="Оплатить на сайте"
                  />
                  <FormControlLabel
                    value="ЕРИП"
                    control={<Radio />}
                    label="Оплатить в ЕРИП"
                  />
                  <FormControlLabel
                    value="На місці"
                    control={<Radio />}
                    label="Оплатить в пункте"
                  />
                </RadioGroup>
              </FormControl>
              <div className={cl.Tab2__Descriptions}>
                <p className={cl.Tab2__Description}>
                  ✓ Карты рассрочки для оплаты Заказов онлайн на сайте или в пунктах не принимаются;
                </p>
                <p className={cl.Tab2__Description}>
                  ✓ Скидка 5% не распространяется на услуги взятия и аутсорсинговые услуги, не суммируется с другими акционными и/или скидочными предложениями;
                </p>
                <p className={cl.Tab2__Description}>
                  ✓ Нажимая кнопку любого из способов оплаты, Вы подтверждаете правильность выбранных услуг;
                </p>
                <p className={cl.Tab2__Description}>
                  ✓ Оплата Заказов онлайн в пункте осуществляется по ценам, действующим на день оплаты.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {formErrors && (
        <div style={{ color: "red", margin: "20px 0" }}>{formErrors}</div>
      )}
      <div className={cl.Tab2__ButtonContainer}>
        <Button
          disabled={!isFormValid}
          active={isFormValid}
          className={cl.Tab2__Button}
          onClick={onFormSubmit}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
export default OrderPlacing;