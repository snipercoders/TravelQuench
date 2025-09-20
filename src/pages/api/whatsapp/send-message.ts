// src/pages/api/whatsapp/send-message.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { 
  formatCustomPackageMessage, 
  formatBookingInquiry,
  formatContactMessage,
  generateWhatsAppURL 
} from '@/lib/whatsapp/api';
import { APP_CONFIG } from '@/lib/utils/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    let message = '';
    let phoneNumber = APP_CONFIG.whatsappNumber;

    switch (type) {
      case 'custom-package':
        message = formatCustomPackageMessage(data);
        break;
      
      case 'booking-inquiry':
        message = formatBookingInquiry(data.packageTitle, data.customerName, data.customerPhone);
        break;
      
      case 'contact':
        message = formatContactMessage(data.name, data.email, data.phone, data.message);
        break;
      
      case 'general':
        message = data.message;
        phoneNumber = data.phoneNumber || phoneNumber;
        break;
      
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid message type'
        });
    }

    // Generate WhatsApp URL (since we're using web WhatsApp, not API)
    const whatsappUrl = generateWhatsAppURL(phoneNumber, message);

    res.status(200).json({
      success: true,
      message: 'WhatsApp URL generated successfully',
      url: whatsappUrl,
      data: {
        phoneNumber,
        message
      }
    });

  } catch (error) {
    console.error('WhatsApp message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process WhatsApp message'
    });
  }
}