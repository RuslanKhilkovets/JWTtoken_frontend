import * as React from 'react';


import MailOutlineIcon from "@mui/icons-material/MailOutline"; 
import PhoneIcon from "@mui/icons-material/Phone";
import DateRangeIcon from "@mui/icons-material/DateRange"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 
import PaymentIcon from "@mui/icons-material/Payment"; 
import RoomIcon from "@mui/icons-material/Room"; 


import cl from "./InfoAnalyses.module.scss";



export const InfoAnalyses = ({ title, text, icon }: any) => {
  const getIcon = () => {
    switch (icon) {
      case "email":
        return <MailOutlineIcon />;
      case "phone":
        return <PhoneIcon />;
      case "birthday":
        return <DateRangeIcon />;
      case "fio":
        return <AccountCircleIcon />;
      case "payment":
        return <PaymentIcon />;
      case "place":
        return <RoomIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={cl.InfoAnalyses}>
      <div className={cl.InfoAnalyses__Icon}>{getIcon()}</div>
      <div className={cl.InfoAnalyses__Content}>
        <p className={cl.InfoAnalyses__Title}>{title}</p>
        <p className={cl.InfoAnalyses__Text}>{text}</p>
      </div>
    </div>
  );
};

export default InfoAnalyses;
