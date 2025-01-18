import { purchasePolicies } from "@/lib/policies";

export default function TerminosCondiciones() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8">
        Términos y Condiciones
      </h1>

      <div className="w-full max-w-4xl space-y-6">
        {purchasePolicies.map((policy) => (
          <div key={policy.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {policy.title}
            </h2>
            <p className="text-gray-600">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}