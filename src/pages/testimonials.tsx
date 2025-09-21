import { Star, Quote, ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      quote: 'TravelQuench made our European adventure unforgettable! From seamless bookings to personalized itineraries, everything was perfect. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      trip: 'Europe Tour'
    },
    {
      name: 'Raj Patel',
      location: 'Mumbai, India',
      rating: 5,
      quote: 'The Kerala backwaters trip was magical. Ranjith and team handled everything flawlessly. Best domestic travel experience ever!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      trip: 'Kerala Backwaters'
    },
    {
      name: 'Emily Chen',
      location: 'Singapore',
      rating: 4.5,
      quote: 'Loved our Bali getaway! The partnership with Yatra.com ensured great deals and smooth flights. Minor hiccup with hotel check-in, but quickly resolved.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      trip: 'Bali Paradise'
    },
    {
      name: 'Michael Rodriguez',
      location: 'London, UK',
      rating: 5,
      quote: 'Japan trip exceeded all expectations. Cultural immersion, amazing food tours, and efficient operations. TravelQuench is now my go-to agency!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      trip: 'Japan Exploration'
    },
    {
      name: 'Priya Sharma',
      location: 'Delhi, India',
      rating: 5,
      quote: 'Goa beach vacation was pure bliss. Affordable packages, great accommodations, and fun activities. Thanks to TravelQuench for the memories!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      trip: 'Goa Beaches'
    },
    {
      name: 'David Kim',
      location: 'Seoul, South Korea',
      rating: 4.8,
      quote: 'Thailand adventure was thrilling! From beaches to temples, everything was well-organized. The Yatra partnership made bookings effortless.',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def7f4fa?w=400&h=400&fit=crop',
      trip: 'Thailand Adventure'
    }
  ]

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Background Video */}
        <Navbar />
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dzoxwk1jc/video/upload/v1758395896/main_nysgrf.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            4.9/5 Average Rating
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            What Our Travelers Say
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover why thousands choose TravelQuench for their dream journeys. Real stories from real adventurers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white/80 shadow-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">15K+</div>
              <p className="text-gray-600">Happy Travelers</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 shadow-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 shadow-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
              <p className="text-gray-600">Destinations Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 group"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-12 h-12 text-yellow-200 opacity-50 group-hover:text-yellow-300 transition-colors duration-300" />
                
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                    )}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* User Info */}
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-yellow-400"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.trip}</p>
                    </div>
                  </div>
                </div>
                
                {/* Gradient Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/10 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 to-orange-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Own Story?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied travelers and let TravelQuench plan your next adventure.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/packages"
              className="inline-flex items-center px-8 py-4 bg-white text-yellow-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-yellow-600 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  )
}

export default TestimonialsPage