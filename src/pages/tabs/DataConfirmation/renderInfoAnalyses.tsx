import dayjs from "dayjs";
import Card from "../../../components/Card/Card";
import InfoAnalyses from "../../../components/UI/InfoAnalyses/InfoAnalyses";
import { DATE_FORMAT } from "../../../globals/dateFormat";
import IFormData from "../../../types/IFormData";
import { useTranslation } from "react-i18next";

export const renderInfoAnalyses = (data: IFormData) => {

    const { t } = useTranslation();

    let { place, paymentMethod, surname, name, patronymic, birthdayDate, phone, email } = data;
    birthdayDate = dayjs(birthdayDate).format(DATE_FORMAT)

    
    const infoItems = [
      { icon: "place", text: place, title: t("infoAnalyses.place") },
      { icon: "payment", text: paymentMethod, title: t("infoAnalyses.paymentMethod") },
      { icon: "fio", text: `${surname} ${name} ${patronymic}`, title: t("infoAnalyses.fullName") },
      { icon: "birthday", text: birthdayDate, title: t("infoAnalyses.birthday") },
      { icon: "phone", text: phone, title: t("infoAnalyses.phone") },
      { icon: "email", text: email, title: t("infoAnalyses.email") },
      
    ];
  
    return (
      <Card title={t("dataConfirmation.information")}>
          {infoItems.map((item, index) => (
              <InfoAnalyses key={index} icon={item.icon} text={item.text} title={item.title} />
          ))}
      </Card>
    );
  };
  
export default renderInfoAnalyses;