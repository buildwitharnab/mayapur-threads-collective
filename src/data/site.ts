export const SITE = {
  name: "Jagannath Handloom",
  tagline: "Heritage Woven Into Every Thread",
  phone: "+91 85973 84394",
  whatsappNumber: "918597384394",
  address: {
    line1: "Shop No. 18, Prabhupad Market",
    line2: "Mayapur, West Bengal, India",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Prabhupad+Market+Mayapur",
} as const;

export const WHATSAPP_MESSAGE = `Welcome to Jagannath Handloom 🌸

✨ Premium Gopi Dresses & Handloom Sarees for Matajis
✨ Dhuti, Kurtas & Bagalbandhi for Men
✨ Traditional Handloom & Khadi Collections

📍 Mayapur Prabhupad Market, Shop No. 18
📲 WhatsApp: +91 85973 84394
🚚 Worldwide Courier Available 🌍

Thank you for visiting Jagannath Handloom 🙏

I would like to know more about your collections.`;

export function whatsappLink(extra?: string) {
  const text = extra ? `${WHATSAPP_MESSAGE}\n\n${extra}` : WHATSAPP_MESSAGE;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
