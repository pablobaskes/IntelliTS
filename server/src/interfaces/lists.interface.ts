import { Document, SchemaDefinitionProperty } from "mongoose";

export interface List extends Document {
    userId: SchemaDefinitionProperty<string>;
    name: string;
    description?: string;
    type: "system" | "user";
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ListItem extends Document {
    listId: SchemaDefinitionProperty<string>;
    movieId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
