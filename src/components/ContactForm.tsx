import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'

const ContactForm = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Input placeholder='Name' />
      <Input placeholder='Email' />
      <Textarea placeholder='Message' />
      <Button>Send <Send className='w-4 h-4' /></Button>
    </div>
  )
}

export default ContactForm