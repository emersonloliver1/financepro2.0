import { CategoryChart } from '@/components/Dashboard/CategoryChart';

const Categories = () => {
  const mockData = [
    { category: 'Alimentação', total: 1200 },
    { category: 'Transporte', total: 500 },
    { category: 'Moradia', total: 2000 },
    { category: 'Lazer', total: 300 },
  ];

  return (
    <div className="space-y-8">
      <CategoryChart data={mockData} />
    </div>
  );
};

export default Categories;