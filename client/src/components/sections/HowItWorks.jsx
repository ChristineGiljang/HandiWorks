import React from "react";
import { Search, CalendarCheck, ShieldCheck, Smile } from "lucide-react";

const steps = [
  {
    title: "1. Find a Service",
    description: "Browse or search to find cleaning services in your area.",
    icon: <Search className="w-8 h-8 text-green-600 mb-4" />,
  },
  {
    title: "2. Book Instantly",
    description: "Choose a date and time that works for you — no calls needed.",
    icon: <CalendarCheck className="w-8 h-8 text-green-600 mb-4" />,
  },
  {
    title: "3. Trusted Cleaners",
    description:
      "All cleaners are background-checked and vetted by HandiWorks.",
    icon: <ShieldCheck className="w-8 h-8 text-green-600 mb-4" />,
  },
  {
    title: "4. Enjoy a Spotless Space",
    description: "Sit back and relax — we’ve got your cleaning covered.",
    icon: <Smile className="w-8 h-8 text-green-600 mb-4" />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-2xl font-bold text-center mb-4">
        How HandiWorks Works
      </h2>
      <p className="text-lg text-gray-600 text-center mb-12">
        Book a trusted cleaning service in just a few steps.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
