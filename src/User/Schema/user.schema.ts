import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tokens: [String]
})


UserSchema.methods.addRefreshToken = async function (refToken: string): Promise<void> {
    const tokens = [...this.tokens];
    tokens.push(refToken);
    this.tokens = tokens;
    await this.save();
};

UserSchema.methods.removeToken = async function (refToken: string): Promise<void> {
    const tokens = [...this.tokens];
    this.tokens = tokens.filter(token => token.toString() !== refToken.toString());
    await this.save();
}

UserSchema.methods.removeAllToken = async function () {
    this.tokens = [];
    await this.save();
}

UserSchema.methods.checkToken = function (refToken: string): Boolean {
    const tokens = [...this.tokens];
    const check = tokens.find(token => token.toString() === refToken.toString())
    return check ? true : false;
}