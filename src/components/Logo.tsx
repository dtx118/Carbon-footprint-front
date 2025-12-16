interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-12 h-12', text: 'text-base', spacing: 'gap-2' },
    md: { container: 'w-20 h-20', text: 'text-2xl', spacing: 'gap-3' },
    lg: { container: 'w-32 h-32', text: 'text-4xl', spacing: 'gap-4' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex flex-col items-center ${currentSize.spacing}`}>
      {/* Logo Icon */}
      <div className="relative">
        <svg
          viewBox="0 0 100 100"
          className={currentSize.container}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle cx="50" cy="50" r="48" fill="#FEFDE8" stroke="#5C7A5F" strokeWidth="2" />
          
          {/* Tree design - three leaves forming a tree */}
          {/* Left leaf */}
          <path
            d="M 35 55 Q 25 45 30 35 Q 35 30 40 35 Q 40 45 35 55 Z"
            fill="#A8C686"
            stroke="#5C7A5F"
            strokeWidth="1.5"
          />
          
          {/* Center leaf (top) */}
          <path
            d="M 50 30 Q 40 25 42 15 Q 47 10 52 12 Q 58 20 50 30 Z"
            fill="#5C7A5F"
            stroke="#4A6350"
            strokeWidth="1.5"
          />
          
          {/* Right leaf */}
          <path
            d="M 65 55 Q 75 45 70 35 Q 65 30 60 35 Q 60 45 65 55 Z"
            fill="#7A9B6C"
            stroke="#5C7A5F"
            strokeWidth="1.5"
          />
          
          {/* Trunk */}
          <rect
            x="47"
            y="55"
            width="6"
            height="25"
            fill="#8B6F47"
            rx="1"
          />
          
          {/* Roots/Base */}
          <path
            d="M 40 80 Q 45 78 50 80 Q 55 78 60 80"
            stroke="#8B6F47"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Small decorative dots */}
          <circle cx="50" cy="45" r="1.5" fill="#D4E7B9" />
          <circle cx="43" cy="48" r="1" fill="#D4E7B9" />
          <circle cx="57" cy="48" r="1" fill="#D4E7B9" />
        </svg>
        
        {/* Small accent circle */}
        <div className={`absolute ${
          size === 'sm' ? '-bottom-0.5 -right-0.5 w-3 h-3' :
          size === 'md' ? '-bottom-1 -right-1 w-5 h-5' :
          '-bottom-2 -right-2 w-8 h-8'
        } bg-[#D4E7B9] rounded-full border-2 border-[#5C7A5F]`} />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="text-center">
          <h1 className={`text-[#2C3E2F] ${currentSize.text} tracking-tight`}>
            <span className="font-light">Con</span>
            <span className="text-[#5C7A5F]">Tree</span>
            <span className="font-light">bution</span>
          </h1>
        </div>
      )}
    </div>
  );
}
