import { styled } from "@mui/material";
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';


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
  
export default AccordionSummary;