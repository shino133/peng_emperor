import { mysqlTable, tinyint, text, timestamp } from "drizzle-orm/mysql-core";

import {
  id,
  idTinyint,
  varchar255,
  timeNow,
  referenceTo,
  setIndex,
} from "~/features/drizzle/Supports";

// Constant Table
// ----------------------------------------------------------------
export const permissionsTable = mysqlTable("permissions_table", {
  id: idTinyint(),
  key: varchar255().unique().notNull(),
  description: text(),
  createdAt: timeNow(),
});

export const rolesTable = mysqlTable("roles_table", {
  id: idTinyint(),
  key: varchar255().unique().notNull(),
  description: text(),
  createdAt: timeNow(),
});

export const statusTable = mysqlTable("status_table", {
  id: idTinyint(),
  key: varchar255().unique().notNull(),
  description: text(),
  createdAt: timeNow(),
});

export const mediaTypeTable = mysqlTable("media_type_table", {
  id: idTinyint(),
  key: varchar255().unique().notNull(),
  description: text(),
  createdAt: timeNow(),
});

// Normal table
// ----------------------------------------------------------------
export const usersTable = mysqlTable(
  "users_table",
  {
    id: id(),
    userName: varchar255().notNull().unique(),
    password: varchar255().notNull(),
    fullName: varchar255().notNull(),
    email: varchar255().notNull().unique(),
    avatarUrl: varchar255(),
    role: tinyint(),
    verifyEmailAt: timestamp(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status", "role"])
);

export const userProfilesTable = mysqlTable(
  "user_profiles_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    bannerUrl: varchar255(),
    location: varchar255(),
    website: varchar255(),
    socialAccounts: text(),
    bio: text(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status"])
);

export const categoriesTable = mysqlTable(
  "categories_table",
  {
    id: id(),
    name: varchar255().unique().notNull(),
    description: text(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status"])
);

export const postsTable = mysqlTable(
  "posts_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    title: varchar255().notNull(),
    content: text(),
    mediaType: tinyint(),
    mediaUrl: varchar255(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status", "mediaType"])
);

export const commentsTable = mysqlTable(
  "comments_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    content: text(),
    mediaType: tinyint(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status", "mediaType"])
);

export const eventsTable = mysqlTable(
  "events_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    title: varchar255().notNull(),
    bannerUrl: varchar255(),
    content: text(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status"])
);

export const groupsTable = mysqlTable(
  "groups_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    name: varchar255().notNull(),
    bannerUrl: varchar255(),
    bio: text(),
    status: tinyint(),
    createdAt: timeNow(),
    updatedAt: timeNow(),
  },
  (table) => setIndex(table, ["status"])
);

// Relationship Table
// ----------------------------------------------------------------
export const rolePermissionsTable = mysqlTable(
  "role_permissions_table",
  {
    id: id(),
    roleId: referenceTo(rolesTable.id, "tinyint"),
    permissionId: referenceTo(permissionsTable.id, "tinyint"),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["roleId", "permissionId"])
);

export const userPermissionsTable = mysqlTable(
  "user_permissions_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    permissionId: referenceTo(permissionsTable.id, "tinyint"),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["userId", "permissionId"])
);

export const userFriendshipTable = mysqlTable(
  "user_friendship_table",
  {
    id: id(),
    userId1: referenceTo(usersTable.id),
    userId2: referenceTo(usersTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["userId1", "userId2"])
);

export const userFollowsTable = mysqlTable(
  "user_follows_table",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    followerId: referenceTo(usersTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["userId", "followerId"])
);

export const userWishlistTable = mysqlTable(
  "user_wishlist",
  {
    id: id(),
    userId: referenceTo(usersTable.id),
    categoryId: referenceTo(categoriesTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["userId", "categoryId"])
);

export const postLikesTable = mysqlTable(
  "post_likes_table",
  {
    id: id(),
    postId: referenceTo(postsTable.id),
    userId: referenceTo(usersTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["postId", "userId"])
);

export const postCommentsTable = mysqlTable(
  "post_comments_table",
  {
    id: id(),
    postId: referenceTo(postsTable.id),
    commentsId: referenceTo(commentsTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["postId", "commentsId"])
);

export const postCategoriesTable = mysqlTable(
  "post_categories_table",
  {
    id: id(),
    postId: referenceTo(postsTable.id),
    categoryId: referenceTo(categoriesTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["postId", "categoryId"])
);

export const commentLikesTable = mysqlTable(
  "comment_likes_table",
  {
    id: id(),
    commentId: referenceTo(commentsTable.id),
    userId: referenceTo(usersTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["commentId", "userId"])
);

export const commentRepliesTable = mysqlTable(
  "comment_replies_table",
  {
    id: id(),
    commentId: referenceTo(commentsTable.id),
    replyId: referenceTo(commentsTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["commentId", "replyId"])
);

export const eventFollowsTable = mysqlTable(
  "event_follows_table",
  {
    id: id(),
    eventId: referenceTo(eventsTable.id),
    userId: referenceTo(usersTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["eventId", "userId"])
);

export const groupMembersTable = mysqlTable(
  "group_members_table",
  {
    id: id(),
    groupId: referenceTo(groupsTable.id),
    userId: referenceTo(usersTable.id),
    createdAt: timeNow(),
  },
  (table) => setIndex(table, ["groupId", "userId"])
);
