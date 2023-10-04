import * as React from 'react';
import Loader from '../../Loader/Loader';
import Tabs from '../../Tabs/Tabs';
import Analyses from '../../Analyses/Analyses';
import LoaderContext from '../../../context/LoaderContext/LoaderContext';



export const Tab1 = () => {

    const {isLoading} = React.useContext(LoaderContext)
    
    return(
        <>

            {
                isLoading
                ?
                <Loader/>
                :
                <>
                    <Analyses/>
                </>
            }
        </>
    )
}

export default Tab1;