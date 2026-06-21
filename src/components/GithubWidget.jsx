import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import BaseWidget from './BaseWidget';

export default function GithubWidget({ constraintsRef, zIndex, onFocus }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Keeps the 1s delay to let the calendar fetch and render smoothly
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const customTheme = {
    dark: ['#1a1a1a', '#4A0F0F', '#7A1313', '#B31616', '#E51919'],
  };

  const filterLastSixMonths = (contributions) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(today.getDate() - 180);
    return contributions.filter((day) => {
      const date = new Date(day.date);
      return date >= sixMonthsAgo && date <= today;
    });
  };

  return (
    <BaseWidget
      constraintsRef={constraintsRef}
      zIndex={zIndex}
      onFocus={onFocus}
      className="bottom-3 left-3 w-fit" // Placed exactly where it was before
      title="Contributions"
    >
      <div 
        className={`transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(e) => e.stopPropagation()} // Prevents dragging when clicking calendar tooltips
      >
        <GitHubCalendar 
          username="siddharthNirmale" 
          colorScheme="dark"
          theme={customTheme}
          transformData={filterLastSixMonths}
          blockSize={10}
          blockMargin={4}
          fontSize={10}
          hideColorLegend={true}
          hideTotalCount={true} 
          style={{ color: '#737373' }}
        />
      </div>
    </BaseWidget>
  );
}