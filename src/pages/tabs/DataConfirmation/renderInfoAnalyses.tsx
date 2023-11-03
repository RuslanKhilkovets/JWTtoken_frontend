import Card from "../../../components/Card/Card";
import InfoAnalyses from "../../../components/UI/InfoAnalyses/InfoAnalyses";
import IFormData from "../../../types/IFormData";

export const renderInfoAnalyses = (data: IFormData) => {
    const { place, paymentMethod, surname, name, patronymic, birthdayDate, phone, email } = data;
  
    const infoItems = [
      { icon: "place", text: place, title: "Пункт сдачи" },
      { icon: "payment", text: paymentMethod, title: "Тип оплати" },
      { icon: "fio", text: `${surname} ${name} ${patronymic}`, title: "ФИО" },
      { icon: "birthday", text: birthdayDate, title: "Дата рождения" },
      { icon: "phone", text: phone, title: "Телефон" },
      { icon: "email", text: email, title: "Email" },
    ];
  
    return (
      <Card title="Информация">
          {infoItems.map((item, index) => (
              <InfoAnalyses key={index} icon={item.icon} text={item.text} title={item.title} />
          ))}
      </Card>
    );
  };
  
export default renderInfoAnalyses;