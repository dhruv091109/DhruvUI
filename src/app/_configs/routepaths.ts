/**
 * Angular application routes associated paths definitions.
 * Central management the paths here.
 * It is applied in global.
 */
export class RoutePaths {
    public readonly login = 'login';
    public readonly register = 'register';
    public readonly demo1 = 'demo/demo1';
    public readonly demo2 = 'demo/demo2';
    public readonly home = '/';
}

/** Global const contains all angular single page application associated routes paths. */
export const APP_PATHS = new RoutePaths();
