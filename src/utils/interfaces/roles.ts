
export enum UserRole {
    /** System god (can manage website and server) */
    SuperUser = 1,
    /** Platform manager (can only manage website) */
    Admin = 2,
    /** Test manager (can only manage tests, environments and applications) */
    Editor = 3,
    /** Contributor (can only manage tests) */
    Contributor = 2,
    /** Viewer (can only view) */
    Viewer = 1
}