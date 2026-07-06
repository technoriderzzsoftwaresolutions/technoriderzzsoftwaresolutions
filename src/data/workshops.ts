export interface Workshop {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  venue: string;
  date: string; // ISO String representation of event date
  seatsLeft: number;
  registrationLink: string;
  category: string;
}

export const workshops: Workshop[] = [
  {
    id: "w1",
    title: "AI & Deep Learning Hands-on Seminar",
    speaker: "Dr. K. Srinivas",
    speakerTitle: "Principal AI Research Architect",
    venue: "CBIT campus, Auditorium-1, Hyderabad",
    date: "2026-07-20T10:00:00Z", // Future date (July 20, 2026)
    seatsLeft: 14,
    registrationLink: "/contact?subject=Workshop&title=AI_Seminar",
    category: "AI / Deep Learning"
  },
  {
    id: "w2",
    title: "IoT Smart Embedded Kits & Edge Lab",
    speaker: "Mr. G. Sai Kiran",
    speakerTitle: "Embedded Hardware Lead, Techno Riderzz",
    venue: "Techno Riderzz Lab, Moosarambagh, Hyd",
    date: "2026-07-28T09:30:00Z", // Future date (July 28, 2026)
    seatsLeft: 8,
    registrationLink: "/contact?subject=Workshop&title=IoT_Lab",
    category: "Embedded IoT"
  },
  {
    id: "w3",
    title: "UML Architecture & SRS Drafting Bootcamp",
    speaker: "Mrs. Shailaja Reddy",
    speakerTitle: "Director of Academic Guidance",
    venue: "Online Webinar Portal (Zoom)",
    date: "2026-08-05T14:00:00Z", // Future date (August 5, 2026)
    seatsLeft: 45,
    registrationLink: "/contact?subject=Workshop&title=SRS_Bootcamp",
    category: "Project Architecture"
  }
];
