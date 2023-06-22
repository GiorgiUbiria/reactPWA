import React, { useMemo, useRef, useCallback } from 'react';

const CategoryModal = ({ categories, onCategoryChange }) => {
  const modalRef = useRef(null);

  const handleButtonClick = useCallback((category) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  const categoryButtons = useMemo(
    () =>
      categories.map((category) => (
        <button
          key={category}
          onClick={() => handleButtonClick(category)}
          className="category-button"
        >
          {category}
        </button>
      )),
    [categories, handleButtonClick]
  );

  return (
    <div className="category-modal" ref={modalRef}>
      <h3>Choose Category</h3>
      <div className="category-buttons">{categoryButtons}</div>
    </div>
  );
};

export default CategoryModal;