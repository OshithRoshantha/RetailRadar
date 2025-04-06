
export const DeliveryMetrics = ({
    successRate,
    ratio
  }: {
    successRate: number;
    ratio: number;
  }) => {
    const renderGauge = (value: number, label: string) => {
      const radius = 90;
      const circumference = 2 * Math.PI * radius;
      const progress = (value / 100) * circumference;
      const offset = circumference - progress;
  
      return (
        <div style={{
          width: 200,
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="200" height="200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#18182c"
              strokeWidth="15"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#6b67a0"
              strokeWidth="15"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="20"
              fill="#18182c"
            >
              {value.toFixed(1)}%
            </text>
          </svg>
          <p style={{
            marginTop: '10px',
            fontWeight: '500',
            fontSize: '1rem',
            color: '#18182c'
          }}>{label}</p>
        </div>
      );
    };
  
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#fff',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px'
        }}>
          {renderGauge(successRate, "Delivery Success Rate")}
          {renderGauge(ratio * 100, "Shipped/Delivered Ratio")}
        </div>
      </div>
    );
  };