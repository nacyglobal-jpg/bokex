import { Building2, Users, MapPin, Award } from 'lucide-react';

const stats = [
  {
    icon: Building2,
    value: '50K+',
    label: 'Hotels Worldwide',
  },
  {
    icon: Users,
    value: '2M+',
    label: 'Happy Customers',
  },
  {
    icon: MapPin,
    value: '180+',
    label: 'Countries',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'Average Rating',
  },
];

export function StatsSection() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-[#0A2540] to-[#0052A3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full mb-3 md:mb-4 group-hover:bg-white/20 transition-colors">
                <stat.icon className="size-6 md:size-8 text-cyan-300" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-cyan-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
