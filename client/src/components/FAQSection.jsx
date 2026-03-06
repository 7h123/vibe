import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

/**
 * FAQSection Component
 * Section FAQ luxe et minimaliste pour NOVA DESIGN
 * Layout asymétrique: image + accordions interactifs
 * Responsive: mobile vertical, desktop horizontal
 */
export default function FAQSection() {
  useScrollReveal();
  const { t } = useTranslation();

  // État pour gérer les accordions (ouvert/fermé)
  const [expandedCategory, setExpandedCategory] = useState('brand');

  // Données FAQ organisées par catégorie
  const faqData = [
    {
      id: 'brand',
      title: t('faq.categories.brand'),
      questions: [
        {
          q: t('faq.questions.brand.q1'),
          a: t('faq.answers.brand.a1'),
        },
        {
          q: t('faq.questions.brand.q2'),
          a: t('faq.answers.brand.a2'),
        },
      ],
    },
    {
      id: 'stones',
      title: t('faq.categories.stones'),
      questions: [
        {
          q: t('faq.questions.stones.q1'),
          a: t('faq.answers.stones.a1'),
        },
        {
          q: t('faq.questions.stones.q2'),
          a: t('faq.answers.stones.a2'),
        },
        {
          q: t('faq.questions.stones.q3'),
          a: t('faq.answers.stones.a3'),
        },
        {
          q: t('faq.questions.stones.q4'),
          a: t('faq.answers.stones.a4'),
        },
      ],
    },
    {
      id: 'products',
      title: t('faq.categories.products'),
      questions: [
        {
          q: t('faq.questions.products.q1'),
          a: t('faq.answers.products.a1'),
        },
        {
          q: t('faq.questions.products.q2'),
          a: t('faq.answers.products.a2'),
        },
        {
          q: t('faq.questions.products.q3'),
          a: t('faq.answers.products.a3'),
        },
        {
          q: t('faq.questions.products.q4'),
          a: t('faq.answers.products.a4'),
        },
        {
          q: t('faq.questions.products.q5'),
          a: t('faq.answers.products.a5'),
        },
        {
          q: t('faq.questions.products.q6'),
          a: t('faq.answers.products.a6'),
        },
        {
          q: t('faq.questions.products.q7'),
          a: t('faq.answers.products.a7'),
        },
        {
          q: t('faq.questions.products.q8'),
          a: t('faq.answers.products.a8'),
        },
        {
          q: t('faq.questions.products.q9'),
          a: t('faq.answers.products.a9'),
        },
        {
          q: t('faq.questions.products.q10'),
          a: t('faq.answers.products.a10'),
        },
        {
          q: t('faq.questions.products.q11'),
          a: t('faq.answers.products.a11'),
        },
        {
          q: t('faq.questions.products.q12'),
          a: t('faq.answers.products.a12'),
        },
        {
          q: t('faq.questions.products.q13'),
          a: t('faq.answers.products.a13'),
        },
        {
          q: t('faq.questions.products.q14'),
          a: t('faq.answers.products.a14'),
        },
      ],
    },
    {
      id: 'care',
      title: t('faq.categories.care'),
      questions: [
        {
          q: t('faq.questions.care.q1'),
          a: t('faq.answers.care.a1'),
        },
        {
          q: t('faq.questions.care.q2'),
          a: t('faq.answers.care.a2'),
        },
        {
          q: t('faq.questions.care.q3'),
          a: t('faq.answers.care.a3'),
        },
        {
          q: t('faq.questions.care.q4'),
          a: t('faq.answers.care.a4'),
        },
        {
          q: t('faq.questions.care.q5'),
          a: t('faq.answers.care.a5'),
        },
      ],
    },
    {
      id: 'professional',
      title: t('faq.categories.professional'),
      questions: [
        {
          q: t('faq.questions.professional.q1'),
          a: t('faq.answers.professional.a1'),
        },
        {
          q: t('faq.questions.professional.q2'),
          a: t('faq.answers.professional.a2'),
        },
        {
          q: t('faq.questions.professional.q3'),
          a: t('faq.answers.professional.a3'),
        },
      ],
    },
    {
      id: 'shipping',
      title: t('faq.categories.shipping'),
      questions: [
        {
          q: t('faq.questions.shipping.q1'),
          a: t('faq.answers.shipping.a1'),
        },
        {
          q: t('faq.questions.shipping.q2'),
          a: t('faq.answers.shipping.a2'),
        },
        {
          q: t('faq.questions.shipping.q3'),
          a: t('faq.answers.shipping.a3'),
        },
        {
          q: t('faq.questions.shipping.q4'),
          a: t('faq.answers.shipping.a4'),
        },
        {
          q: t('faq.questions.shipping.q5'),
          a: t('faq.answers.shipping.a5'),
        },
        {
          q: t('faq.questions.shipping.q6'),
          a: t('faq.answers.shipping.a6'),
        },
        {
          q: t('faq.questions.shipping.q7'),
          a: t('faq.answers.shipping.a7'),
        },
      ],
    },
    {
      id: 'payment',
      title: t('faq.categories.payment'),
      questions: [
        {
          q: t('faq.questions.payment.q1'),
          a: t('faq.answers.payment.a1'),
        },
        {
          q: t('faq.questions.payment.q2'),
          a: t('faq.answers.payment.a2'),
        },
        {
          q: t('faq.questions.payment.q3'),
          a: t('faq.answers.payment.a3'),
        },
      ],
    },
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section className="bg-bg-primary py-20 px-5 xl:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 max-w-2xl" data-reveal>
          <span className="font-body text-[10px] text-gold uppercase tracking-[0.2em] block mb-4">
            {t('faq.header.tag')}
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] lg:text-[48px] text-dark leading-tight mb-2">
            {t('faq.header.title')}
          </h2>
          <p className="font-body text-[12px] text-gold uppercase tracking-widest mb-6">
            {t('faq.header.subtitle')}
          </p>
          <p className="font-body text-[14px] text-text-sec leading-[1.8] mb-8">
            {t('faq.header.description')}
          </p>
          <div className="w-24 h-[1px] bg-gold"></div>
        </div>

        {/* Main Content — Asymmetric Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left: Image (50% on desktop, full-width on mobile) */}
          <div className="w-full lg:w-1/2" data-reveal>
            <div className="aspect-square overflow-hidden bg-surface relative group">
              <img
                src="/images/products/ig-3-travertine-coffee-table-fluted.jpg"
                alt="Table travertin — NOVA DESIGN"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.parentElement.style.background = '#E8E6E1';
                }}
              />
              <div className="absolute inset-0 border border-gold/20 pointer-events-none"></div>
            </div>
            <p className="font-body text-[11px] text-text-sec uppercase tracking-widest mt-6">
              {t('faq.image.caption')}
            </p>
          </div>

          {/* Right: Accordions (50% on desktop, full-width on mobile) */}
          <div className="w-full lg:w-1/2 space-y-4" data-reveal>
            {faqData.map((category) => (
              <div key={category.id} className="border border-gold/20 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full bg-gold hover:bg-gold/90 transition-colors duration-300 px-6 py-5 flex items-center justify-between group"
                  aria-expanded={expandedCategory === category.id}
                  aria-controls={`faq-${category.id}`}
                >
                  <h3 className="font-display text-[14px] lg:text-[15px] font-[600] text-white text-left">
                    {category.title}
                  </h3>
                  <ChevronDown
                    size={20}
                    className="text-white flex-shrink-0 transition-transform duration-300"
                    style={{
                      transform:
                        expandedCategory === category.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Category Body — Questions & Answers */}
                <div
                  id={`faq-${category.id}`}
                  className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${
                    expandedCategory === category.id ? 'max-h-[3000px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-8 bg-bg-secondary space-y-6">
                    {category.questions.map((item, index) => (
                      <div key={index} className="pb-6 border-b border-gold/10 last:border-b-0 last:pb-0">
                        <p className="font-body text-[13px] lg:text-[14px] font-[600] text-dark mb-3 leading-relaxed">
                          {item.q}
                        </p>
                        <p className="font-body text-[13px] lg:text-[14px] font-[400] text-text-sec leading-[1.8]">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Styles pour animations */}
      <style>{`
        @media (max-width: 1024px) {
          [data-reveal] {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
