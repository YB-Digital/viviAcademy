import FaqQuestionComponent from '@/component/faqQuestionComponent'

//style
import './faq.scss'

export default function Page() {
    return (
        <div className='faqPage'>
            <div className="container">
                <h2 className='font-montserrat'>
                    Frequently Asked Questions
                </h2>
                <p className='font-inter'>
                    Here, you can quickly access the most frequently asked questions about our beauty center and the services we offer.
                </p>

                <div className="faqQuestions">
                    <FaqQuestionComponent />
                    <FaqQuestionComponent />
                    <FaqQuestionComponent />
                    <FaqQuestionComponent />
                    <FaqQuestionComponent />
                </div>
            </div>
        </div>
    )
}
