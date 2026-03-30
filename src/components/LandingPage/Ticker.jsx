'use client'

export default function Ticker() {
  const brands = [
    'Gymshark India', 'MamaEarth', 'Zomato', 'boAT', 'Nykaa', 'Nike India',
    'Puma India', 'Flipkart', 'Sugar Cosmetics', 'Myntra', 'Swiggy', 'Bewakoof'
  ]

  return (
    <div
      className="overflow-hidden border-b"
      style={{
        background: '#0a0a0a',
        borderColor: 'rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="flex gap-0 py-5 animate-marquee w-max">
        {/* First set */}
        {brands.map((brand, i) => (
          <div
            key={`first-${i}`}
            className="flex items-center gap-3 px-10 border-r whitespace-nowrap flex-shrink-0"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)'
            }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: '#d43a2a' }}
            />
            {brand}
          </div>
        ))}

        {/* Duplicate for seamless loop */}
        {brands.map((brand, i) => (
          <div
            key={`second-${i}`}
            className="flex items-center gap-3 px-10 border-r whitespace-nowrap flex-shrink-0"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)'
            }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: '#d43a2a' }}
            />
            {brand}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  )
}
