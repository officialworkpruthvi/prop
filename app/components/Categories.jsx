import Image from "next/image";

const categories = [
  { title: "Apartments", img: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1" },
  { title: "Villas", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  { title: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  { title: "Luxury Homes", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
          Explore Property Types
        </h2>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl group"
            >
              <div className="relative h-40 md:h-48">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/30" />

              <h3 className="absolute bottom-3 left-3 text-white text-lg font-semibold">
                {cat.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
