// // src/pages/api/custom-package/submit.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectDB from '@/lib/db/connection';

// interface CustomPackageRequest {
//   // Trip Details
//   tripType: 'domestic' | 'international' | 'both';
//   destinations: string[];
//   startDate: string;
//   endDate: string;
//   duration: number;
  
//   // Travelers
//   adults: number;
//   children: number;
//   seniors: number;
//   totalTravelers: number;
  
//   // Preferences
//   travelStyle: string;
//   accommodationType: string;
//   budgetRange: string;
//   interests: string[];
//   specialRequests: string;
  
//   // Services
//   flightRequired: boolean;
//   hotelRequired: boolean;
//   transportRequired: boolean;
//   guidedTours: boolean;
//   meals: string[];
//   insurance: boolean;
  
//   // Contact
//   name: string;
//   email: string;
//   phone: string;
//   alternatePhone?: string;
//   hearAboutUs: string;
//   urgency: string;
//   additionalNotes: string;
// }

// // You can create a MongoDB model for this if needed
// const CustomPackageRequestSchema = {
//   tripDetails: {
//     tripType: String,
//     destinations: [String],
//     startDate: Date,
//     endDate: Date,
//     duration: Number
//   },
//   travelers: {
//     adults: Number,
//     children: Number,
//     seniors: Number,
//     totalTravelers: Number
//   },
//   preferences: {
//     travelStyle: String,
//     accommodationType: String,
//     budgetRange: String,
//     interests: [String],
//     specialRequests: String
//   },
//   services: {
//     flightRequired: Boolean,
//     hotelRequired: Boolean,
//     transportRequired: Boolean,
//     guidedTours: Boolean,
//     meals: [String],
//     insurance: Boolean
//   },
//   contact: {
//     name: String,
//     email: String,
//     phone: String,
//     alternatePhone: String,
//     hearAboutUs: String,
//     urgency: String,
//     additionalNotes: String
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'in-progress', 'quoted', 'confirmed', 'completed'],
//     default: 'pending'
//   },
//   assignedTo: String, // Travel expert ID
//   estimatedBudget: Number,
//   proposalSent: Boolean,
//   proposalDate: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   try {
//     await connectDB();
//     console.log('📋 Custom package request received:', req.body);

//     const {
//       tripType,
//       destinations,
//       startDate,
//       endDate,
//       duration,
//       adults,
//       children,
//       seniors,
//       totalTravelers,
//       travelStyle,
//       accommodationType,
//       budgetRange,
//       interests,
//       specialRequests,
//       flightRequired,
//       hotelRequired,
//       transportRequired,
//       guidedTours,
//       meals,
//       insurance,
//       name,
//       email,
//       phone,
//       alternatePhone,
//       hearAboutUs,
//       urgency,
//       additionalNotes
//     } = req.body as CustomPackageRequest;

//     // Validation
//     if (!name || !email || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, email, and phone are required'
//       });
//     }

//     if (!tripType || !destinations?.length || !startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: 'Trip details are incomplete'
//       });
//     }

//     if (!travelStyle || !accommodationType || !budgetRange) {
//       return res.status(400).json({
//         success: false,
//         message: 'Travel preferences are required'
//       });
//     }

//     // Create the custom package request
//     const customPackageData = {
//       tripDetails: {
//         tripType,
//         destinations: destinations.filter(d => d.trim()),
//         startDate: new Date(startDate),
//         endDate: new Date(endDate),
//         duration
//       },
//       travelers: {
//         adults,
//         children,
//         seniors,
//         totalTravelers
//       },
//       preferences: {
//         travelStyle,
//         accommodationType,
//         budgetRange,
//         interests: interests || [],
//         specialRequests: specialRequests || ''
//       },
//       services: {
//         flightRequired: flightRequired || false,
//         hotelRequired: hotelRequired || false,
//         transportRequired: transportRequired || false,
//         guidedTours: guidedTours || false,
//         meals: meals || [],
//         insurance: insurance || false
//       },
//       contact: {
//         name: name.trim(),
//         email: email.trim().toLowerCase(),
//         phone: phone.trim(),
//         alternatePhone: alternatePhone?.trim() || '',
//         hearAboutUs: hearAboutUs || '',
//         urgency: urgency || 'flexible',
//         additionalNotes: additionalNotes || ''
//       },
//       status: 'pending',
//       proposalSent: false,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };

