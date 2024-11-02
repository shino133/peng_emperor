/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  int,
  tinyint,
  varchar,
  timestamp,
  MySqlColumn,
  index,
} from "drizzle-orm/mysql-core";

import { ColumnBaseConfig, ColumnDataType } from "drizzle-orm";

export const id = () => int().autoincrement().primaryKey();
export const idTinyint = () =>
  tinyint({ unsigned: true }).autoincrement().primaryKey();
export const varchar255 = () => varchar({ length: 255 });
export const timeNow = () => timestamp().defaultNow();

export const referenceTo = (
  referenceTableId: MySqlColumn<
    ColumnBaseConfig<ColumnDataType, string>,
    object
  >,
  type: string = "int",
  isNotNull: boolean | null = true
) => {
  const setType = () => {
    if (type == "int") {
      return int();
    } else if (type == "tinyint") {
      return tinyint({ unsigned: true });
    } else if (type == "varchar") {
      return varchar255();
    } else if (type == "timestamp") {
      return timestamp().defaultNow();
    } else {
      return int();
      // throw new Error(`Unsupported type: ${type}`);
    }
  };

  let column = setType().references(() => referenceTableId);
  if (isNotNull !== null || isNotNull !== false) {
    column = column.notNull();
  }
  return column;
};

export const setIndex = (
  table: Record<string, any>,
  columnsToIndex: Array<string>
) => {
  const indexList: { [key: string]: any } = {};

  for (const col in table) {
    if (columnsToIndex.includes(col)) {
      indexList[col] = index(`${col}_idx`).on(table[col]);
    }
  }

  return indexList;
};
