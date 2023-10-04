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

  const handleBreadcrumbClick = (panel: string) => {
    setActivePanel(panel);
    // Оновлюємо хлібні крихти при розгортанні розділу акордеона
    if (panel !== '') {
      setBreadcrumbLinks([...breadcrumbLinks, panel]);
    } else {
      // При закритті акордеону очищаємо хлібні крихти
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
          {/* Передаємо breadcrumbLinks та функцію onBreadcrumbClick в компонент BreadCrumbs */}
          <BreadCrumbs
            breadcrumbLinks={breadcrumbLinks}
            onBreadcrumbClick={(index: number) => handleBreadcrumbClick(breadcrumbLinks[index])}
          />
          <AnalysesForm />
          <AnalysesTable />
        </div>
      </div>
    </div>
  );
};

export default Analyses;
