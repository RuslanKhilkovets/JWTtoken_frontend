import * as React from 'react';
import cl from "./Analyses.module.scss";
import Button from '../UI/Button/Button';
import AnalysesForm from '../AnalysesForm/AnalysesForm';
import BreadCrumbs from '../BreadCrumps/BreadCrumps'; // Оновлений імпорт

import AnalysesTable from '../AnalysesTable/AnalysesTable';
import { AnalysesSidebar } from '../AnalysesSidebar/AnalysesSidebar';

export const Analyses: React.FC = () => {
  const [activePanel, setActivePanel] = React.useState<string | false>('');
  const [breadcrumbLinks, setBreadcrumbLinks] = React.useState<string[]>([]);
  const [searchParam, setSearchParam] = React.useState("");



  const handleBreadcrumbClick = (panel: string) => {
    setActivePanel(panel);
    if (panel !== '') {
      setBreadcrumbLinks([...breadcrumbLinks, panel]);
    } else {
      setBreadcrumbLinks([]);
    }
  };

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
            <Button active>Для лікарів</Button>
            <Button>Для клієнтів</Button>
          </div>
          <BreadCrumbs
            breadcrumbLinks={breadcrumbLinks}
            onBreadcrumbClick={(index: number) => handleBreadcrumbClick(breadcrumbLinks[index])}
          />
          <AnalysesForm setSearchParam={setSearchParam}/>
          <AnalysesTable searchParam={searchParam}/>
        </div>
      </div>
    </div>
  );
};

export default Analyses;
