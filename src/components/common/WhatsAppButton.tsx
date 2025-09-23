// // src/components/common/WhatsAppButton.tsx
// import React from 'react';
// import { MessageCircle } from 'lucide-react';
// import { generateWhatsAppURL } from '@/lib/whatsapp/api';
// import { APP_CONFIG } from '@/lib/utils/constants';

// interface WhatsAppButtonProps {
//   message?: string;
//   className?: string;
//   children?: React.ReactNode;
//   phoneNumber?: string;
// }

// const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
//   message = `Hi! I'm interested in your travel packages. Please help me plan my trip.`,
//   className = '',
//   children,
//   phoneNumber = APP_CONFIG.whatsappNumber,
// }) => {
//   const handleWhatsAppClick = () => {
//     const url = generateWhatsAppURL(phoneNumber, message);
//     window.open(url, '_blank');
//   };

//   return (
//     <button
//       onClick={handleWhatsAppClick}
//       className={`inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${className}`}
//     >
//       <MessageCircle className="w-5 h-5 mr-2" />
//       {children || 'Chat on WhatsApp'}
//     </button>
//   );
// };

// export default WhatsAppButton;










// src/components/common/WhatsAppButton.tsx
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '@/lib/utils/constants';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  phoneNumber?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = `Hi! I'm interested in your travel packages. Please help me plan my trip.`,
  className = '',
  children,
  phoneNumber = APP_CONFIG.phone || '+917006377796',
}) => {
  const handleWhatsAppClick = () => {
    // Create WhatsApp URL manually
    const encodedMessage = encodeURIComponent(message);
    const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${className}`}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {children || 'Chat on WhatsApp'}
    </button>
  );
};

export default WhatsAppButton;