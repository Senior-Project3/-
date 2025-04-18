"use client"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Heart, Award, MapPin, Mail, Phone } from "lucide-react"

export default function AboutUs() {
  // Color palette
  const colors = {
    white: "white",
    lightGray: "#f5f5f5",
    softBeige: "#f5f0e8",
    pastelPink: "#f8e1e7",
    darkText: "#333333",
    mediumText: "#555555",
    lightText: "#777777",
    accentPink: "#e4b3c0",
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="StyleHub luxury fashion"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="relative z-20 h-full flex flex-col justify-center max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-4 tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-light tracking-wide">
            Crafting timeless elegance since 2015
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Company Overview */}
        <section className="mb-24" style={{ backgroundColor: colors.white }}>
          <div className="flex flex-col items-start mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight">Who We Are</h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                Welcome to <span className="font-medium">لبّسني</span>, your destination for curated luxury fashion.
                Founded in 2015 with a vision to redefine style, we've evolved from a boutique concept to a recognized
                name in premium fashion across 12 countries.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Our collections blend timeless elegance with contemporary trends, carefully selected to help you express
                your unique identity. With over 50,000 discerning clients in our community, we continue to shape the
                landscape of modern luxury fashion.
              </p>
            </div>
            <div className="relative h-96 overflow-hidden rounded-lg shadow-sm">
              <Image
                src="https://media.istockphoto.com/id/1394033413/photo/luxury-fashion-store-front-in-modern-shopping-mall.jpg?s=612x612&w=0&k=20&c=MSrTLh8EAj7BnqEN-dLgKnBF5NpGgktUrwsYgz-zk6I="
                alt="StyleHub store"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-24 py-16 px-8 md:px-16 rounded-lg" style={{ backgroundColor: colors.pastelPink }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-10 tracking-tight">Our Mission</h2>
            <p className="text-2xl leading-relaxed italic text-gray-700 mb-10 font-light">
              "To elevate personal expression through thoughtfully crafted fashion that balances luxury, sustainability,
              and timeless design."
            </p>
            <div className="w-20 h-0.5 mx-auto bg-white"></div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-24">
          <div className="flex flex-col items-start mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight">Our Collections</h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm" style={{ backgroundColor: colors.lightGray }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Men's Collection</h3>
              <p className="text-gray-700 mb-6">
                Sophisticated essentials and statement pieces crafted for the modern gentleman.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Tailored suiting
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Premium knitwear
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Luxury casual
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Refined accessories
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm" style={{ backgroundColor: colors.softBeige }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Women's Collection</h3>
              <p className="text-gray-700 mb-6">
                Elegant designs that celebrate femininity with contemporary sensibility.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Designer dresses
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Curated separates
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Evening wear
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Statement jewelry
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm" style={{ backgroundColor: colors.lightGray }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Children's Collection</h3>
              <p className="text-gray-700 mb-6">
                Miniature luxury with the same attention to quality and design as our adult lines.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Special occasions
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Premium playwear
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  School essentials
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.accentPink }}></span>
                  Seasonal collections
                </li>
              </ul>
            </div>
         
            </div>
        
        </section>

        {/* Our Journey Timeline */}
        <section className="mb-24 px-4 py-16 rounded-lg" style={{ backgroundColor: colors.lightGray }}>
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight text-center">
              Our Journey
            </h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 h-full w-px bg-gray-300 transform md:-translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 2015 */}
              <div className="md:col-start-1 md:text-right relative pb-12">
                <div
                  className="hidden md:block absolute right-0 top-0 w-4 h-4 rounded-full transform translate-x-2"
                  style={{ backgroundColor: colors.accentPink }}
                ></div>
                <div className="md:pr-12">
                  <h3 className="text-2xl font-light text-gray-800 mb-3">2015</h3>
                  <p className="text-gray-700">
                    StyleHub was founded with a single boutique and a vision to redefine luxury fashion.
                  </p>
                </div>
              </div>
              <div className="md:col-start-2 hidden md:block"></div>

              {/* 2017 */}
              <div className="md:col-start-1 hidden md:block"></div>
              <div className="md:col-start-2 relative pb-12">
                <div
                  className="hidden md:block absolute left-0 top-0 w-4 h-4 rounded-full transform -translate-x-2"
                  style={{ backgroundColor: colors.accentPink }}
                ></div>
                <div className="md:pl-12">
                  <h3 className="text-2xl font-light text-gray-800 mb-3">2017</h3>
                  <p className="text-gray-700">Expanded to our flagship store and launched our e-commerce platform.</p>
                </div>
              </div>

              {/* 2019 */}
              <div className="md:col-start-1 md:text-right relative pb-12">
                <div
                  className="hidden md:block absolute right-0 top-0 w-4 h-4 rounded-full transform translate-x-2"
                  style={{ backgroundColor: colors.accentPink }}
                ></div>
                <div className="md:pr-12">
                  <h3 className="text-2xl font-light text-gray-800 mb-3">2019</h3>
                  <p className="text-gray-700">
                    Introduced our sustainable luxury line and expanded to international markets.
                  </p>
                </div>
              </div>
              <div className="md:col-start-2 hidden md:block"></div>

              {/* 2021 */}
              <div className="md:col-start-1 hidden md:block"></div>
              <div className="md:col-start-2 relative pb-12">
                <div
                  className="hidden md:block absolute left-0 top-0 w-4 h-4 rounded-full transform -translate-x-2"
                  style={{ backgroundColor: colors.accentPink }}
                ></div>
                <div className="md:pl-12">
                  <h3 className="text-2xl font-light text-gray-800 mb-3">2021</h3>
                  <p className="text-gray-700">
                    Celebrated our 50,000th client and launched our exclusive mobile shopping experience.
                  </p>
                </div>
              </div>

              {/* 2023 */}
              <div className="md:col-start-1 md:text-right relative">
                <div
                  className="hidden md:block absolute right-0 top-0 w-4 h-4 rounded-full transform translate-x-2"
                  style={{ backgroundColor: colors.accentPink }}
                ></div>
                <div className="md:pr-12">
                  <h3 className="text-2xl font-light text-gray-800 mb-3">2023</h3>
                  <p className="text-gray-700">
                    Established presence in 12 countries with 20 curated boutiques and a global online community.
                  </p>
                </div>
              </div>
              <div className="md:col-start-2 hidden md:block"></div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-24">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight text-center">
              Our Values
            </h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-lg" style={{ backgroundColor: colors.softBeige }}>
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                style={{ backgroundColor: colors.pastelPink }}
              >
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Client Experience</h3>
              <p className="text-gray-700">
                We create memorable experiences through personalized service and attention to detail at every
                touchpoint.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg" style={{ backgroundColor: colors.pastelPink }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-white">
                <Leaf className="h-7 w-7" style={{ color: colors.accentPink }} />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Conscious Luxury</h3>
              <p className="text-gray-700">
                We balance exceptional quality with responsible practices, creating luxury that respects our planet.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg" style={{ backgroundColor: colors.softBeige }}>
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                style={{ backgroundColor: colors.pastelPink }}
              >
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Uncompromising Quality</h3>
              <p className="text-gray-700">
                Every piece meets our exacting standards for materials, craftsmanship, and enduring design.
              </p>
            </div>
          </div>
        </section>

        {/* Sustainability Commitment */}
        <section className="mb-24">
          <div className="flex flex-col items-start mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight">Conscious Luxury</h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-sm order-2 md:order-1">
              <Image
                src="https://t3.ftcdn.net/jpg/03/05/92/84/240_F_305928424_visqTeQnMLvzfT3XBtDZWX9TNTlVLML6.jpg"
                alt="Sustainable practices"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-lg leading-relaxed mb-8 text-gray-700">
                At StyleHub, we believe luxury and responsibility go hand in hand. Our commitment to conscious fashion
                is reflected in every aspect of our business:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div
                    className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: colors.pastelPink }}
                  >
                    <span className="h-2 w-2 bg-white rounded-full"></span>
                  </div>
                  <span className="ml-4 text-gray-700">
                    Ethical partnerships with artisans and manufacturers who uphold fair labor practices
                  </span>
                </li>
                <li className="flex items-start">
                  <div
                    className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: colors.pastelPink }}
                  >
                    <span className="h-2 w-2 bg-white rounded-full"></span>
                  </div>
                  <span className="ml-4 text-gray-700">
                    Sustainable materials including organic textiles and recycled elements in 60% of our collections
                  </span>
                </li>
                <li className="flex items-start">
                  <div
                    className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: colors.pastelPink }}
                  >
                    <span className="h-2 w-2 bg-white rounded-full"></span>
                  </div>
                  <span className="ml-4 text-gray-700">
                    Minimal waste through thoughtful packaging and our garment renewal program
                  </span>
                </li>
                <li className="flex items-start">
                  <div
                    className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: colors.pastelPink }}
                  >
                    <span className="h-2 w-2 bg-white rounded-full"></span>
                  </div>
                  <span className="ml-4 text-gray-700">
                    Carbon neutrality target by 2025 through measured reduction and carefully selected offsets
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="mb-24 px-8 py-16 rounded-lg" style={{ backgroundColor: colors.lightGray }}>
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight text-center">Our Team</h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <p className="text-lg mb-12 text-gray-700 max-w-3xl mx-auto text-center">
            Meet the visionaries behind StyleHub who bring expertise, passion, and creativity to every collection.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Jane Smith",
                role: "Founder & Creative Director",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                name: "John Smith",
                role: "CEO",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
              },
              {
                name: "Sarah Johnson",
                role: "Design Director",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
              },
              {
                name: "Michael Chen",
                role: "Sustainability Director",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-sm">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Experience */}
        <section className="mb-24">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight text-center">
              The StyleHub Experience
            </h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-lg" style={{ backgroundColor: colors.softBeige }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800 border-b border-gray-200 pb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-700">
                Every StyleHub piece undergoes meticulous quality assessment. Our 30-day satisfaction guarantee ensures
                your complete confidence in every purchase.
              </p>
            </div>
            <div className="p-8 rounded-lg" style={{ backgroundColor: colors.pastelPink }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800 border-b border-gray-200 pb-3">
                White Glove Delivery
              </h3>
              <p className="text-gray-700">
                Experience our premium shipping service with careful packaging and expedited options to bring StyleHub's
                luxury to your doorstep promptly and perfectly.
              </p>
            </div>
            <div className="p-8 rounded-lg" style={{ backgroundColor: colors.pastelPink }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800 border-b border-gray-200 pb-3">
                Personal Stylists
              </h3>
              <p className="text-gray-700">
                Our dedicated style consultants are available seven days a week to provide personalized recommendations
                and assistance with your fashion journey.
              </p>
            </div>
            <div className="p-8 rounded-lg" style={{ backgroundColor: colors.softBeige }}>
              <h3 className="text-xl font-medium mb-4 text-gray-800 border-b border-gray-200 pb-3">
                Bespoke Experience
              </h3>
              <p className="text-gray-700">
                From remembering your preferences to customizing your shopping experience, we create a relationship that
                evolves with your style and needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="flex flex-col items-start mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-tight">Connect With Us</h2>
            <div className="w-20 h-0.5" style={{ backgroundColor: colors.accentPink }}></div>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-lg mb-10 text-gray-700">
                We welcome your inquiries, feedback, and collaboration opportunities. Our team is ready to assist you
                with any questions about our collections or services.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0 mt-1" style={{ color: colors.accentPink }} />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Global Headquarters</h3>
                    <p className="text-gray-700">123 Fashion Avenue, Style District, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0 mt-1" style={{ color: colors.accentPink }} />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-700">clientcare@stylehub.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0 mt-1" style={{ color: colors.accentPink }} />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-sm">
              <Image
                src="https://ps.w.org/wp-store-locator/assets/banner-772x250.jpg?rev=830722"
                alt="Store locations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="py-16 px-8 text-center rounded-lg" style={{ backgroundColor: colors.pastelPink }}>
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-800">Discover Our Latest Collection</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto font-light text-gray-700">
              Explore the new season's most coveted pieces, crafted with exceptional attention to detail.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-gray-800 font-medium px-10 py-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              Shop Now
            </Link>
          </div>
        </section>



        {/* Footer */}
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StyleHub. All rights reserved.
        </div>
      </div>
    </div>
  )
}
