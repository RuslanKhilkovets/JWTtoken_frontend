import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

import { styled } from '@mui/material/styles';

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
}));

export default Accordion;