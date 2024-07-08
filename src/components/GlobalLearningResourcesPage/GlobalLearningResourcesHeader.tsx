import React from 'react';
import './GlobalLearningResourcesHeader.scss';
import ResourcesIcon from './resourcesIcon';

export const GlobalLearningResourcesHeader = () => {
  return (
    <>
      <header className='lr-c-global-learning-resources-page__header'>
        <div className='lr-c-global-learning-resources-page__icon'><ResourcesIcon /></div>
        <div className='lr-c-global-learning-resources-page__separator'></div>
        <div>
          <h2 className='lr-c-global-learning-resources-page__title'>All Learning Resources</h2>
          <p className='lr-c-global-learning-resources-page__text'>See learning resources for services and features across the Hybrid Cloud Console. Find additional resources on <a href="https://developers.redhat.com/">Developers.RedHat.com</a>, the <a href="https://cloud.redhat.com/">Cloud.RedHat.com</a>, and on <a href="https://www.redhat.com/">RedHat.com</a>.</p>
        </div>
      </header>
    </>
  );
};

export default GlobalLearningResourcesHeader;
