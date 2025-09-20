import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Heart, Map } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const About: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] flex items-center justify-center" style={{ backgroundImage: "url('/images/about-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">About Travel Quench</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
            Crafting unforgettable journeys that ignite your wanderlust and connect you with the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            At Travel Quench, we believe travel is more than just visiting places—it's about creating stories, embracing cultures, and finding yourself in the journey. Our mission is to curate transformative travel experiences that inspire adventure, foster connections, and leave a positive impact on the world.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Global Exploration</h3>
              <p className="mt-2 text-gray-600">
                We design journeys that take you to the heart of every destination, from hidden gems to iconic landmarks.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Passion for Travel</h3>
              <p className="mt-2 text-gray-600">
                Our love for travel drives us to create authentic, immersive experiences that resonate with every traveler.
              </p>
            </div>
            <div className="text-center">
              <Map className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Sustainable Adventures</h3>
              <p className="mt-2 text-gray-600">
                We prioritize eco-friendly travel, supporting local communities and preserving the planet for future explorers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Story</h2>
            <p className="mt-4 text-lg text-gray-600">
              Founded in 2020, Travel Quench was born from a shared passion for adventure and discovery. Our founders, a group of avid travelers, saw a need for personalized, meaningful travel experiences that go beyond the ordinary. Today, we’re proud to have helped thousands of explorers quench their thirst for adventure across the globe, from the peaks of the Himalayas to the savannas of Africa.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Every trip we design is a step toward bringing people closer to the world and each other. Join us, and let’s write your next travel story together.
            </p>
            <Link
              href="/destinations"
              className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Explore Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src="/images/our-story.jpg"
              alt="Travel Quench team exploring"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold">Ready to Quench Your Wanderlust?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join the Travel Quench community and embark on journeys that inspire, connect, and transform.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;