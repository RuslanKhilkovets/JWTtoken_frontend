import { Typography } from "@mui/material";

import cl from "./Loader.module.scss"
import { useTranslation } from "react-i18next";


const Loader = () => {
    const { t } = useTranslation();

    return(
        <div className={cl.Container}>
            <div className={cl.Loader__Content}>
                <div className={cl.Loader}></div>
                <Typography variant="h5" color="primary" gutterBottom>
                    {t("loaderText")}
                </Typography>
            </div>
        </div>
    )
    
}
export default Loader;