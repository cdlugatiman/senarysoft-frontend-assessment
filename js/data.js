/*
 * Mock data for the User Management page.
 * Kept separate from application logic (js/app.js).
 * Dates are ISO strings (YYYY-MM-DD) and are formatted as MM/DD/YYYY for display.
 * A disabled user has enabledDate: null (shown as an em dash).
 */
"use strict";

const GROUPS = ["Admin", "Licensed", "Forward", "Recruiter"];
const DIVISIONS = ["NY", "CA", "TX", "FL", "IL"];
const REGIONS = ["Corporate", "West", "South", "East"];
const USER_TYPES = ["Employee", "Contractor", "Partner"];
const STATUSES = ["Active", "Disabled"];

// The first 10 rows mirror the reference screenshot; the rest give pagination and filters more to work with.
const MOCK_USERS = [
  { id: "0513", firstName: "John",   lastName: "Doe",     email: "JohnDoe@Email.com",       group: "Admin",     division: "NY", region: "Corporate", userType: "Employee",   submittedDate: "2025-05-01", enabledDate: "2025-05-01", status: "Active" },
  { id: "1681", firstName: "Mike",   lastName: "Harry",   email: "Mikeharry@Email.com",     group: "Admin",     division: "NY", region: "Corporate", userType: "Employee",   submittedDate: "2025-05-02", enabledDate: "2025-05-05", status: "Active" },
  { id: "0123", firstName: "Jess",   lastName: "Lambert", email: "JLambert91@Email.com",    group: "Licensed",  division: "NY", region: "Corporate", userType: "Partner",    submittedDate: "2025-05-01", enabledDate: "2025-05-01", status: "Active" },
  { id: "8415", firstName: "Yor",    lastName: "Pilan",   email: "YorP@Email.com",          group: "Forward",   division: "NY", region: "Corporate", userType: "Contractor", submittedDate: "2025-05-15", enabledDate: "2025-05-15", status: "Active" },
  { id: "6512", firstName: "Kim",    lastName: "Jeun",    email: "KimJ99@Email.com",        group: "Recruiter", division: "NY", region: "Corporate", userType: "Employee",   submittedDate: "2025-05-15", enabledDate: "2025-05-16", status: "Active" },
  { id: "1874", firstName: "Harry",  lastName: "Styles",  email: "HarrySS@Email.com",       group: "Forward",   division: "NY", region: "Corporate", userType: "Contractor", submittedDate: "2025-06-01", enabledDate: "2025-06-01", status: "Active" },
  { id: "6301", firstName: "Fulgur", lastName: "Metane",  email: "FulgurMet@Email.com",     group: "Forward",   division: "NY", region: "Corporate", userType: "Partner",    submittedDate: "2025-06-02", enabledDate: null,         status: "Disabled" },
  { id: "4328", firstName: "Sarah",  lastName: "Chen",    email: "SarahC@Email.com",        group: "Admin",     division: "CA", region: "West",      userType: "Employee",   submittedDate: "2025-06-10", enabledDate: "2025-06-10", status: "Active" },
  { id: "9987", firstName: "David",  lastName: "Park",    email: "DavidP@Email.com",        group: "Licensed",  division: "CA", region: "West",      userType: "Partner",    submittedDate: "2025-06-12", enabledDate: "2025-06-12", status: "Active" },
  { id: "7764", firstName: "Maria",  lastName: "Santos",  email: "MariaS@Email.com",        group: "Recruiter", division: "TX", region: "South",     userType: "Employee",   submittedDate: "2025-06-15", enabledDate: "2025-06-15", status: "Active" },
  { id: "2045", firstName: "Liam",   lastName: "Carter",  email: "LiamC@Email.com",         group: "Licensed",  division: "TX", region: "South",     userType: "Contractor", submittedDate: "2025-06-18", enabledDate: "2025-06-20", status: "Active" },
  { id: "3390", firstName: "Olivia", lastName: "Nguyen",  email: "OliviaN@Email.com",       group: "Admin",     division: "CA", region: "West",      userType: "Employee",   submittedDate: "2025-06-21", enabledDate: null,         status: "Disabled" },
  { id: "5521", firstName: "Ethan",  lastName: "Brooks",  email: "EthanB@Email.com",        group: "Forward",   division: "FL", region: "East",      userType: "Partner",    submittedDate: "2025-06-24", enabledDate: "2025-06-25", status: "Active" },
  { id: "7102", firstName: "Sophia", lastName: "Reyes",   email: "SophiaR@Email.com",       group: "Recruiter", division: "FL", region: "East",      userType: "Employee",   submittedDate: "2025-07-01", enabledDate: "2025-07-01", status: "Active" },
  { id: "8836", firstName: "Noah",   lastName: "Patel",   email: "NoahP@Email.com",         group: "Licensed",  division: "IL", region: "Corporate", userType: "Contractor", submittedDate: "2025-07-03", enabledDate: "2025-07-07", status: "Active" },
  { id: "4417", firstName: "Emma",   lastName: "Walker",  email: "EmmaW@Email.com",         group: "Admin",     division: "IL", region: "Corporate", userType: "Employee",   submittedDate: "2025-07-08", enabledDate: "2025-07-08", status: "Active" },
  { id: "9250", firstName: "Lucas",  lastName: "Kim",     email: "LucasK@Email.com",        group: "Forward",   division: "TX", region: "South",     userType: "Partner",    submittedDate: "2025-07-10", enabledDate: null,         status: "Disabled" },
  { id: "6678", firstName: "Ava",    lastName: "Morales", email: "AvaM@Email.com",          group: "Recruiter", division: "CA", region: "West",      userType: "Contractor", submittedDate: "2025-07-14", enabledDate: "2025-07-15", status: "Active" },
  { id: "3184", firstName: "Mason",  lastName: "Turner",  email: "MasonT@Email.com",        group: "Licensed",  division: "FL", region: "East",      userType: "Employee",   submittedDate: "2025-07-17", enabledDate: "2025-07-17", status: "Active" },
  { id: "1109", firstName: "Isabel", lastName: "Foster",  email: "IsabelF@Email.com",       group: "Admin",     division: "NY", region: "Corporate", userType: "Partner",    submittedDate: "2025-07-21", enabledDate: "2025-07-22", status: "Active" }
];
