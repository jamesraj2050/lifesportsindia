import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  emailId: text("email_id").primaryKey(),
  name: text("name"),
  message: text("message"),
  subscription: text("subscription", { enum: ["Yes", "No"] })
    .notNull()
    .default("No"),
  unsubscribeToken: text("unsubscribe_token").unique(),
  subscribedAt: integer("subscribed_at", { mode: "timestamp" }),
  unsubscribedAt: integer("unsubscribed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: text("id").primaryKey(),
  emailId: text("email_id")
    .notNull()
    .references(() => contacts.emailId),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Contact = typeof contacts.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
