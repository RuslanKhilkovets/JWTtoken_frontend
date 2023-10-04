import { Typography } from "@mui/material";
import cl from "./Loader.module.scss"

const Loader = () => (
    <div className={cl.Container}>
        <div className={cl.Loader__Content}>
            <div className={cl.Loader}></div>
            <Typography variant="h5" color="primary" gutterBottom>
                Триває завантаження...
            </Typography>
        </div>
        
    </div>
)

export default Loader;