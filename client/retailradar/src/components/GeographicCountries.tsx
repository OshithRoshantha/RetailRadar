import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { useState } from 'react';

const COLORS = ['#56c0da', '#18182c', '#6b67a0', '#18182c', '#56c0da'];

interface CountryData {
  Country: string;
  Customer_Count: number;
}

export const CustomersByCountryMap = ({ data }: { data: CountryData[] }) => {
  const [content, setContent] = useState<string | null>(null);
  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
  const countryToISO: Record<string, string> = {
    'USA': 'IND',
    'UK': 'GB',
    'Germany': 'DE',
    'Australia': 'AU',
    'Canada': 'CA'
  };

  const colorScale = scaleQuantile<string>()
    .domain(data.map(d => d.Customer_Count))
    .range(COLORS);

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ width: '100%', height: 400 , marginTop:'-60px', marginBottom: '30px'}}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
            center: [0, 30]
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isoCode = countryToISO[geo.properties.name];
                const countryData = data.find(d => countryToISO[d.Country] === isoCode);
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryData ? colorScale(countryData.Customer_Count) : '#EEE'}
                    stroke="#FFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: {
                        fill: countryData ? '#5bc0be' : '#DDD',
                        cursor: 'pointer'
                      },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => {
                      if (countryData) {
                        setContent(`${geo.properties.name}: ${countryData.Customer_Count.toLocaleString()} customers`);
                      }
                    }}
                    onMouseLeave={() => {
                      setContent(null);
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      {content && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          {content}
        </div>
      )}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        marginTop: 20,
        gap: 15
      }}>
        {data
          .sort((a, b) => b.Customer_Count - a.Customer_Count)
          .map((item, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '5px 10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              <div style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS[i % COLORS.length],
                marginRight: 8,
                borderRadius: 2
              }} />
              <span>
                <strong>{item.Country}</strong>: {item.Customer_Count.toLocaleString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};