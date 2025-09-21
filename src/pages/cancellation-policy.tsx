import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const CancellationPolicy: React.FC = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      className="relative min-h-screen w-full bg-gray-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
      {/* Back Button */}
      <div className="relative z-20 pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Back
        </button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/95 p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Cancellation Policy
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed">
              TravelQuench Experiences Private Limited ("TravelQuench", "we",
              "us", or "our") understands that plans may change. This
              Cancellation Policy outlines the terms under which cancellations
              are handled for bookings made with us. Please review this policy
              carefully before making a booking, as it forms part of our Terms
              and Conditions.
            </p>

            <section id="scope">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                1. Scope and Applicability
              </h2>
              <p>
                This Cancellation Policy applies to all bookings for trips,
                tours, events, and related services offered by TravelQuench.
                Cancellations are effective only when received in writing via
                email to{" "}
                <a
                  href="mailto:support@travelquench.com"
                  className="text-blue-600 hover:text-blue-500"
                >
                  support@travelquench.com
                </a>
                . Verbal cancellations will not be accepted.
              </p>
            </section>

            <section id="cancellation-process">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                2. Cancellation Process
              </h2>
              <p>
                To cancel your booking, please send a written request including
                your booking reference number, full name, and trip details. We
                will acknowledge receipt and process your cancellation based on
                the schedule below. Processing may take up to 7-10 business
                days, and refunds will be issued to the original payment method
                unless otherwise agreed.
              </p>
            </section>

            <section id="refund-schedule">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                3. Refund Schedule
              </h2>
              <p>
                Refunds are calculated based on the date we receive your written
                cancellation request, relative to the trip departure date:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>More than 60 days before departure</strong>: 75%
                  refund (25% non-refundable deposit).
                </li>
                <li>
                  <strong>30-60 days before departure</strong>: 50% refund.
                </li>
                <li>
                  <strong>Less than 30 days before departure</strong>: No
                  refund.
                </li>
              </ul>
              <p>
                Note: Additional fees may apply for third-party services (e.g.,
                flights, accommodations) as per their policies, which will be
                deducted from any refund.
              </p>
            </section>

            <section id="no-show">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                4. No-Show Policy
              </h2>
              <p>
                If you fail to join the trip or check-in as scheduled without
                prior cancellation, this will be treated as a no-show, and no
                refund will be provided. Travel insurance is strongly
                recommended to cover such instances.
              </p>
            </section>

            <section id="force-majeure">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                5. Force Majeure
              </h2>
              <p>
                In the event of cancellation due to unforeseen circumstances
                beyond our control (e.g., natural disasters, government
                restrictions, or pandemics), TravelQuench will make reasonable
                efforts to reschedule your trip or offer a credit voucher.
                Refunds may be limited to amounts recoverable from third-party
                providers, and no additional compensation will be payable.
              </p>
            </section>

            <section id="insurance">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                6. Travel Insurance
              </h2>
              <p>
                We strongly recommend purchasing comprehensive travel insurance
                to cover cancellations, medical emergencies, and other
                unforeseen events. TravelQuench is not liable for losses not
                covered by your insurance.
              </p>
            </section>

            <section id="amendments">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                7. Amendments to Cancellation Policy
              </h2>
              <p>
                TravelQuench reserves the right to update this Cancellation
                Policy to reflect changes in our services or legal requirements.
                Updates will be posted on our website with the "Last Updated"
                date revised. Continued use of our services after changes
                constitutes acceptance of the new policy.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                For any questions about our Cancellation Policy, please contact
                us at:
              </p>
              <p>
                <a
                  href="mailto:support@travelquench.com"
                  className="text-blue-600 hover:text-blue-500"
                >
                  support@travelquench.com
                </a>
              </p>
              <p className="mt-4">
                Return to{" "}
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
