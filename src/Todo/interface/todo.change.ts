import { Interface } from "readline";

export interface ITodoChange {
    readonly task: String
    readonly check: Boolean
    readonly dataCreate: String
    readonly dateSoon?: String
    readonly _id: String
}