import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryTotal } from '@/types/transactions';

interface CategoryChartProps {
  data: CategoryTotal[];
}

const COLORS = ['#7C3AED', '#9F7AEA', '#B794F4', '#D6BCFA', '#E9D8FD', '#805AD5', '#6B46C1'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-foreground text-xs"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const CategoryChart = ({ data }: CategoryChartProps) => {
  const totalValue = data.reduce((acc, curr) => acc + curr.total, 0);

  const formattedData = data.map(item => ({
    ...item,
    percentage: ((item.total / totalValue) * 100).toFixed(1),
  }));

  return (
    <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Gastos por Categoria</h3>
      
      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              dataKey="total"
              nameKey="category"
              paddingAngle={2}
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [
                `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                'Valor'
              ]}
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                color: 'var(--foreground)'
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{
                paddingTop: '20px',
              }}
              formatter={(value) => (
                <span className="text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {formattedData.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm truncate text-foreground">{item.category}</span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-medium text-sm text-foreground">
                R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-muted-foreground text-xs ml-2">
                ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};