import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What's the ideal age to start learning chess?",
    answer: "Children as young as 5 can start learning chess basics. At this age, they begin to understand patterns, logic, and planning — perfect for developing foundational skills early.",
  },
  {
    question: "Who will be coaching my child?",
    answer: "All sessions are handled by certified chess coaches with years of experience in mentoring students across beginner, intermediate, and advanced levels.",
  },
  {
    question: "How do I know my child's level of chess knowledge?",
    answer: "Our FREE Demo Session includes a brief assessment to measure your child's understanding of chess. Based on this, we recommend the right course level for effective learning.",
  },
  {
    question: "How important is having the right chess coach for my child?",
    answer: "A good chess coach helps children think strategically and creatively while building discipline, patience, and sportsmanship — all crucial for long-term growth.",
  },
  {
    question: "How soon can my child start participating in tournaments?",
    answer: "After gaining confidence with foundational strategies and practice games, most students start participating in tournaments within 3 to 6 months.",
  },
  {
    question: "Can I track my child's progress?",
    answer: "Yes, parents receive regular progress reports and performance breakdowns after every evaluation phase, helping them track their child's chess growth clearly.",
  },
  {
    question: "Do you provide online and offline chess classes?",
    answer: "Yes. We provide both online and offline classes depending on your location and convenience, ensuring the same quality of coaching in both formats.",
  },
  {
    question: "What makes Chan Chess Club different?",
    answer: "We blend strategy, mentorship, and performance tracking. Our structured learning approach ensures every student becomes a confident, tournament-ready player.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            FAQs
          </h2>
          <p className="text-lg text-gray-600">
            Frequently Asked Questions
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md data-[state=open]:bg-gradient-to-br data-[state=open]:from-purple-50 data-[state=open]:to-purple-100/50 data-[state=open]:shadow-lg data-[state=open]:border-purple-200"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                  <span className="flex-1 font-semibold text-gray-900 group-data-[state=open]:text-purple-900 transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
