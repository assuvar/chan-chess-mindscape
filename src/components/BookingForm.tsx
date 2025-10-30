import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  city: z.string().trim().min(2, 'City must be at least 2 characters').max(100, 'City name is too long'),
  whatsappNumber: z.string().trim().min(10, 'Please enter a valid WhatsApp number').max(15, 'Number is too long'),
  childDob: z.date({ required_error: 'Please select your child\'s date of birth' }),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email is too long'),
  device: z.enum(['Laptop', 'Desktop', 'Tablet', 'Smartphone'], { required_error: 'Please select a device' }),
  language: z.enum(['English', 'Tamil', 'Both'], { required_error: 'Please select a language' }),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const device = watch('device');
  const language = watch('language');
  const termsAccepted = watch('termsAccepted');

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    // Format the message for WhatsApp
    const message = `*New Demo Booking Request*

*Name:* ${data.name}
*City:* ${data.city}
*WhatsApp Number:* ${data.whatsappNumber}
*Child's Date of Birth:* ${format(data.childDob, 'PPP')}
*Email:* ${data.email}
*Device:* ${data.device}
*Preferred Language:* ${data.language}

Thank you for booking a demo with Chan Chess Club!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916379597908?text=${encodedMessage}`;

    try {
      window.open(whatsappUrl, '_blank');
      toast({
        title: 'Success!',
        description: 'Opening WhatsApp to send your booking request.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to open WhatsApp. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative py-24 bg-white overflow-hidden">
      <div className="container px-4 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: '#FF6B35' }}>
              Book Your Demo Now
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill in the details below and we'll get back to you on WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 md:p-12 rounded-2xl shadow-xl border-2 border-border">
            {/* Row 1: Name and City */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name here"
                  {...register('name')}
                  className="h-12"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-semibold">
                  Your City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="Enter your city name here"
                  {...register('city')}
                  className="h-12"
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: WhatsApp Number and Child's DOB */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber" className="text-base font-semibold">
                  Your WhatsApp Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="whatsappNumber"
                  placeholder="Enter number here"
                  {...register('whatsappNumber')}
                  className="h-12"
                />
                {errors.whatsappNumber && (
                  <p className="text-sm text-destructive">{errors.whatsappNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  Your Child's Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full h-12 justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Select your child's DoB here</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          setValue('childDob', selectedDate);
                        }
                      }}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.childDob && (
                  <p className="text-sm text-destructive">{errors.childDob.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address here"
                {...register('email')}
                className="h-12"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Row 4: Device and Language */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  Your Device For Classes <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={device} onValueChange={(value) => setValue('device', value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Laptop" id="laptop" />
                    <Label htmlFor="laptop" className="font-normal cursor-pointer">Laptop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Desktop" id="desktop" />
                    <Label htmlFor="desktop" className="font-normal cursor-pointer">Desktop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tablet" id="tablet" />
                    <Label htmlFor="tablet" className="font-normal cursor-pointer">Tablet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Smartphone" id="smartphone" />
                    <Label htmlFor="smartphone" className="font-normal cursor-pointer">Smartphone</Label>
                  </div>
                </RadioGroup>
                {errors.device && (
                  <p className="text-sm text-destructive">{errors.device.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  Comfortable Language For Class <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={language} onValueChange={(value) => setValue('language', value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="English" id="english" />
                    <Label htmlFor="english" className="font-normal cursor-pointer">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tamil" id="tamil" />
                    <Label htmlFor="tamil" className="font-normal cursor-pointer">Tamil</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Both" id="both" />
                    <Label htmlFor="both" className="font-normal cursor-pointer">Both</Label>
                  </div>
                </RadioGroup>
                {errors.language && (
                  <p className="text-sm text-destructive">{errors.language.message}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setValue('termsAccepted', checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="font-normal cursor-pointer">
                    <span className="text-red-500">* </span>
                    I agree to the Terms and Conditions
                  </Label>
                  {errors.termsAccepted && (
                    <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 h-14 text-base font-semibold"
              style={{ backgroundColor: '#FF6B35', color: 'white' }}
            >
              {isSubmitting ? 'Submitting...' : 'Book Now'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
