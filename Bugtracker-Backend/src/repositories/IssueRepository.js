const Issue = require("../models/IssueModel");
const ObjectId = require("mongoose").Types.ObjectId

class IssueRepository {
    static async getAll(filters = {}, limit = 10, skip = 0) {
        return await Issue.find(filters)
            .limit(limit)
            .skip(skip);
    }

    static async getById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Issue.findOne({ _id: id })
    }

    static async countWithFilters(filters = {}) {
        return await Issue.countDocuments(filters);
    }

    static async create(IssueData) {
        const newIssue = new Issue(IssueData);
        return await newIssue.save();
    }

    static async deleteById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Issue.deleteOne({ _id: id })
    }

    static async updateById(id, updateData) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Issue.updateOne({ _id: id }, updateData)
    }
}

module.exports = { IssueRepository }