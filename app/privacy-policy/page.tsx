
import dynamic from 'next/dynamic';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';


const Headerhome = dynamic(() => import('@/components/header-home'), {
  ssr: false, // Set to false if the component relies on browser-only APIs (like localStorage)
});
const Page = () => {
  // Read markdown file from the 'constants' folder
  const markdownPath = path.join(process.cwd(), 'components','constants', 'privacy_policy.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

  return (
    <div>
      {/* <Headerhome /> */}
      <div className="prose text-muted-foreground w-screen mx-auto p-12 bg-pink-50 dark:bg-pink-900/20">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Page;
