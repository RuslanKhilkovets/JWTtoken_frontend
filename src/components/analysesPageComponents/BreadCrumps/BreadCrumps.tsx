import React, { useEffect, useState } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import IBreadCrumbsProps from '../../../types/IBreadCrumbsProps';
import { getItemFromStorage } from '../../../utils/localStorageItems';
import cl from "./BreadCrumbs.module.scss";





const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({
  changeActiveSidebar,
  breadcrumbLink,
  breadcrumbSubLink,
}) => {
  
  const [breadcrumbLinkFromStorage, setBreadcrumbLinkFromStorage] = useState<string | null>(null);
  const [breadcrumbSubLinkFromStorage, setBreadcrumbSubLinkFromStorage] = useState<string | null>(null);

  useEffect(() => {
    const storedBreadcrumbLink = getItemFromStorage("itemTitle");
    const storedBreadcrumbSubLink = getItemFromStorage("subItemTitle");

    setBreadcrumbLinkFromStorage(storedBreadcrumbLink || breadcrumbLink);
    setBreadcrumbSubLinkFromStorage(storedBreadcrumbSubLink || breadcrumbSubLink);
  }, [breadcrumbLink, breadcrumbSubLink]);

  const arrayFromLinks = [breadcrumbLinkFromStorage, breadcrumbSubLinkFromStorage];
  
  return (
    <div className={cl.BreadCrumbs}>
      <button className={cl.BreadCrumbs__Button} onClick={() => changeActiveSidebar()}></button>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
            underline="hover"
            color={"inherit"}
          >
            Всі аналізи
        </Link>
        { arrayFromLinks.length !== 1 && arrayFromLinks.map((link, index) => (
          <Link
            key={index}
            underline="hover"
            color={"inherit"}
          >
            {link}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
