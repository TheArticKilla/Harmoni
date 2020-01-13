module.exports = models => {
  const Permissions_per_role = models.Permissions_per_role;
  return {
    permissions_per_roleGetAll: async () =>
      Permissions_per_role.findAll().then(
        permissions_per_role => permissions_per_role
      ),

    permissions_per_roleGetOne: async (roleID, permissionID) =>
      Permissions_per_role.findOne({
        where: { roleID: roleID, permissionID: permissionID }
      }).then(permissions_per_role => permissions_per_role),

      permissions_per_roleGetOne: async (roleID, permissionID) =>
      Permissions_per_role.findOne({
        where: { roleID: roleID, permissionID: permissionID }
      }).then(permissions_per_role => permissions_per_role),

      permissions_per_roleGetByRole: async (roleID) =>
      Permissions_per_role.findAll({
        where: { roleID: roleID }
      }).then(permissions_per_role => permissions_per_role),

      permissions_per_roleCreate: async (roleID, permissionID) =>
        Permissions_per_role.create({
          roleID: roleID,
          permissionID: permissionID
        })
        .then(permissions_per_role => permissions_per_role)
  };
};