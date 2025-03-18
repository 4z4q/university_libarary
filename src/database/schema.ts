import {
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE = pgEnum("role", ["ADMIN", "USER"]);
export const BORROW_STATUS = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  universityId: serial("university_id").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  role: ROLE("role").notNull().default("USER"),
  lastActivity: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
