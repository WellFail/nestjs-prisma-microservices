# Migration `20200427184337-init`

This migration has been generated by Marc Stammerjohann at 4/27/2020, 6:43:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

CREATE TABLE "blog"."User" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text  NOT NULL ,
    "firstname" text   ,
    "id" text  NOT NULL ,
    "lastname" text   ,
    "password" text  NOT NULL ,
    "role" "Role" NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "blog"."Post" (
    "authorId" text   ,
    "content" text   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "published" boolean  NOT NULL ,
    "title" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "blog"."User"("email")

ALTER TABLE "blog"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "blog"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200427184337-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,36 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("POSTGRESQL_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  email     String   @unique
+  password  String
+  firstname String?
+  lastname  String?
+  posts     Post[]
+  role      Role
+}
+
+model Post {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  published Boolean
+  title     String
+  content   String?
+  author    User?    @relation(fields: [authorId], references: [id])
+  authorId  String?
+}
+
+enum Role {
+  ADMIN
+  USER
+}
```


