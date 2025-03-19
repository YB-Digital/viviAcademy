import Image from "next/image";
import Link from "next/link";

//style
import "./courseComponent.scss";

//image
import review from "@/image/reviewIcon.svg";

interface CourseProps {
  course: {
    id: number;
    name: string;
    shortDesc: string;
    image: string;
    price: number;
  };
}

export default function CourseComponent({ course }: CourseProps) {
  const handleBuyNow = () => {
    let shoppingCart = JSON.parse(localStorage.getItem("shopping") || "[]");

    const isExist = shoppingCart.find((item: any) => item.id === course.id);
    if (!isExist) {
      shoppingCart.push(course);
      localStorage.setItem("shopping", JSON.stringify(shoppingCart));

      // 🚀 **Sepet güncellendiğini duyur (sayfa yenilemeye gerek kalmadan!)**
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      alert("This course is already in your shopping cart.");
    }
  };


  return (
    <div className="courseComponent">
      <div className="image">
        <img src={course.image} alt={course.name} />
      </div>
      <h3 className="font-inter">
        {course.name.length > 200
          ? `${course.name.substring(0, 20)}...`
          : course.name}
      </h3>
      <p className="font-inter">
        {course.shortDesc.length > 30
          ? `${course.shortDesc.substring(0, 30)}...`
          : course.shortDesc}
      </p>
      <div className="priceReview">
        <div className="review">
          <Image src={review} alt="review" />
          <Image src={review} alt="review" />
        </div>
        <p className="price font-inter">€{course.price}</p>
      </div>
      <button className="font-inter" onClick={handleBuyNow}>
        Buy Now
      </button>
      <Link href={`/courses/${course.id}`} className="button font-inter">
        View Details
      </Link>
    </div>
  );
}
