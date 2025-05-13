import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Anwesha J.",
    age:27,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Regular Customer",
    content:
      "91 degrees pads have been a game-changer for me. They're so comfortable I sometimes forget I'm wearing one!",
  },
  {
    name: "Michelle T.",
     age:21,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "New Customer",
    content:
      "After trying so many brands, I've finally found one that doesn't cause irritation. The breathable material makes all the difference.",
  },
  {
    name: "Subhshree L.",
     age:19,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Monthly Subscriber",
    content:
      "The overnight pads are amazing! I can finally sleep through the night without worrying about leaks. Highly recommend!",
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" >
      {testimonials.map((testimonial, index) => (
        <Card
          key={index}
          className="border border-white/20 bg-white/30 dark:bg-pink-950/20 backdrop-blur-md rounded-2xl shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]"
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="transition-transform duration-300 hover:scale-110">
              <Image
                alt={`${testimonial.name} avatar`}
                className="rounded-full"
                height={40}
                src={testimonial.avatar || "/combos.svg"}
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
            </div>
            <div className="grid gap-1">
              <CardTitle className="text-base text-pink-700 dark:text-pink-900">
                {testimonial.name}  <span className="text-sm font-normal text-gray-500 dark:text-gray-950">{testimonial.age}</span>
              </CardTitle>
              <div className="text-sm text-gray-500 dark:text-gray-950">
                {testimonial.title}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-gray-600 dark:text-gray-900">
              {testimonial.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
