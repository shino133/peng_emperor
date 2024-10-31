import {
  int,
  mysqlTable,
  serial,
  tinyint,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

const varchar255 = () => varchar({ length: 255 });

export const usersTable = mysqlTable("users_table", {
  id: serial().primaryKey(),
  userName: varchar255().notNull(),
  password: varchar255().notNull(),
  fullName: varchar255().notNull(),
  avatarUrl: varchar255(),
  email: varchar255().notNull().unique(),
  role: varchar255().notNull().default("user"),
  status: tinyint().default(1),
  verifyEmailAt: timestamp(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
