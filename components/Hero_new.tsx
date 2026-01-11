import React from 'react'
import { Code2, Cloud, BarChart3, Globe, Lock, Cpu } from 'lucide-react'
export function Services() {
  const services = [
    {
      icon: Code2,
      title: 'Custom Software Development',
      description:
        'Tailored enterprise solutions built with scalable architecture and modern frameworks.',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description:
        'Secure, scalable cloud migration and management services for optimal performance.',
    },
    {
      icon: BarChart3,
      title: 'Digital Transformation',
      description:
        'Strategic consulting to modernize legacy systems and digitize business processes.',
    },
    {
      icon: Globe,
      title: 'Web & Mobile Solutions',
      description:
        'Responsive, high-performance applications that deliver exceptional user experiences.',
    },
    {
      icon: Lock,
      title: 'Cybersecurity',
      description:
        'Robust security protocols and audits to protect your digital assets and data.',
    },
    {
      icon: Cpu,
      title: 'Emerging Tech',
      description:
        'Implementation of AI, IoT, and blockchain solutions for competitive advantage.',
    },
  ]
  return (
    <section id="services" className="py-32 bg-[#0f1f3a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3">
            Our Expertise
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Comprehensive technology solutions
          </h3>
          <p className="text-gray-400 text-lg">
            We deliver end-to-end technical capabilities to help your business
            thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-[#0a1628] rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20"
            >
              <div className="mb-6 inline-block p-4 rounded-full bg-[#0f1f3a] group-hover:bg-cyan-500/10 transition-colors">
                <service.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
