import React from "react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * WhatsAppButton Component
 * 
 * A floating WhatsApp chat button fixed to the bottom-right corner.
 * Triggers a WhatsApp chat with a pre-defined number and message.
 * On desktop, it opens WhatsApp Web.
 * On mobile, it opens the WhatsApp app.
 */
const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const phoneNumber = "918769215905";
    const message = encodeURIComponent("Hello, I visited gauswarn.com and need more information.");
    
    // Check if user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let url;
    if (isMobile) {
      // Mobile: open WA app link
      url = `https://wa.me/${phoneNumber}?text=${message}`;
    } else {
      // Desktop: open WA Web
      url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }
    
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 animate-whatsapp-pulse h-[60px] w-[60px]"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={35} color="white" />
    </button>
  );
};

export default WhatsAppButton;
