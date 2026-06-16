import look1 from "@/assets/lookbook/look-1.jpg";
import look2 from "@/assets/lookbook/look-2.jpg";
import look3 from "@/assets/lookbook/look-3.jpg";
import look4 from "@/assets/lookbook/look-4.jpg";
import look5 from "@/assets/lookbook/look-5.jpg";
import look6 from "@/assets/lookbook/look-6.jpg";

export interface LookSpread {
  chapter: string;
  title: string;
  description: string;
  image: string;
  tall: boolean;
}

export const lookbook: LookSpread[] = [
  {
    chapter: "Chapter One",
    title: "By the River at Dawn",
    description:
      "A couple walks the ghats of Mayapur as first light spills over the water. She drapes a deep maroon silk; he wears unbleached cotton. Two threads of the same heritage.",
    image: look1,
    tall: false,
  },
  {
    chapter: "Chapter Two",
    title: "Among the Tulsi",
    description:
      "Soft beige and gold, caught in the morning hush of a garden. The gopi dress moves like breath — unhurried, graceful, devoted.",
    image: look2,
    tall: true,
  },
  {
    chapter: "Chapter Three",
    title: "The Courtyard Procession",
    description:
      "Colour against ancient stone. A line of handloom drapes catches the last gold of the day, each saree a different note in the same song.",
    image: look3,
    tall: false,
  },
  {
    chapter: "Chapter Four",
    title: "The Quiet Gentleman",
    description:
      "Maroon bagalbandhi over cream, in the half-light of an old wooden hall. Heritage menswear at its most considered.",
    image: look4,
    tall: true,
  },
  {
    chapter: "Chapter Five",
    title: "Festival of Lamps",
    description:
      "Dusk, a brass lamp, and gold silk glowing against the bokeh of distant lights. This is the festival collection in its element.",
    image: look5,
    tall: false,
  },
  {
    chapter: "Chapter Six",
    title: "The Border, Up Close",
    description:
      "A study in zari. Threads of gold meet deep crimson in the intricate border of a handwoven silk — the detail that defines a masterpiece.",
    image: look6,
    tall: true,
  },
];
