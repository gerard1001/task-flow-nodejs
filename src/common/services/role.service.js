import Role from "../../database/models/role";

export default class RoleService {
  async createRole() {}

  async getRoles() {}

  async getRole(id) {
    return await Role.findByPk(id);
  }

  async updateRole() {}

  async deleteRole() {}
}
