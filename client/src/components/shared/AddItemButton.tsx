import React from "react";

interface AddItemButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  wrapperClassName?: string;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({
  onClick,
  label = "+ Add Item",
  className = "",
  wrapperClassName = "absolute right-0 top-0 p-4",
}) => {
  return (
    <div className={wrapperClassName}>
      <button
        onClick={onClick}
        className={`rounded bg-purple-400 px-4 py-2 text-white hover:bg-purple-500 ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default AddItemButton;
