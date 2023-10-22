import * as React from 'react';


import { styled } from '@mui/material/styles';


import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


import cl from "./AnalysesSidebar.module.scss";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: theme.spacing(5),
}));

interface AnalysesSidebarProps {
  onBreadcrumbClick: (panel: string) => void;
  breadcrumbLinks: string[];
  activePanel: string | false;
}

export const AnalysesSidebar: React.FC<AnalysesSidebarProps> = ({
  onBreadcrumbClick,
  breadcrumbLinks,
  activePanel,
}) => {
  const [expandedPanels, setExpandedPanels] = React.useState<{ [key: string]: boolean }>({});

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpandedPanels((prevExpandedPanels) => ({
      ...prevExpandedPanels,
      [panel]: newExpanded && !prevExpandedPanels[panel], // Розгорнути лише, якщо акордеон був закритий
    }));
    if (newExpanded) {
      onBreadcrumbClick(panel);
    }
  };
  
  return (
    <div>
      <Accordion expanded={expandedPanels['ЗАГАЛЬНІ АНАЛІЗИ']} onChange={handleChange('ЗАГАЛЬНІ АНАЛІЗИ')}>
        <AccordionSummary>
          <Typography color={"rgba(0, 83, 159, 1)"}>
            ЗАГАЛЬНІ АНАЛІЗИ
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className={cl.Accordion__List}>
            <li className={cl.Accordion__Item}>
              <Link
                href="#"
                className={cl.Accordion__Link}
                onClick={() => onBreadcrumbClick('Аналізи крові')}
              >
                Аналізи крові
              </Link>
            </li>
            <li className={cl.Accordion__Item}>
              <Link
                href="#"
                className={cl.Accordion__Link}
                onClick={() => onBreadcrumbClick('Аналізи крові из вены')}
              >
                Аналізи крові из вены
              </Link>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedPanels['ЗАГАЛЬНІ']} onChange={handleChange('ЗАГАЛЬНІ')}>
        <AccordionSummary>
          <Typography color={"rgba(0, 83, 159, 1)"}>
            ЗАГАЛЬНІ 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className={cl.Accordion__List}>
            <li className={cl.Accordion__Item}>
              <Link
                href="#"
                className={cl.Accordion__Link}
                onClick={() => onBreadcrumbClick('Аналізи крові')}
              >
                Аналізи крові
              </Link>
            </li>
            <li className={cl.Accordion__Item}>
              <Link
                href="#"
                className={cl.Accordion__Link}
                onClick={() => onBreadcrumbClick('Аналізи крові из вены')}
              >
                Аналізи крові из вены
              </Link>
            </li>
            {/* Додайте інші пункти */} 
          </ul>
        </AccordionDetails>
      </Accordion>
      {/* Додайте інші розділи акордеона */}
    </div>
  );
};

export default AnalysesSidebar;
