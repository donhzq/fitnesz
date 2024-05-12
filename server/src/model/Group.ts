import mongoose, { Document, Model, Schema } from 'mongoose';


interface IGroup extends Document {
    name: string;
    users: string[];
    trainer: string;
    quaue : string [];
}

const GroupSchema: Schema<IGroup> = new mongoose.Schema({
    name: { type: String, required: true },
    trainer: {type: String, required: true },
    users: {type : [String] , reqired : false},
    quaue: {type : [String] , reqired : false}
});

export const Group: Model<IGroup> = mongoose.model<IGroup>('Group', GroupSchema);