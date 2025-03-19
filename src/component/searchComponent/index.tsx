import Image from "next/image";
import { useState } from "react";

//style
import "./searchComponent.scss";

//image
import search from "@/image/search.svg";

interface SearchComponentProps {
  setSearchTerm: (term: string) => void;
}

export default function SearchComponent({ setSearchTerm }: SearchComponentProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value); // Arama terimini üst bileşene iletir
  };

  return (
    <div className="searchComponent">
      <input
        type="text"
        placeholder="Search for courses"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Image src={search} alt={"search"} />
    </div>
  );
}