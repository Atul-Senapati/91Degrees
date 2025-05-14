import React from 'react';
import { Leaf, Droplet, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    description: 'Made from plant fabrics to minimize environmental footprint.',
  },
  {
    icon: Droplet,
    title: 'Superior Absorption',
    description: 'Innovative core locks in moisture for up to 10 hours of reliable protection.',
  },
  {
    icon: ShieldCheck,
    title: 'Hypoallergenic Safety',
    description: 'Dermatologically tested, pH balanced, free from fragrances, and harsh chemicals.',
  },
];

export default function FeatureSection() {
  return (
    <div className="py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, description }, idx) => (
          <div
            key={idx}
            className="relative bg-pink-100 dark:bg-pink-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            {/* Background Icon */}
            <Icon className="absolute -top-4 -right-4 w-32 h-32 text-pink-200 dark:text-pink-800 opacity-30" />

            {/* Content */}
            <div className="relative z-10 space-y-2">
              <Icon className="w-10 h-10 text-pink-600 dark:text-pink-400" />
              <h4 className="text-xl font-bold text-pink-700 dark:text-pink-300 tracking-wide">{title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-200">{description}</p>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}
