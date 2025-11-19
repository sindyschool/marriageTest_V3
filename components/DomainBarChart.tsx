import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Domain, DomainConfig } from '../types';
import { DOMAINS } from '../constants';

interface DomainBarChartProps {
  domainScores: Record<Domain, number>;
}

const DomainBarChart: React.FC<DomainBarChartProps> = ({ domainScores }) => {
  const data = DOMAINS.map((domainConfig: DomainConfig) => ({
    name: domainConfig.label,
    score: domainScores[domainConfig.key],
    color: domainConfig.color,
    fullMark: 20,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 20]} hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={70} 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#F3F4F6', radius: [0, 4, 4, 0] }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DomainBarChart;