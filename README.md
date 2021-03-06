# pawn-community-tool

VS-Code extension for pawn language, code clean and better :)

developed and maintained by Indian Ocean Roleplay™

# Features

- Go To Definition
- Hover Definition
- Parameter Helper
- Syntax Highlighting
- Auto Code Completion
- Custom Inline Snippets
- Format Document
- Format Selection
- VSCode Regions
- Generate Numbers

# Define Custom Snippet Anywhere

you can define two types of snippet

\*note: second type support autocompletion of parameters.

```
//#snippet init_cmd cmd:myfunction(playerid, const params[]) {\n\treturn 1;\n}

//#function createcar(vehicleid, Float:posX, Float:posY, Float:posZ);
```

# Usage of .pawnignore

in big projects, you might have lot's of file but you don't want definitions from all files.
so just use .pawnignore to ignore a folder or file from workspace. The usage is very simple,
just right click on folder or file and click on `Add to .pawnignore` this works exactly like
`.gitignore`

# Installation

Just search for "Pawn Community Tool" in the vscode extensions and install it.

Alternatively, you can check out the source code or view the marketplace page:

- [Website](https://iorp.in)
- [Forum](https://forum.iorp.in)
- [Discord](https://discord.gg/Xq9k3hr)
- [GitHub Page](https://github.com/oceanroleplay/pawn-community-tool)
- [Marketplace Page](https://marketplace.visualstudio.com/items?itemName=IORP.pawn-community-tool)

# Creating `tasks.json`

press Ctrl+Shift+P or F1 and then type **>Initialize Pawn Build Task**

## Explanation

`"command": "${workspaceRoot}/pawno/pawncc.exe",` is the important bit here,
this is the path to your Pawn compiler and I've assumed most of you have a
left-over `pawno` folder from that long dead text editor! This folder not only
contains Pawno but also the Pawn code compiler (`pawncc.exe`). You can safely
delete `pawno.exe` forever.

`"args": [...],` is also important, this is where you define the arguments
passed to the compiler. Pawno also did this but you might not have known. The
defaults have always been `-;+` to force semicolon usage and `-(+` to force
brackets in statements.

If you store your Pawn compiler elsewhere, just replace the entire `command`
setting with the full path to your compiler.

Also, if you want to disable debug symbols (you won't be able to use
crashdetect) just remove `-d3` from `"args"`.

`problemMatcher` is the part that allows recognising the Pawn compiler output
and presenting it in the `problems` panel of the editor. This doesn't work well
with external includes because the paths change from relative to absolute.

## Define single gamemode file that always compile on build task

1. goto .vscode/tasks.json
2. replace `${relativeFile}` with `${workspaceRoot}\\gamemodes\\mygamemode.pwn`
3. all done

## Compiling Pawn Code

To actually compile after you've set up the `tasks.json` below, press
CTRL+Shift+B (Windows) or CMD+Shift+B (Mac), or alternatively open up the
command palette with CTRL+Shift+P (Windows) or CMD+Shift+P (Mac) and type
`Run Task`, hit enter and select `build-normal`.

## Important Note

sometime, you will get errors lke arguments are invalid. We have seen that problem with powershell only. so make sure, you have selected cmd (commmand prompt) to build your gamemode file.

# Thank you

we are open for suggestions, please open a issue and share your idea so that we can improve this extension.