//     // Here you would typically save to your database
//     // const savedRequest = await CustomPackageRequest.create(customPackageData);
    
//     // For now, we'll just log it and simulate success
//     console.log('✅ Custom package request created:', customPackageData);

//     // Send notification emails (you can implement this)
//     try {
//       await sendNotificationEmails(customPackageData);
//     } catch (emailError) {
//       console.error('❌ Failed to send notification emails:', emailError);
//       // Don't fail the request if email fails
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Custom package request submitted successfully',
//       requestId: generateRequestId(), // You can implement this
//       data: {
//         name,
//         email,
//         phone,
//         destinations: destinations.filter(d => d.trim()),
//         duration,
//         totalTravelers,
//         urgency
//       }
//     });

//   } catch (error: any) {
//     console.error('❌ Error processing custom package request:', error);
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: Object.values(error.errors).map((err: any) => err.message)
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Failed to submit custom package request'
//     });
//   }
// }

// // Helper function to send notification emails
// async function sendNotificationEmails(data: any) {
//   // Email to customer
//   const customerEmail = {
//     to: data.contact.email,
//     subject: 'Your Custom Travel Package Request Received - Travel Quench',
//     template: 'custom-package-confirmation',
//     data: {
//       customerName: data.contact.name,
//       destinations: data.tripDetails.destinations.join(', '),
//       duration: data.tripDetails.duration,
//       travelers: data.travelers.totalTravelers,
//       urgency: data.contact.urgency
//     }
//   };

//   // Email to travel team
//   const teamEmail = {
//     to: 'custom@travelquench.com',
//     subject: `New Custom Package Request - ${data.contact.name} - ${data.tripDetails.destinations.join(', ')}`,
//     template: 'custom-package-new-request',
//     data: data
//   };

//   // You would implement your email service here
//   // await emailService.send(customerEmail);
//   // await emailService.send(teamEmail);
  
//   console.log('📧 Notification emails queued:', { customerEmail, teamEmail });
// }

// // Helper function to generate request ID
// function generateRequestId(): string {
//   const timestamp = Date.now().toString(36);
//   const randomStr = Math.random().toString(36).substring(2, 8);
//   return `CTP-${timestamp}-${randomStr}`.toUpperCase();
// }










// src/pages/api/custom-package/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db/connection';

interface CustomPackageRequest {
  // Trip Details
  tripType: 'domestic' | 'international' | 'both';
  destinations: string[];
  startDate: string;
  endDate: string;
  duration: number;
  
  // Travelers
  adults: number;
  children: number;
  seniors: number;
  totalTravelers: number;
  
  // Preferences
  travelStyle: string;
  accommodationType: string;
  budgetRange: string;
  interests: string[];
  specialRequests: string;
  
  // Services
  flightRequired: boolean;
  hotelRequired: boolean;
  transportRequired: boolean;
  guidedTours: boolean;
  meals: string[];
  insurance: boolean;
  
  // Contact
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  hearAboutUs: string;
  urgency: string;
  additionalNotes: string;
}

interface ValidationError extends Error {
  name: string;
  errors: Record<string, { message: string }>;
}

interface CustomPackageData {
  tripDetails: {
    tripType: string;
    destinations: string[];
    startDate: Date;
    endDate: Date;
    duration: number;
  };
  travelers: {
    adults: number;
    children: number;
    seniors: number;
    totalTravelers: number;
  };
  preferences: {
    travelStyle: string;
    accommodationType: string;
    budgetRange: string;
    interests: string[];
    specialRequests: string;
  };
  services: {
    flightRequired: boolean;
    hotelRequired: boolean;
    transportRequired: boolean;
    guidedTours: boolean;
    meals: string[];
    insurance: boolean;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    alternatePhone: string;
    hearAboutUs: string;
    urgency: string;
    additionalNotes: string;
  };
  status: string;
  proposalSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();
    console.log('📋 Custom package request received:', req.body);

