import { Code, Palette, TrendingUp, Zap, BarChart3, Cpu } from "lucide-react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    icon: Code,
    label: "Development",
    count: "2,345 jobs",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Palette,
    label: "Design",
    count: "890 jobs",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: TrendingUp,
    label: "Marketing",
    count: "1,234 jobs",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Zap,
    label: "Product",
    count: "567 jobs",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: BarChart3,
    label: "Business",
    count: "1,567 jobs",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Cpu,
    label: "Infrastructure",
    count: "678 jobs",
    color: "from-indigo-500 to-indigo-600",
  },
];

const TopCategories = () => {
  return (
    <section className=" px-4 container mx-auto">
      <div className=" px-4 container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Top Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse jobs by popular categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.label}
                className="relative overflow-hidden rounded-xl p-8 text-white group cursor-pointer transition-transform duration-300 hover:scale-105 "
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color}`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <Icon size={40} className="opacity-90" />
                    <ArrowRight
                      size={24}
                      className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.label}</h3>
                  <p className="text-white/90 font-medium">{category.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
