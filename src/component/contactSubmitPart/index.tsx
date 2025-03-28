'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import InputComponent from '../inputComponent';
import TextAreaComponent from '../textAreaComponent';
import Link from 'next/link';

// style
import './contactSubmitPart.scss';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function ContactSubmitPart() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');

        // No reCAPTCHA check anymore
        try {
            const response = await fetch("https://ybdigitalx.com/vivi_front/contact.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Directly send form data without reCAPTCHA
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            setResponseMessage('Form submitted successfully!');
        } catch (error) {
            console.error("Form submission error:", error);
            setResponseMessage('Error submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='contactSubmitPart'>
            <form onSubmit={handleSubmit}>
                <h2 className='font-montserrat'>
                    Get in Touch
                </h2>
                <p className='font-inter'>
                    Do you have any questions about our aesthetic and beauty services? Feel free to contact us; we’d be delighted to assist you!
                </p>

                <InputComponent
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <InputComponent
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextAreaComponent
                    name="message"
                    placeholder="Type your message here"
                    value={formData.message}
                    onChange={handleChange}
                />

                <div className="privacy">
                    <span className='font-inter'>
                        I consent to the processing of my personal data for the purpose of handling my request. For more information, please refer to our
                    </span>
                    <Link href={'/privacy-policy'} className='font-inter'>Privacy Policy</Link>
                </div>

                <div className="button">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

                {responseMessage && (
                    <p className={`message ${responseMessage.includes('Error') ? 'error' : 'success'}`}>
                        {responseMessage}
                    </p>
                )}
            </form>
        </div>
    );
}