    const {
      tripType,
      destinations,
      startDate,
      endDate,
      duration,
      adults,
      children,
      seniors,
      totalTravelers,
      travelStyle,
      accommodationType,
      budgetRange,
      interests,
      specialRequests,
      flightRequired,
      hotelRequired,
      transportRequired,
      guidedTours,
      meals,
      insurance,
      name,
      email,
      phone,
      alternatePhone,
      hearAboutUs,
      urgency,
      additionalNotes
    } = req.body as CustomPackageRequest;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    if (!tripType || !destinations?.length || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Trip details are incomplete'
      });
    }

    if (!travelStyle || !accommodationType || !budgetRange) {
      return res.status(400).json({
        success: false,
        message: 'Travel preferences are required'
      });
    }

    // Create the custom package request
    const customPackageData: CustomPackageData = {
      tripDetails: {
        tripType,
        destinations: destinations.filter(d => d.trim()),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration
      },
      travelers: {
        adults,
        children,
        seniors,
        totalTravelers
      },
      preferences: {
        travelStyle,
        accommodationType,
        budgetRange,
        interests: interests || [],
        specialRequests: specialRequests || ''
      },
      services: {
        flightRequired: flightRequired || false,
        hotelRequired: hotelRequired || false,
        transportRequired: transportRequired || false,
        guidedTours: guidedTours || false,
        meals: meals || [],
        insurance: insurance || false
      },
      contact: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        alternatePhone: alternatePhone?.trim() || '',
        hearAboutUs: hearAboutUs || '',
        urgency: urgency || 'flexible',
        additionalNotes: additionalNotes || ''
      },
      status: 'pending',
      proposalSent: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Here you would typically save to your database
    // const savedRequest = await CustomPackageRequest.create(customPackageData);
    
    // For now, we'll just log it and simulate success
    console.log('✅ Custom package request created:', customPackageData);

    // Send notification emails (you can implement this)
    try {
      await sendNotificationEmails(customPackageData);
    } catch (emailError) {
      console.error('❌ Failed to send notification emails:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Custom package request submitted successfully',
      requestId: generateRequestId(), // You can implement this
      data: {
        name,
        email,
        phone,
        destinations: destinations.filter(d => d.trim()),
        duration,
        totalTravelers,
        urgency
      }
    });

  } catch (error: unknown) {
    console.error('❌ Error processing custom package request:', error);
    
    if ((error as ValidationError).name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values((error as ValidationError).errors).map((err) => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit custom package request'
    });
  }
}

// Helper function to send notification emails
async function sendNotificationEmails(data: CustomPackageData) {
  // Email to customer
  const customerEmail = {
    to: data.contact.email,
    subject: 'Your Custom Travel Package Request Received - Travel Quench',
    template: 'custom-package-confirmation',
    data: {
      customerName: data.contact.name,
      destinations: data.tripDetails.destinations.join(', '),
      duration: data.tripDetails.duration,
      travelers: data.travelers.totalTravelers,
      urgency: data.contact.urgency
    }
  };

  // Email to travel team
  const teamEmail = {
    to: 'custom@travelquench.com',
    subject: `New Custom Package Request - ${data.contact.name} - ${data.tripDetails.destinations.join(', ')}`,
    template: 'custom-package-new-request',
    data: data
  };

  // You would implement your email service here
  // await emailService.send(customerEmail);
  // await emailService.send(teamEmail);
  
  console.log('📧 Notification emails queued:', { customerEmail, teamEmail });
}

// Helper function to generate request ID
function generateRequestId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `CTP-${timestamp}-${randomStr}`.toUpperCase();
}
