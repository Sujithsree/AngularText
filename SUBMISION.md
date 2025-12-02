## Short Write-Up

I built a simple client management tool using Angular v21 standalone components. 
The app allows users to create clients, store them in localStorage, and add notes for each client. I followed a modular structure with models, services, and
components to keep the code clean. I used Reactive Forms for validation and custom helper functions for tag inputs.
One challenge was syncing updates between pages since everything is stored in the browser; 
solving it taught me how to structure services better. Overall, this project helped me understand Angular form handling, routing, and state management.


## Required Bullet Points
• One bug you found

Tags were getting saved with extra spaces (e.g., " vip"). I fixed it by trimming each tag before storing.

• One performance improvement

Reduced localStorage calls by caching the client list in a service variable and writing to storage only when needed.

• One accessibility improvement

Added labels and ARIA attributes for form fields to improve screen-reader support.
