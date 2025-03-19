import Link from 'next/link';

//style
import './serviceComponent.scss';

interface ServiceComponentProps {
    img: string;
    text: string;
    id: string; // ID tipini number olarak güncelle
    title?: string;
}

export default function ServiceComponent(props: ServiceComponentProps) {
    // Default title if not provided
    const title = props.title || 'Default Title';

    // Function to truncate text if it exceeds a certain length
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <Link href={`/services/${props.id}`} className="serviceComponent">
            <img src={props.img} alt={'service image'} />
            <h3>{truncateText(title, 30)}</h3>
            <p className="font-inter">
                {truncateText(props.text, 30)}
            </p>
        </Link>
    );
}