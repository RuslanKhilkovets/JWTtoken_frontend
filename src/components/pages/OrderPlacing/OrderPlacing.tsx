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
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import uk from 'dayjs/locale/uk';

import { ukUA } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


import { getItemFromStorage, setItemInStorage } from "../../../utils/localStorageItems";

import Card from "../../Card/Card";
import Button from "../../UI/Button/Button";

import cl from "./OrderPlacing.module.scss";





dayjs.extend(customParseFormat);
dayjs.locale('uk');

const DATE_FORMAT = "DD.MM.YYYY";

interface IFormData {
  place: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  sex: "Мужской" | "Женский" | "";
  birthdayDate: Dayjs | string | null;
  email: string;
  paymentMethod: "На сайті" | "В ЕРІП" | "На місці" | "";
}

export const Tab2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    place: "",
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
    sex: "",
    birthdayDate: null,
    email: "",
    paymentMethod: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<string>("");
  const [checkedCheckboxes, setCheckedCheckboxes] = useState({
    preparationRules: false,
    personalDataProcessing: false,
    serviceAgreement: false,
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<{ name: string; value: any }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDatePickerChange = (date: any) => {
    const formattedDate = dayjs(date);
    setFormData((prevData) => ({
      ...prevData,
      birthdayDate: formattedDate,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  const handleEmailBlur = () => {
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validateForm = () => {
    if (
      !formData.surname ||
      !formData.name ||
      !formData.birthdayDate ||
      !formData.phone ||
      !formData.email ||
      !formData.place ||
      !formData.paymentMethod ||
      !checkedCheckboxes.preparationRules ||
      !checkedCheckboxes.personalDataProcessing ||
      !checkedCheckboxes.serviceAgreement
    ) {
      setFormErrors("Заповніть всі поля та відзначте всі обов'язкові чекбокси для переходу на наступну сторінку");
      return false;
    }
    return true;
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedCheckboxes((prevChecked) => ({
      ...prevChecked,
      [name]: checked,
    }));
  };

  return (
    <div className={cl.Tab2}>
      <div className={cl.Tab2__Container}>
        <div className={cl.Tab2__Items}>
          <div className={cl.Tab2__Card}>
            <Card title="Информация о сдаче анализов">
              <FormControl sx={{ width: "100%", margin: "20px 0" }}>
                <InputLabel id="place">Пункт сдачи</InputLabel>
                <Select
                  labelId="place"
                  id="place"
                  name="place"
                  value={formData.place}
                  label="Пункт сдачи"
                  onChange={handleInputChange}
                  sx={{
                    borderRadius: "25px",
                  }}
                >
                  <MenuItem value={"Пункт 1"}>Пункт 1</MenuItem>
                  <MenuItem value={"Пункт 2"}>Пункт 2</MenuItem>
                </Select>
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
                    pattern: "^[A-Za-z]+$",
                    title: "Прізвище повинне містити лише букви",
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
                  InputProps={{
                    sx: {
                      borderRadius: "20px",
                    },
                  }}
                />
              </div>
              <div className={cl.Tab2__Items_Grid}>
                <FormControl>
                  <InputLabel id="sex">Пол</InputLabel>
                  <Select
                    labelId="sex"
                    id="sex"
                    name="sex"
                    value={formData.sex}
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
                    adapterLocale={uk}
                    localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
                  >
                    <DatePicker
                      label="Дата рождения*"
                      value={formData.birthdayDate}
                      onChange={handleDatePickerChange}
                      format={DATE_FORMAT}
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
                    onChange={handleInputChange}
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
                    onBlur={handleEmailBlur}
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
                        checked={checkedCheckboxes.preparationRules}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="С правилами подготовки к исследованию ознакомлен. Несоблюдение правил подготовки может влиять на корректность результата"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="personalDataProcessing"
                        checked={checkedCheckboxes.personalDataProcessing}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Я даю согласие на обработку персональных данных"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="serviceAgreement"
                        checked={checkedCheckboxes.serviceAgreement}
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
                  onChange={handleRadioChange}
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
          disabled={false}
          active={true}
          className={cl.Tab2__Button}
          onClick={onFormSubmit}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
export default Tab2;