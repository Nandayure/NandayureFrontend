const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Green element (top) */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#4caf50] opacity-10"></div>

      {/* Yellow element (middle) */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#e0ac20] opacity-10"></div>

      {/* Blue element (bottom) */}
      <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-[#34b1fd] opacity-10"></div>

      {/* Subtle grid pattern */}
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </div>
  )
}

export default BackgroundDecoration

