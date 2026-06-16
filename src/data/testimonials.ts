import look1 from "@/assets/lookbook/look-1.jpg";
import look2 from "@/assets/lookbook/look-2.jpg";
import look5 from "@/assets/lookbook/look-5.jpg";
import festival from "@/assets/collections/festival.jpg";
import sarees from "@/assets/collections/handloom-sarees.jpg";
import gopi from "@/assets/collections/gopi-dresses.jpg";

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  image: string;
  product: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Radharani Devi",
    location: "Mayapur, India",
    quote:
      "My gopi dress from Jagannath Handloom feels like it was made just for me. The fabric breathes, the colours are pure, and it has only grown softer with time.",
    image: gopi,
    product: "Radha Cotton Gopi Set",
  },
  {
    name: "Ananda Krishna Das",
    location: "London, United Kingdom",
    quote:
      "I ordered a dhuti and kurta for a festival and they arrived perfectly within ten days. The craftsmanship is on another level — truly heritage quality.",
    image: look1,
    product: "Gouranga Handloom Dhuti",
  },
  {
    name: "Sita Patel",
    location: "Toronto, Canada",
    quote:
      "The maroon silk saree is the most beautiful drape I own. People stop me to ask where it is from. It carries the soul of Mayapur in every fold.",
    image: sarees,
    product: "Mayapur Handloom Saree",
  },
  {
    name: "Govinda Sharma",
    location: "Sydney, Australia",
    quote:
      "Their bagalbandhi jacket made my wedding unforgettable. The gold work is exquisite and the fit was impeccable. Worth every rupee.",
    image: festival,
    product: "Maharaja Bagalbandhi Jacket",
  },
  {
    name: "Lakshmi Iyer",
    location: "Singapore",
    quote:
      "Worldwide courier was seamless. From the first WhatsApp message to delivery, I felt cared for. This is how heritage shopping should feel.",
    image: look2,
    product: "Tulsi Festive Gopi Set",
  },
  {
    name: "Jagannath Prabhu",
    location: "Mayapur, India",
    quote:
      "I have shopped here for years. The family behind Jagannath Handloom treats every customer like their own. Authentic, honest, and beautiful.",
    image: look5,
    product: "Utsav Festival Saree",
  },
];
