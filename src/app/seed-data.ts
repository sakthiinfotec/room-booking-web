import { Room, User, Slot } from './types/index';

export const users: User[] = [
  {
    "name": "Annie",
    "email": "annie@coke.com",
    "title": "Product Manager",
    "company": "Coke"
  },
  {
    "name": "Bob",
    "email": "bob@coke.com",
    "title": "Support Specialist",
    "company": "Coke"
  },
  {
    "name": "John",
    "email": "john@pepsi.com",
    "title": "Field Engineer",
    "company": "Pepsi"
  },
  {
    "name": "Mike",
    "email": "mike@pepsi.com",
    "title": "Sales Manager",
    "company": "Pepsi"
  }
] as User[];

export const rooms: Room[] = [
  {
    "name": "C01",
    "company": "COKE"
  },
  {
    "name": "C02",
    "company": "COKE"
  },
  {
    "name": "C03",
    "company": "COKE"
  },
  {
    "name": "C04",
    "company": "COKE"
  },
  {
    "name": "C05",
    "company": "COKE"
  },
  {
    "name": "C06",
    "company": "COKE"
  },
  {
    "name": "C07",
    "company": "COKE"
  },
  {
    "name": "C08",
    "company": "COKE"
  },
  {
    "name": "C09",
    "company": "COKE"
  },
  {
    "name": "C10",
    "company": "COKE"
  },
  {
    "name": "P01",
    "company": "PEPSI"
  },
  {
    "name": "P02",
    "company": "PEPSI"
  },
  {
    "name": "P03",
    "company": "PEPSI"
  },
  {
    "name": "P04",
    "company": "PEPSI"
  },
  {
    "name": "P05",
    "company": "PEPSI"
  },
  {
    "name": "P06",
    "company": "PEPSI"
  },
  {
    "name": "P07",
    "company": "PEPSI"
  },
  {
    "name": "P08",
    "company": "PEPSI"
  },
  {
    "name": "P09",
    "company": "PEPSI"
  },
  {
    "name": "P10",
    "company": "PEPSI"
  }
] as Room[];

export const slots: Slot[] = [
  {
    "name": "06:00 AM - 07:00 AM"
  },
  {
    "name": "07:00 AM - 08:00 AM"
  },
  {
    "name": "08:00 AM - 09:00 AM"
  },
  {
    "name": "09:00 AM - 10:00 AM"
  },
  {
    "name": "10:00 AM - 11:00 AM"
  },
  {
    "name": "11:00 AM - 12:00 PM"
  },
  {
    "name": "12:00 PM - 01:00 PM"
  },
  {
    "name": "01:00 PM - 02:00 PM"
  },
  {
    "name": "02:00 PM - 03:00 PM"
  },
  {
    "name": "03:00 PM - 04:00 PM"
  },
  {
    "name": "04:00 PM - 05:00 PM"
  },
  {
    "name": "05:00 PM - 06:00 PM"
  }
] as Slot[];