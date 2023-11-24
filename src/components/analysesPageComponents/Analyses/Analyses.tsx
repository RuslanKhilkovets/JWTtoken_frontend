import * as React from 'react';


import Button from '../../UI/Button/Button';
import AnalysesSidebar from '../AnalysesSidebar/AnalysesSidebar';
import AnalysesForm from '../AnalysesForm/AnalysesForm';
import BreadCrumbs from '../BreadCrumps/BreadCrumps'; 
import AnalysesTable from '../AnalysesTable/AnalysesTable';

import cl from "./Analyses.module.scss";
import { useTranslation } from 'react-i18next';



export const Analyses: React.FC = () => {
  const { t } = useTranslation()


  const [breadcrumbLink, setBreadcrumbLink] = React.useState<string>("");
  const [breadcrumbSubLink, setBreadcrumbSubLink] = React.useState<string>("");
  const [searchParam, setSearchParam] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("doctorData");
  const [activeSidebar, setActiveSidebar] = React.useState(window.innerWidth >= 768);

  const changeActiveSidebar = () => {
    setActiveSidebar(!activeSidebar);
  }

  const handleTabsChange = (tabName: string): void => {
    setActiveTab(tabName);
  }

  return (
    <div className={cl.Analyses}>
      <div className={cl.Analyses__Container}>
        {activeSidebar ? (
          <div className={cl.Analyses__Content}>
            <div className={cl.Analyses__Sidebar + ' ' + cl.Sidebar}>
              <AnalysesSidebar
                changeActiveSidebar={changeActiveSidebar}
                setBreadcrumbLink={setBreadcrumbLink}
                setBreadcrumbSubLink={setBreadcrumbSubLink}
              />
            </div>
          </div>
        ) : null}

        <div className={cl.Analyses__Item + ' ' + cl.Content}>
          <div className={cl.Content__Buttons}>
            <Button
              active={activeTab === "doctorData"}
              onClick={() => handleTabsChange("doctorData")}
            >
              {t('forDoctorsTitle')}
            </Button>
            <Button
              active={activeTab === "clientData"}
              onClick={() => handleTabsChange("clientData")}
            >
              {t('forClientsTitle')}
            </Button>
          </div>
          <BreadCrumbs
            changeActiveSidebar={changeActiveSidebar}
            breadcrumbLink={breadcrumbLink}
            breadcrumbSubLink={breadcrumbSubLink}
          />
          <AnalysesForm setSearchParam={setSearchParam} />
          {activeTab === "doctorData" && (
            <AnalysesTable
              searchParam={searchParam}
              tabData={activeTab}
            />
          )}
          {activeTab === "clientData" && (
            <AnalysesTable
              searchParam={searchParam}
              tabData={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyses;