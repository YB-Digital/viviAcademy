"use client";

import { useEffect, useState } from "react";

//style
import "./filterComponent.scss";

interface Category {
    id: string;
    name: string;
}

interface FilterProps {
    setSelectedCategory: (category: string) => void;
}

export default function FilterComponent({ setSelectedCategory }: FilterProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<string>("All"); // Varsayılan olarak "All" seçili

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://ybdigitalx.com/vivi_backend/category_table.php");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: Category[] = await response.json();
                setCategories([{ id: "all", name: "All" }, ...data]); // "All" seçeneğini başa ekledik
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to fetch categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="filterComponent">
            <select onChange={handleCategoryChange} value={selected}>
                {loading ? (
                    <option disabled>Loading categories...</option>
                ) : error ? (
                    <option disabled>{error}</option>
                ) : categories.length > 0 ? (
                    categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No categories found</option>
                )}
            </select>
            <div className="dropdown-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M1 1L7 7L13 1" stroke="#7F7E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}