import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

export default function WhatsAppInviteCard() {
  return (
    <Card className="w-full flex bg-transparent  items-center justify-between overflow-hidden p-4">
      {/* Left Text Section */}
      <div className="flex-1 text-left">
        <h2 className="text-xl md:text-xl font-bold text-pink-700 dark:text-pink-100 flex items-center gap-2 mb-2">
          <MessageCircleMore className="w-5 h-5 text-pink-500" />
          Join Our WhatsApp Community
        </h2>
        <p className="text-gray-700 dark:text-gray-100 mb-2 max-w-md">
     join a growing community for sustainable living. Get early updates, offers, and tips.
        </p>
        <Button
          variant="default"
          className="bg-pink-600 hover:bg-pink-700 text-white"
          asChild
        >
          <a
            href="https://chat.whatsapp.com/91DegreesCommunity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Now
          </a>
        </Button>
      </div>

      {/* QR Code Section */}
      <div className="mt-6 md:mt-0 md:ml-8">
        <Image
          src="/WhatsAppQR.jpeg" // Replace with your actual QR image path in /public
          alt="Join WhatsApp Group QR Code"
          width={150}
          height={150}
          className="rounded-lg shadow-md"
        />
      </div>
    </Card>
  );
}
