/**
 * Enumeration definitions assocaited to each Angular custom modules.
 * Note: Each module associated to specified buginss logic.
 */
export enum Modules {
  /** Core module. All shared and build in components and services staying here. Don't modify it. */
  Core = 'core',
  /** Shared module. All shared directives, services staying here. Don't modify it.  */
  Shared = 'shared',
  /** Following definitions are able to be modified. */
  Admin = 'admin',
  EndUser = 'enduser',
  Demo = 'demo'
}
