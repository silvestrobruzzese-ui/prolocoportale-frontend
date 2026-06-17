import React from "react";

export default function PaywallPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Servizio a Pagamento
        </h1>
        <p className="text-gray-600 mb-6">
          L'accesso a ProlocoPortale è riservato agli utenti abbonati.
        </p>
        <p className="text-gray-500 text-sm">
          Per informazioni contattaci.
        </p>
      </div>
    </div>
  );
}
