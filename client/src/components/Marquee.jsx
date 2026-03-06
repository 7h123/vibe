import { useTranslation } from '../hooks/useTranslation';

export default function Marquee() {
    const { t } = useTranslation();
    const items = [
        t('marquee.handmade'),
        t('marquee.unique'),
        t('marquee.marble'),
        t('marquee.travertin'),
        t('marquee.granite'),
        t('marquee.madeinMaroc'),
        t('marquee.custom'),
        t('marquee.delivery'),
    ];

    // Exactly 2 copies for seamless infinite loop: when first half scrolls out, second half is identical
    const repeated = [...items, ...items];

    return (
        <div
            style={{
                background: '#1A1715',
                borderTop: '1px solid rgba(200,169,110,0.2)',
                borderBottom: '1px solid rgba(200,169,110,0.2)',
                height: '40px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
            }}
        >
            {/* Fade masks on edges */}
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: '80px', zIndex: 2,
                background: 'linear-gradient(to right, #1A1715, transparent)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0,
                width: '80px', zIndex: 2,
                background: 'linear-gradient(to left, #1A1715, transparent)',
                pointerEvents: 'none',
            }} />

            <div
                className="marquee-track"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: 'max-content',
                    willChange: 'transform',
                }}
            >
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontFamily: "'Tenor Sans', sans-serif",
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            color: '#C8A96E',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            paddingRight: '48px',
                        }}
                    >
                        {item}
                        <span style={{
                            marginLeft: '48px',
                            color: 'rgba(200,169,110,0.4)',
                            fontSize: '6px',
                            verticalAlign: 'middle'
                        }}>·</span>
                    </span>
                ))}
            </div>

            <style>{`
        .marquee-track {
          animation: marqueeScroll 45s linear infinite;
        }
        @keyframes marqueeScroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
        </div>
    );
}
