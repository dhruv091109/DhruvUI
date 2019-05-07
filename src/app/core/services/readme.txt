About "Persistent services and app-wide singletons":

If you are using a service to store data while your Angular app is running you’ll need to use a service 

which is instantiated and not discarded throughout the duration of the application runtime.

A service in the AdminModule is only available until the user navigates out of the /admin path. 

Any other module (say FormModule that imports that service, will have a fresh version of that service 

as if it was instantiated with new MyService().

We get around this by putting services that need to be persistent in the CoreModule 

because our entire app runs through the CoreModule. 

From the minute the app is launched, to when the page is closed CoreModule is being used to run the application.

That means any services declared within app/core/services 

and then added to the list of providers in app/core/core.module.ts 

will be accessible to all other modules and contain persistent data.


Reference: https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
