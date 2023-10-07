import React, { useState } from "react";
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
import Card from "../../Card/Card";
import Button from "../../UI/Button/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import InputMask from "react-input-mask";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";


import {
  Phone,
  Email,
  CalendarToday,
  AccountCircle,
} from "@mui/icons-material";
import cl from "./Tab2.module.scss";
import { useNavigate } from "react-router-dom";

interface IFormData {
  place: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  sex: "male" | "female";
  birthdayDate: string | null;
  email: string;
  paymentMethod: "inSite" | "erip" | "inPlace";
}

export const Tab2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    place: "",
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
    sex: "male",
    birthdayDate: null,
    email: "",
    paymentMethod: "inSite",
  });

  const [emailError, setEmailError] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<{ name: string; value: any }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    localStorage.setItem(name, value);

    if (name === "email" && emailError) {
      setEmailError("");
    }
  };

  const handleDatePickerChange = (dateObj: any) => {
    const day = dateObj.date();
    const month = dateObj.month() + 1;
    const year = dateObj.year() % 100;

    const formattedDate = `${day}/${month.toString().padStart(2, "0")}/${year}`;
    localStorage.setItem("birthdayDate", formattedDate);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
    localStorage.setItem("paymentMethod", value);
  };

  const handleEmailBlur = () => {
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError(""); // Clear the error message if email is valid
    }
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
                    fullWidth
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Дата рождения*"
                      id="birthdayDate"
                      name="birthdayDate"
                      value={formData.birthdayDate}
                      onChange={handleDatePickerChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: "25px",
                        },
                      }}
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
                    control={<Checkbox />}
                    label="С правилами подготовки к исследованию ознакомлен. Несоблюдение правил подготовки может влиять на корректность результата"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Я даю согласие на обработку персональных данных"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
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
                    value="inPlace"
                    control={<Radio />}
                    label="Оплатить в пункте"
                  />
                </RadioGroup>
              </FormControl>
              <div className={cl.Tab2__Descriptions}>
                <p className={cl.Tab2__Description}>
                  ✓ Карты рассрочки для оплаты Заказов онлайн на сайте или в
                  пунктах не принимаются;
                </p>
                <p className={cl.Tab2__Description}>
                  ✓ Скидка 5% не распространяется на услуги взятия и
                  аутсорсинговые услуги, не суммируется с другими акционными
                  и/или скидочными предложениями;
                </p>
                <p className={cl.Tab2__Description}>
                  ✓ Нажимая кнопку любого из способов оплаты, Вы подтверждаете
                  правильность выбранных услуг;
                </p>
                <p className={cl.Tab2__Description}>
                  ✓ Оплата Заказов онлайн в пункте осуществляется по ценам,
                  действующим на день оплаты.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={cl.Tab2__ButtonContainer}>
        <Button
          active
          className={cl.Tab2__Button}
          onClick={() => navigate("../tab3")}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

export default Tab2;
