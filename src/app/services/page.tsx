"use client";

import React, { useEffect, useState } from "react";
import ServiceComponent from "@/component/serviceComponent";

//style
import "./services.scss";

export default function Page() {
  const [services, setServices] = useState<{ id: string; name: string; description: string; image: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ybdigitalx.com/vivi_front/list_service.php")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const updatedServices = data.map((service) => ({
            ...service,
            image: `https://ybdigitalx.com/${service.image}`,
          }));
          setServices(updatedServices);
        } else {
          setError("Failed to load services.");
        }
      })
      .catch(() => setError("Error fetching data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="servicesPage">
      <div className="container">
        <h2 className="font-montserrat">Our Services</h2>
        <p className="font-inter">
          We offer tailored solutions to meet your needs! With our expert team and comprehensive approaches, we are here
          to provide you with the highest quality service. From aesthetic treatments to training programs, we offer
          professional support across a wide range of services. Our goal is to always help you achieve the best results.
        </p>
        <div className="servicesList">
          {loading ? (
            <p className="font-inter">Loading services...</p>
          ) : error ? (
            <p className="error-message font-inter">{error}</p>
          ) : (
            services.map((service) => (
              <ServiceComponent
                key={service.id.toString()}
                img={service.image}
                text={service.description}
                id={service.id}
                title={service.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}