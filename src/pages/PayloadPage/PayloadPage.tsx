import Button from "../../components/UI/Button/Button";
import { useTranslation } from "react-i18next";  // Import the useTranslation hook

import cl from "./PayloadPage.module.scss"

export const PayloadPage = () => {
    const { t } = useTranslation();  // Initialize the useTranslation hook

    localStorage.removeItem("formData");
    
    return (
        <div className={cl.PayloadPage}>
            <div className={cl.PayloadPage__Container}>
                <div className={cl.PayloadPage__Image}></div>
                <div className={cl.PayloadPage__Content}>
                    <p className={cl.PayloadPage__Title}>
                        {t("payloadPage.successMessage")}
                    </p>
                    <Button active>
                        {t("payloadPage.payInERIP")}
                    </Button>
                    <p className={cl.PayloadPage__Subtitle}>
                        {t("payloadPage.orderNumber")} 8100016925.
                        {t("payloadPage.validUntil")} 05.07.2020
                    </p>
                    <p className={cl.PayloadPage__Subtitle}>
                        {t("payloadPage.smsMessage")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PayloadPage;
