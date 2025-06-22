import React from 'react';

/**
 * A reusable Spinning Loader component.
 * Displays a circular spinner with a pink-purple gradient, indicating a loading state.
 *
 * @param {object} props - The component props.
 * @param {string} [props.size="h-8 w-8"] - Tailwind CSS classes for the height and width of the spinner.
 * @param {string} [props.thickness="border-4"] - Tailwind CSS class for the border thickness of the spinner.
 * @param {string} [props.className=""] - Additional Tailwind CSS classes to apply to the spinner container.
 * @returns {JSX.Element} The rendered spinning loader.
 */
const SpinningLoader = ({ size = "h-8 w-8", thickness = "border-4", className = "" }) => {
  return (
    <div
      className={`
        ${size} ${thickness} rounded-full animate-spin
        border-solid border-r-transparent border-t-transparent
        border-b-purple-500 border-l-pink-500
        ${className}
      `}
      style={{
        // Using custom CSS for the gradient border as Tailwind's direct border gradients are limited
        // This creates a subtle gradient effect on the spinning part
        borderColor: 'rgba(255, 255, 255, 0.3)', // Base transparent white for the main border
        borderTopColor: 'transparent', // Make top transparent for the spin effect
        borderRightColor: 'transparent', // Make right transparent for the spin effect
        borderBottomColor: '#d946ef', // Pink part of the gradient
        borderLeftColor: '#a855f7',   // Purple part of the gradient
      }}
    ></div>
  );
};

export default SpinningLoader;
