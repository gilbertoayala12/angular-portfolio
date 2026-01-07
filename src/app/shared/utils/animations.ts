// Fade in animation
export function fadeIn(element: HTMLElement, duration = 400): Animation {
  return element.animate(
    [
      { opacity: 0 },
      { opacity: 1 }
    ],
    {
      duration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  );
}

// Stagger animation for lists
export function staggerIn(elements: HTMLElement[], delay = 100): Animation[] {
  return Array.from(elements).map((el, index) => {
    return el.animate(
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 400,
        delay: index * delay,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  });
}

// Scale in animation
export function scaleIn(element: HTMLElement, duration = 400): Animation {
  return element.animate(
    [
      { opacity: 0, transform: 'scale(0.9)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }
  );
}

// Slide from bottom
export function slideUp(element: HTMLElement, duration = 500): Animation {
  return element.animate(
    [
      { opacity: 0, transform: 'translateY(30px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }
  );
}