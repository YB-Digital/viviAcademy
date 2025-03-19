'use client'

import { useEffect, useState } from 'react';
import ServiceComponent from '../serviceComponent';

//style
import './ourServices.scss';

// Example service data structure
interface Service {
    id: number;
    name: string;
    description: string;
    image: string;
}

export default function OurServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://ybdigitalx.com/vivi_front/list_service.php')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setServices(data.map(service => ({
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    image: service.image ? `https://ybdigitalx.com/${service.image}` : 'defaultImagePath', // Replace 'defaultImagePath' with an actual path if necessary
                })));
            } else {
                setError('Failed to load services.');
            }
        })
        .catch(err => {
            console.error("Error fetching services:", err);
            setError("Error fetching data.");
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className='ourServices'>
            <h2 className='font-montserrat'>Our Services</h2>
            {loading ? (
                <p>Loading services...</p>
            ) : error ? (
                <p className='error'>{error}</p>
            ) : (
                <div className="servicesList">
                    {services.map((service) => (
                        <ServiceComponent key={service.id} img={service.image} text={service.description} id={service.id.toString()}  title={service.name}/>
                    ))}
                </div>
            )}
        </div>
    );
}
