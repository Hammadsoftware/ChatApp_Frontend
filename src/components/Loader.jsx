import React from 'react';

/**
 * A reusable Skeleton Loader component for displaying loading placeholders.
 * It mimics the structure of an item list, typically used for user lists, feeds, etc.
 *
 * @param {object} props - The component props.
 * @param {number} [props.count=5] - The number of skeleton items to render.
 * @param {string} [props.className=""] - Additional Tailwind CSS classes to apply to the container.
 * @returns {JSX.Element} The rendered skeleton loader.
 */
const SkeletonLoader = ({ count = 5, className = "" }) => {
  return (
    <div className={`p-2 space-y-3 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-purple-900/10 to-pink-900/10 animate-pulse shadow-sm"
        >
          {/* Avatar Skeleton */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-700 to-pink-700"></div>
          {/* Username/Content Line Skeleton */}
          <div className="flex-1 h-4 rounded bg-gradient-to-r from-purple-700 to-pink-700"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
