import { MenuItem } from '@mui/material';
import Select from '@mui/material/Select';


export const CustomSelect = ({ onChange, options, ...props }: any) => {
    return (
        <Select {...props} onChange={onChange}>
            {options.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    )
}


export default CustomSelect;