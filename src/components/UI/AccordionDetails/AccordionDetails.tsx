import { styled } from "@mui/material";


import MuiAccordionDetails from '@mui/material/AccordionDetails';


export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }: any) => ({
    paddingLeft: theme.spacing(5),
}));

export default AccordionDetails;  