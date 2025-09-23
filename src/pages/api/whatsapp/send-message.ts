// // src/pages/api/whatsapp/send-message.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { 
//   formatCustomPackageMessage, 
//   formatBookingInquiry,
//   formatContactMessage,
//   generateWhatsAppURL 
// } from '@/lib/whatsapp/api';
// import { APP_CONFIG } from '@/lib/utils/constants';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     const { type, data } = req.body;

//     let message = '';
//     let phoneNumber = APP_CONFIG.whatsappNumber;

//     switch (type) {
//       case 'custom-package':
//         message = formatCustomPackageMessage(data);
//         break;
      
//       case 'booking-inquiry':
//         message = formatBookingInquiry(data.packageTitle, data.customerName, data.customerPhone);
//         break;
      
//       case 'contact':
//         message = formatContactMessage(data.name, data.email, data.phone, data.message);
//         break;
      
//       case 'general':
//         message = data.message;
//         phoneNumber = data.phoneNumber || phoneNumber;
//         break;
      
//       default:
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid message type'
//         });
//     }

//     // Generate WhatsApp URL (since we're using web WhatsApp, not API)
//     const whatsappUrl = generateWhatsAppURL(phoneNumber, message);

//     res.status(200).json({
//       success: true,
//       message: 'WhatsApp URL generated successfully',
//       url: whatsappUrl,
//       data: {
//         phoneNumber,
//         message
//       }
//     });

//   } catch (error) {
//     console.error('WhatsApp message error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process WhatsApp message'
//     });
//   }
// }













// // src/pages/api/whatsapp/send-message.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { 
//   // formatCustomPackageMessage, // Temporarily commented out
//   formatBookingInquiry,
//   formatContactMessage,
//   generateWhatsAppURL 
// } from '@/lib/whatsapp/api';
// import { APP_CONFIG } from '@/lib/utils/constants';

// // Temporary placeholder function - replace with actual implementation
// function formatCustomPackageMessage(data: any): string {
//   return `🌟 Custom Package Inquiry 🌟

// 📍 Destination: ${data.destination || 'Not specified'}
// 📅 Travel Dates: ${data.startDate || 'Not specified'} - ${data.endDate || 'Not specified'}
// 👥 Number of Travelers: ${data.travelers || 'Not specified'}
// 💰 Budget Range: ${data.budget || 'Not specified'}
// 📝 Special Requirements: ${data.requirements || 'None'}

// Please contact us for a customized quote!`;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     const { type, data } = req.body;

//     let message = '';
//     let phoneNumber = APP_CONFIG.whatsappNumber;

//     switch (type) {
//       case 'custom-package':
//         message = formatCustomPackageMessage(data);
//         break;
      
//       case 'booking-inquiry':
//         message = formatBookingInquiry(data.packageTitle, data.customerName, data.customerPhone);
//         break;
      
//       case 'contact':
//         message = formatContactMessage(data.name, data.email, data.phone, data.message);
//         break;
      
//       case 'general':
//         message = data.message;
//         phoneNumber = data.phoneNumber || phoneNumber;
//         break;
      
//       default:
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid message type'
//         });
//     }

//     // Generate WhatsApp URL (since we're using web WhatsApp, not API)
//     const whatsappUrl = generateWhatsAppURL(phoneNumber, message);

//     res.status(200).json({
//       success: true,
//       message: 'WhatsApp URL generated successfully',
//       url: whatsappUrl,
//       data: {
//         phoneNumber,
//         message
//       }
//     });

//   } catch (error) {
//     console.error('WhatsApp message error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process WhatsApp message'
//     });
//   }
// }














// src/pages/api/whatsapp/send-message.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { 
  formatCustomPackageMessage,
  formatBookingInquiry,
  formatContactMessage,
  generateWhatsAppURL 
} from '@/lib/whatsapp/api';
import { APP_CONFIG } from '@/lib/utils/constants';

// Type definitions for request data
interface CustomPackageRequestData {
  destination?: string;
  startDate?: string;
  endDate?: string;
  travelers?: number | string;
  budget?: string;
  accommodation?: string;
  transportation?: string;
  mealPreference?: string;
  requirements?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

interface BookingInquiryData {
  packageTitle: string;
  customerName: string;
  customerPhone: string;
}

interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface GeneralMessageData {
  message: string;
  phoneNumber?: string;
}

interface WhatsAppRequest {
  type: 'custom-package' | 'booking-inquiry' | 'contact' | 'general';
  data: CustomPackageRequestData | BookingInquiryData | ContactMessageData | GeneralMessageData;
}

type ApiRequest = NextApiRequest & {
  body: WhatsAppRequest;
};

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    let message = '';
    let phoneNumber = APP_CONFIG.whatsapp.number;

    switch (type) {
      case 'custom-package':
        message = formatCustomPackageMessage(data as CustomPackageRequestData);
        break;
      
      case 'booking-inquiry': {
        const bookingData = data as BookingInquiryData;
        message = formatBookingInquiry(bookingData.packageTitle, bookingData.customerName, bookingData.customerPhone);
        break;
      }
      
      case 'contact': {
        const contactData = data as ContactMessageData;
        message = formatContactMessage(contactData.name, contactData.email, contactData.phone, contactData.message);
        break;
      }
      
      case 'general': {
        const generalData = data as GeneralMessageData;
        message = generalData.message;
        phoneNumber = generalData.phoneNumber || phoneNumber;
        break;
      }
      
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