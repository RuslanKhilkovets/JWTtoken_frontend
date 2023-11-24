import React from 'react';


import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';


import IGetFormData from '../../../types/IGetFormData';

import CustomSelect from '../../UI/Select/Select';
import { citiesSelectData, genderSelectData } from '../../../globals/selectData';

import cl from "./AnalysesForm.module.scss";
import { useTranslation } from 'react-i18next';




export const AnalysesForm = ({setSearchParam}: any) => {
    const { t } = useTranslation();

    const [formData, setFormData] = React.useState<IGetFormData>({
        city: "",
        gender: "",
        searchParam: ""
    });
    
    const handleInputChange = (
        e: React.ChangeEvent<{ name: string; value: unknown }> | React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if(name === "searchParam"){
            setTimeout(() => setSearchParam(value), 100)
        }
    };
    
  return (
    <form className={cl.AnalysesForm}>
        <div className={cl.AnalysesForm__Container}>
            <div className={cl.AnalysesForm__Group}>
                <FormControl sx={{width: "100%"}}>
                    <InputLabel id="city">{t("cityTitle")}</InputLabel>
                    <CustomSelect
                        labelId="city"
                        id="city"
                        name='city'
                        value={formData.city}
                        label="Місто"
                        onChange={handleInputChange}
                        options={citiesSelectData.map(city => ({ value: city.value, name: t(city.name) }))}
                        sx={{
                            borderRadius: '25px', 
                        }}
                        
                    />
                    
                </FormControl>
                <FormControl sx={{width: "100%"}}>
                    <InputLabel id="gender">{t("genderTitle")}</InputLabel>
                    <Select
                        labelId="gender"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        label="Стать"
                        options={genderSelectData}
                        onChange={handleInputChange}
                        sx={{
                            borderRadius: '25px',
                        }}
                    >
                        <MenuItem value={"Чоловіча"}>{t("genderMan")}</MenuItem>
                        <MenuItem value={"Жіноча"}>{t("genderWomen")}</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                name='searchParam'
                label={t("formRequestInputTitle")}
                variant="outlined"
                value={formData.searchParam}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: '20px',
                    },
                }}
            />
        </div>
    </form>
  );
}

export default AnalysesForm;