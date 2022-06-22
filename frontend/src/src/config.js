export let backendURL

switch (window.location.hostname) {
    case "localhost":
     backendURL="http://localhost:3000/api/v0.0/"
     break;
     
     case "127.0.0.1":
      backendURL="http://127.0.0.1:3000/"
      break;

      default:
      backendURL="/"
      break;
}