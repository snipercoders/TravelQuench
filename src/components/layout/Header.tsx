// src/components/layout/Header.tsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { APP_CONFIG } from '@/lib/utils/constants';

const Header: React.FC = () => {
  return (
    <div className="bg-secondary-800 text-white py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>+91 {APP_CONFIG.whatsappNumber}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>{APP_CONFIG.supportEmail}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Bengaluru, India</span>
            </div>
          </div>
          <div className="text-primary-400">
            🌟 Book now and get 20% off on your first trip!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
