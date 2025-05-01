
import React from 'react';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Marathon Runner',
    content: "These running shoes completely transformed my training routine. The comfort and support they provide is unmatched. I've shaved minutes off my best time!",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Sarah Williams',
    role: 'Fitness Instructor',
    content: "As someone who's on their feet all day, finding comfortable shoes is essential. These are hands down the best athletic shoes I've ever owned.",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Casual Wearer',
    content: "Not only are these shoes incredibly comfortable for daily wear, but they also look amazing. I get compliments everywhere I go. Definitely worth every penny!",
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-navy text-center mb-2">What Our Customers Say</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Hear from our satisfied customers about their experience with our shoes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              {/* Quote Icon */}
              <svg 
                className="h-8 w-8 text-teal mb-4 opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              {/* Testimonial Content */}
              <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
              
              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
