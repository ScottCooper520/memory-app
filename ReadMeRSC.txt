To run:
cd to .../memory-app/server
type: node app.js
Open browser to localhost:5000

To run the debugger on a node js file that is not the top-level default:
	1. Open the debugger.
	2. Open the file to run (i.e. ./server/app.js) in the editor.
	3. In debugger, select Run Current File option.

6/9/2023 - Status
=================
This is all working at this point, including reading images from the Windows filesystem.

6/5/2023 - Memory App Prototype
===============================
This is the linux-based prototype for the memory app project. It contains:
- NodeJs backend
- ExpressJs CRUD ops
- Standard (no engine) front-end
  This will be replaced with VueJs
- MongoDB for NoSql database ('local cloud' storage)
  We will use RJs server for this local cloud storage
- Mongoose for schema support for MongoDB (i.e. Memory model)
- I am running Ubuntu 22.04.2 LTS (via Windows Subsystem for Linux - WSL)

These are the packages/libraries I installed (from project folder with linux terminal)
