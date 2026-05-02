// components/ngo/ngo-event-card.jsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EventCard({ title, date, location, description }) {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <CardDescription>{date}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-semibold">Location</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Description</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
