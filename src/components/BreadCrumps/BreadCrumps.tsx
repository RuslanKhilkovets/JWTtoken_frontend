import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import cl from "./BreadCrumbs.module.scss";

export interface BreadCrumbsProps {
  breadcrumbLinks: string[];
  onBreadcrumbClick: (index: number) => void;
}

export const BreadCrumps: React.FC<BreadCrumbsProps> = ({
  breadcrumbLinks,
  onBreadcrumbClick,
}) => {
  function handleDivClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb (div).');
  }

  return (
    <div role="presentation" onClick={(e) => handleDivClick(e)}>
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

export default BreadCrumps;
