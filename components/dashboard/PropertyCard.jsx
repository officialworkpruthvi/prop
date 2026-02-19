"use client";

export default function PropertyCard({ property }) {
  const cover =
    property.propertyImages?.[0] ||
    property.floorPlanImages?.[0] ||
    property.unitPlanImages?.[0];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const status = property.status || "pending";

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* STATUS BADGE */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-medium ${statusColors[status]}`}
        >
          {status.toUpperCase()}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold line-clamp-1">
          {property.propertyName}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-1">
          {property.address}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-green-700">
            ₹ {property.startingPrice}
          </span>

          <span className="text-xs text-gray-400">
            {property.propertyType}
          </span>
        </div>
      </div>
    </div>
  );
}
