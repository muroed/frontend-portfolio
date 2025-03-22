import { useState, useEffect } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu on larger screens
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    // Handle clicks outside the menu
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen && 
        !target.closest('.mobile-menu') && 
        !target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Toggle the menu
  const toggle = () => setIsOpen(!isOpen);

  // Close the menu
  const close = () => setIsOpen(false);

  return { isOpen, toggle, close };
}
