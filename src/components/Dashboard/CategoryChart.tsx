import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryTotal } from '@/types/transactions';

interface CategoryChartProps {
  data: CategoryTotal[];
}

const COLORS = ['#7C3AED', '#9F7AEA', '#B794F4', '#D6BCFA', '#E9D8FD'];

export const CategoryChart = ({ data }: CategoryChartProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Gastos por Categoria</h3>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="total"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};