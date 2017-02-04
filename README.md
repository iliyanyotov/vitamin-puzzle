Firstly, you need to have Node installed. Then you need to install project dependencies by running the build.cmd file.
After the project is build, you can make changes to the code and compile (transpile with babel) them by running the watch.cmd file.

Is a MUST to check the console, because there is a lot of debugging info. :)

Use the controls provided in the debug menu.

Available options:
N/ #description (#task name)
1/ You can create a simple line (simpleLine).
2/ Create a line and then transform all vitamins to white (makeAllWhite).
3/ Create a line and then change its state several times (changeState).
4/ Create a line and then change it by passing certain operations in an array as second param (loadOperations).
5/ Combination between all the tasks (combination).

The tasks from files will be running on Windows only, so if you are running MAC use the terminal in the main project dir to run the tasks as it follows:
Install modules - npm install
Build - grunt build
Watch - grunt watch

Thanks for the attention. Have a good one! :)