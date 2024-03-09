const mongoose = require("mongoose")
const {DateTime} = require("luxon")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref: "User", required: true},
    to: {type: Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true, minLength: 1},
    datecreated: {type: Number, default: Date.now},
})

messageSchema.virtual("date_formatted").get(function () {
    return DateTime.fromMillis(this.datecreated).toLocaleString(DateTime.DATETIME_MED)
})

messageSchema.set("toJSON", {virtuals: true})

module.exports = mongoose.model("Message", messageSchema)