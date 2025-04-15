import { CheckCircleIcon } from "@heroicons/react/24/solid";

const features = [
  {
    title: "No upfront fees",
    description:
      "You only pay a small commission after a successful booking. No hidden charges.",
  },
  {
    title: "Get instant bookings",
    description:
      "Get hired immediately. Clients can book your services without back-and-forth messaging.",
  },
  {
    title: "Cash payouts (same day)",
    description:
      "Receive your earnings the same day after job completion — no long waits.",
  },
  {
    title: "Trust-building features: badges, reviews, ratings",
    description:
      "Earn badges, gather ratings, and showcase your successful hires to attract more clients.",
  },
];

const WhyJoin = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Why Join HandiWorks?
      </h2>
      <ul className="space-y-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyJoin;
