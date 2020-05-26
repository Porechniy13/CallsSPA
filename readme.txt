/* If this nonsense works, it was written by Alexandr Porechniy 
 * If not , I don't know who wrote it
*/

To work correctly, you need a database raised on the local server.
The connection to the database is made by creating a file ("data/config.js"),
where you need to specify the address of the DB server, login and password for access, and the name of the plug-in
DB.
After all this is done:
1) Open the first terminal window and write "npm start"
 This command starts the backend server that responds
 for connecting to the database and routing requests. (default port: 3000)
2) In another terminal (without closing the first one), write "npm run wp"
 With this command, we start the front-end server, namely the mail collector 
 for JSX (and the compiler, respectively). (default port: 9000)
3) If the back is configured and does not cause problems-go to the address
 "localhost:9000" and in the file " src/components/App.js " making a request 
 to the back server (soot. address "http://localhost:3000")
4) If the request is spelled correctly , the back server must
