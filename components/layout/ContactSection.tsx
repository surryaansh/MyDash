import React from 'react';
import { ContactLeftPanel } from './ContactLeftPanel.tsx';
import { ContactRightPanel } from './ContactRightPanel.tsx';

interface ContactSectionProps {
  isDarkMode: boolean;
  cursorPosition: { x: number; y: number };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode, cursorPosition }) => {
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const divideClasses = isDarkMode ? 'divide-[#efeeee]' : 'divide-black';

  return (
    <section id="contact" className={`flex flex-col lg:flex-row flex-1 border-t min-h-[60vh] divide-y lg:divide-y-0 lg:divide-x ${borderClasses} ${divideClasses}`}>
      <ContactLeftPanel 
        isDarkMode={isDarkMode} 
        cursorPosition={cursorPosition}
      />
      <ContactRightPanel 
        isDarkMode={isDarkMode} 
      />
    </section>
  );
};