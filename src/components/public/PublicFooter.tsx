import React from 'react';
import { LegalData } from '../../data/mock';
import { Footer } from '../Footer';

interface PublicFooterProps {
  data: LegalData;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ data }) => {
  return <Footer data={data} />;
};

export default PublicFooter;
