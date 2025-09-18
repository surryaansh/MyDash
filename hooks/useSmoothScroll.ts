import React from 'react';

/**
 * Provides a handler for smooth scrolling to anchor links with a custom offset.
 * This positions the scrolled-to section more centrally in the viewport.
 */
export const useSmoothScroll = () => {
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);

    if (!targetId) return;

    // The 'about' link should always scroll to the very top of the page.
    if (targetId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      
      // Calculate an offset to position the section a bit down from the top,
      // making it feel more centered. 20% of the viewport height is a good value.
      const offset = window.innerHeight * 0.20; 

      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return { handleScroll };
};
