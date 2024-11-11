import { CategoryChart } from '@/components/Dashboard/CategoryChart';
import { Header } from '@/components/Dashboard/Header';

const Categories = () => {
  const mockData = [
    { category: 'Alimentação', total: 1200 },
    { category: 'Transporte', total: 500 },
    { category: 'Moradia', total: 2000 },
    { category: 'Lazer', total: 300 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CategoryChart data={mockData} />
      </main>
    </div>
  );
};

export default Categories;