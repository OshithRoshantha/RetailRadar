import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#56c0da', '#18182c', '#6b67a0'];

interface ProductRating {
  Product_Type: string;
  Avg_Rating: number;
}

interface ProductRatingsProps {
  topHighRated: ProductRating[];
  lowestRated: ProductRating[];
}

export const ProductRatingsChart = ({ topHighRated, lowestRated }: ProductRatingsProps) => {
  const radarData = [...topHighRated, ...lowestRated];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="Product_Type" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar 
            name="Top Rated" 
            dataKey="Avg_Rating" 
            stroke={COLORS[1]} 
            fill={COLORS[2]} 
            fillOpacity={0.6} 
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};