const Group = require("../models/Group");
const CustomError = require("../helpers/CustomError");
const userService = require("../services/UserServices");

class UsersService {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.generateGroupCode = this.generateGroupCode.bind(this);
  }

  async createGroup(data) {
    //create user
    let user = await this.createUser(data.username)

    //get group code
    let groupCode = await this.generateGroupCode()

    //create group
    const group = new Group({
      creator: user._id,
      name: data.groupName,
      code: groupCode,
      members: [user._id]
    });

    let g = await group.save();

    console.log(g);

    return {
      groupId: g._id,
      creator: g.creator,
      code: g.code
    };
  }

  async joinGroup(data) {
    //check if group code exists
    let user = this.createUser(data.username)

    //check if memeber name already exits in group
    const group = await Group.findOne({ code: data.code });

    //add user to group to memebers array
    group.memebers.push(user._id)
    await group.save();
    return {
      groupId: _id,
      code: group.code
    };
  }

  async leaveGroup() {
    //check if user exist in members array
    //remove id from array of memebers
    //
    return await Group.find({});
  }

  async deleteGroup(groupId) {
    return await Group.findOneAndRemove({ _id: groupId });
  }



  async generateGroupCode(userId) {
    //generate 6 code
    var chars = 'acdefhiklmnoqrstuvwxyz0123456789ABCDEFGHIJKLMNOP'.split('');
    var result = '';
    for (var i = 0; i < 6; i++) {
      var x = Math.floor(Math.random() * chars.length);
      result += chars[x];
    } 
    //check if code exhist else generate again
    return result;
  }


  async checkIfUserExist(userId) {
    const group = await Group.findOne({ _id: groupId });

    return group;
  }

  async getGroup(groupId) {
    const group = await Group.findOne({ _id: groupId });

    return group;
  }

  async createUser(username) {
    const user = await userService.createUser(username)
    return user;
  }

}
module.exports = new UsersService();
