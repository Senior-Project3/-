'use client';
import '../../app/css/css.Home.css';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      content: "LABESNI has completely transformed my wardrobe. The quality of their clothes is exceptional and the styles are always on trend.",
      author: "hamma jemai",
      role: "Regular Customer",
    },
    {
      id: 2,
      content: "I love shopping for my entire family at LABESNI. They have something for everyone, and their kids' collection is adorable!",
      author: "wiem hajri",
      role: "Regular Customer",
    },
    {
      id: 3,
      content: "The customer service at LABESNI is impeccable. They went above and beyond to help me find the perfect outfit for a special occasion.",
      author: "habiba ",
      role: "Fashion Enthusiast",
    },
  ];

  return (
    <section className="testimonial-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Don't just take our word for it—hear from our satisfied customers
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
            >
              <div className="testimonial-quote">"</div>
              <p className="testimonial-content">
                {testimonial.content}
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-image">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="testimonial-author-name">
                    {testimonial.author}
                  </p>
                  <p className="testimonial-author-title">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 