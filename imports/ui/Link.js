import React from 'react';
import { Links } from '../api/links.js';
import LinksList from './LinksList.js';
import PrivateHeader from './PrivateHeader.js';
import AddLink from './AddLink.js';
import LinksListFilters from './LinksListFilters.js';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};
