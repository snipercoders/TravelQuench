// src/hooks/useWhatsApp.ts
import { useState } from 'react';
import { CustomPackageRequest } from '@/types';
import { API_ROUTES } from '@/lib/utils/constants';

interface UseWhatsAppReturn {
  sendCustomPackageRequest: (data: CustomPackageRequest) => Promise<boolean>;
  sendBookingInquiry: (packageTitle: string, customerName: string, customerPhone: string) => Promise<boolean>;
  sendContactMessage: (name: string, email: string, phone: string, message: string) => Promise<boolean>;
  openWhatsAppChat: (message?: string, phoneNumber?: string) => void;
  loading: boolean;
}

export const useWhatsApp = (): UseWhatsAppReturn => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (type: string, data: any): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.WHATSAPP_SEND, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      });

      const result = await response.json();

      if (result.success && result.url) {
        window.open(result.url, '_blank');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendCustomPackageRequest = async (data: CustomPackageRequest): Promise<boolean> => {
    return sendMessage('custom-package', data);
  };

  const sendBookingInquiry = async (
    packageTitle: string, 
    customerName: string, 
    customerPhone: string
  ): Promise<boolean> => {
    return sendMessage('booking-inquiry', {
      packageTitle,
      customerName,
      customerPhone,
    });
  };

  const sendContactMessage = async (
    name: string,
    email: string,
    phone: string,
    message: string
  ): Promise<boolean> => {
    return sendMessage('contact', {
      name,
      email,
      phone,
      message,
    });
  };

  const openWhatsAppChat = (message?: string, phoneNumber?: string): void => {
    sendMessage('general', {
      message: message || "Hi! I'm interested in your travel packages. Please help me plan my trip.",
      phoneNumber,
    });
  };

  return {
    sendCustomPackageRequest,
    sendBookingInquiry,
    sendContactMessage,
    openWhatsAppChat,
    loading,
  };
};
