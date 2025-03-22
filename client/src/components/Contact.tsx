import { useInView } from "@/hooks/useInView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters long" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" })
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { ref: contactInfoRef, isVisible: isContactInfoVisible } = useInView();
  const { ref: contactFormRef, isVisible: isContactFormVisible } = useInView();
  
  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Contact form submission
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormValues) => {
    mutate(data);
  };
  
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Get In Touch</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Interested in working together? Feel free to contact me for any project or collaboration opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div 
            ref={contactInfoRef}
            className={`lg:w-1/3 transition-all duration-1000 transform ${
              isContactInfoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-slate-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-6">Contact Information</h3>
              
              <div className="flex items-start mb-6">
                <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Email</h4>
                  <a href="mailto:contact@example.com" className="text-indigo-600 hover:underline">contact@example.com</a>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-indigo-600 hover:underline">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Location</h4>
                  <p className="text-slate-600">Moscow, Russia</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                  <i className="fas fa-globe"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">Social Profiles</h4>
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors">
                      <i className="fab fa-github text-xl"></i>
                    </a>
                    <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors">
                      <i className="fab fa-codepen text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={contactFormRef}
            className={`lg:w-2/3 transition-all duration-1000 transform ${
              isContactFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-slate-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-6">Send Me A Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email" 
                              type="email" 
                              {...field} 
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Message subject" 
                            {...field} 
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            {...field} 
                            rows={5}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
