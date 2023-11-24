import * as React from 'react';

import { useTranslation } from 'react-i18next';


import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Accordion from '../../UI/Accordion/Accordion';
import AccordionSummary from '../../UI/AccordionSummary/AccordionSummary';
import AccordionDetails from '../../UI/AccordionDetails/AccordionDetails';
import IAnalysesSidebarProps from '../../../types/IAnalysesSidebarProps';

import { setItemInStorage } from '../../../utils/localStorageItems';
import {accordionData} from '../../../globals/accordionData';

import cl from './AnalysesSidebar.module.scss';



const AnalysesSidebar: React.FC<IAnalysesSidebarProps> = ({
  setBreadcrumbLink,
  setBreadcrumbSubLink,
  changeActiveSidebar,
}) => {
  const { t } = useTranslation();

  const [expandedPanels, setExpandedPanels] = React.useState<{ [key: string]: boolean }>({});

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedPanels((prevExpandedPanels) => ({
      ...prevExpandedPanels,
      [panel]: newExpanded && !prevExpandedPanels[panel],
    }));
    if (newExpanded) {
      setItemInStorage('subItemTitle', '');
      setItemInStorage('itemTitle', panel);
      setBreadcrumbLink(panel);
      setBreadcrumbSubLink('');
    }
  };

  const handleSubLinkClick = (subItemTitle: string) => {
    setItemInStorage('subItemTitle', subItemTitle);
    setBreadcrumbSubLink(subItemTitle);
  };

  return (
    <div className={cl.AnalysesSidebar}>
      {accordionData.map((accordion: any) => (
        <div key={accordion.itemId}>
          <Accordion
            className={cl.AnalysesSidebar__Accordion}
            expanded={expandedPanels[accordion.title]}
            onChange={handleAccordionChange(t(`accordion.${accordion.title}`))}
          >   
            <AccordionSummary>
              <Typography color={'rgba(0, 83, 159, 1)'}>
                {t(`accordion.${accordion.title}`)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={cl.Accordion__List}>
                {accordion.subItems.map((subItem: any) => (
                  <li key={subItem.title} className={cl.Accordion__Item}>
                    <Link
                      href="#"
                      className={cl.Accordion__Link}
                      onClick={() => handleSubLinkClick(t(`accordion.${subItem.title}`))}
                    >
                      {t(`accordion.${subItem.title}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      <button className={cl.AnalysesSidebar__CloseButton} onClick={() => changeActiveSidebar()}></button>
    </div>
  );
};

export default AnalysesSidebar;
