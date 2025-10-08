import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$10/mo",
      features: [
        "Access to basic courses",
        "Community support",
        "Limited mentor sessions",
      ],
    },
    {
      name: "Pro",
      price: "$30/mo",
      features: [
        "All Basic features",
        "Unlimited mentor sessions",
        "Certificate of completion",
      ],
    },
    {
      name: "Enterprise",
      price: "$99/mo",
      features: [
        "All Pro features",
        "1-on-1 dedicated mentor",
        "Team management tools",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Pricing Plans</h1>
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {plan.name}
            </h2>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              {plan.price}
            </p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  • {feature}
                </li>
              ))}
            </ul>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
