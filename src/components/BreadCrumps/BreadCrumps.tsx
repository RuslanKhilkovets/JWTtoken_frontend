import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import cl from "./BreadCrumbs.module.scss";




export interface IBreadCrumbsProps {
  breadcrumbLinks: string[];
  onBreadcrumbClick: (index: number) => void;
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({
  breadcrumbLinks,
  onBreadcrumbClick,
}) => {
  return (
    <div className={cl.BreadCrumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbLinks.map((link, index) => (
          <Link
            key={index}
            underline="hover"
            color={index === breadcrumbLinks.length - 1 ? "textPrimary" : "inherit"}
            onClick={() => onBreadcrumbClick(index)}
          >
            {link}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
