// src/components/common/FloatingWhatsApp.tsx
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { generateWhatsAppURL } from '@/lib/whatsapp/api';
import { APP_CONFIG } from '@/lib/utils/constants';

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const finalMessage = message.trim() || "Hi! I'm interested in your travel packages. Please help me plan my trip.";
    const url = generateWhatsAppURL(APP_CONFIG.whatsappNumber, finalMessage);
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
            aria-label="Open WhatsApp Chat"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-w-sm">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Travel Quench</h3>
                  <p className="text-sm text-green-100">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  👋 Hi there! Welcome to Travel Quench. How can we help you plan your perfect trip?
                </p>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />

              <button
                onClick={handleSendMessage}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg mt-3 transition-colors duration-200"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by WhatsApp
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingWhatsApp;