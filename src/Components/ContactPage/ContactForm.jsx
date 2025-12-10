import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className="border border-[#424854] text-[#838894] rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <div className="text-4xl font-semibold text-shadow-white">
        Got an Idea? We&apos; we got the skills. Let&apos;s team up !!
      </div>
      <p className='font-medium text-[17px]'>Tell us more about yourself and what you&apos;re got in mind.</p>
      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
}

export default ContactForm
