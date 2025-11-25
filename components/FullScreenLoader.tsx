import React from "react";
interface FullScreenLoaderProps {
  isLoading: boolean;
  text?: string;
}
const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  isLoading,
  text = "Loading...",
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="text-white text-lg animate-pulse">{text}</div>
    </div>
  );
};

export default FullScreenLoader;
