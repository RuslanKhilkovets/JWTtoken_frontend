import * as React from 'react';


import Button from '../UI/Button/Button';
import AnalysesSidebar from '../AnalysesSidebar/AnalysesSidebar';
import AnalysesForm from '../AnalysesForm/AnalysesForm';
import BreadCrumbs from '../BreadCrumps/BreadCrumps'; 
import AnalysesTable from '../AnalysesTable/AnalysesTable';

import cl from "./Analyses.module.scss";



export const Analyses: React.FC = () => {
  const [activePanel, setActivePanel] = React.useState<string | false>('');
  const [breadcrumbLinks, setBreadcrumbLinks] = React.useState<string[]>([]);
  const [searchParam, setSearchParam] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("doctorData");

  const handleBreadcrumbClick = (panel: string) => {
    setActivePanel(panel);
    if (panel !== '') {
      setBreadcrumbLinks([...breadcrumbLinks, panel]);
    } else {
      setBreadcrumbLinks([]);
    }
  };

  const handleTabsChange = (tabName: string): void => {
    setActiveTab(tabName);
  }

  return (
      <div className={cl.Analyses}>
          <div className={cl.Analyses__Container}>
              <div className={cl.Analyses__Content}>
                  <div className={cl.Analyses__Sidebar + ' ' + cl.Sidebar}>
                      <AnalysesSidebar
                        onBreadcrumbClick={handleBreadcrumbClick}
                        breadcrumbLinks={breadcrumbLinks}
                        activePanel={activePanel}
                      />
                  </div>
              </div>
              <div className={cl.Analyses__Item + ' ' + cl.Content}>
                  <div className={cl.Content__Buttons}>
                      <Button
                        active={activeTab === "doctorData"}
                        onClick={() => handleTabsChange("doctorData")}
                      >
                        Для лікарів
                      </Button>
                      <Button
                        active={activeTab === "clientData"}
                        onClick={() => handleTabsChange("clientData")}
                      >
                        Для клієнтів
                      </Button>
                  </div>
                  <BreadCrumbs
                    breadcrumbLinks={breadcrumbLinks}
                    onBreadcrumbClick={(index: number) => handleBreadcrumbClick(breadcrumbLinks[index])}
                  />
                  <AnalysesForm setSearchParam={setSearchParam}/>
                  <AnalysesTable searchParam={searchParam} tabData={activeTab} />
              </div>
          </div>
      </div>
  );
};

export default Analyses;
