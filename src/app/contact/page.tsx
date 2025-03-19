import ContactSubmitPart from '@/component/contactSubmitPart'
import ContactInfoPart from '@/component/contactInfoPart'

//style
import './contact.scss'

export default function Page() {
    return (
        <div className='contactPage'>
            <div className="container">
                <ContactSubmitPart />
                <ContactInfoPart />
            </div>
        </div>
    )
}