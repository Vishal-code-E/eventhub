"use client";

import ContactForm from "@/components/contactform";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Content Wrapper */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold mb-6 text-center">Get in Touch</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
            Have questions about upcoming events, clubs, or collaborations at Raghu
            Engineering College? Reach out and we’ll get back to you as soon as possible.
          </p>

          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-400">eventhub@raghu.edu.in</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-400">+91 98765 43210</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-400">Raghu Engineering College, Visakhapatnam</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
