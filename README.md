
  ## Running the code

  Run `npm i` to install the dependencies.
  
  `npm install axios` 
  
  `npm install --save-dev @types/react @types/react-dom`

  ## Setting up communication with back-end
  
  Go into a terminal, run `ipconfig`, and find the line `Adresse IPv4. . . . . . . . . . . . . .: XX.XX.XX.XX`.

  In src/services/api.ts file, find this line : 
  
  `const API_URL = 'http://XX.XX.XX.XX:8081/api/v1`;
  
  Replace the IP address in that URL by the one found with the ipconfig command

  Run `npm run dev` to start the development server.
  
