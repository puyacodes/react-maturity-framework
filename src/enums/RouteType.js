import Enum from "locustjs-enum";

const RouteType = Enum.define(
    {
        Public: 0, // public, anybody, member or not-member
        Private: 1, // only members with enough permission(s) like 'Browse' access.
        // permission is checked using accountService.hasAccess(path)
        // pay attention that, hasAccess() performs a corase-grained check
        // (i.e. checks only user has access to app & subsystem extracted from current path);
        // It does not perform a fine-grained check (i.e. form/entity permission).
        // Fine-grained permission check is performed manually.
        // To do that, developers should use appRolePermission.getMyFormPermissions()
        // or appRolePermission.getMyEntityPermissions().
        // There is also an automatic fine-grained permission checking
        // implemented in MenuManagerDefault. That is, developers can specify form/entity
        // permission on menu items upon defining menu for a subsystem.
        Protected: 2, // only members
        Hidden: 3, // nobody. route is disabled (perhaps temporarily for debugging)
    },
    "RouteType"
);

export default RouteType;
