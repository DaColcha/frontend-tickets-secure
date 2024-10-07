//maintenance page example with tailwindcss

import React from "react";

function Maintenance() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Servicio no disponible
        </h1>
        <p className="text-center">
          El sitio web actualmente no está disponible para su uso
        </p>
      </div>
    </div>
  );
}

export default Maintenance;
