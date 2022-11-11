// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('rowie.toOne', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const rows = document.getText();
			const line = []
			for (const row of rows.split('\n')) {
				const cleanrow = row.trim()
				if(cleanrow !== ''){
					line.push(`'${cleanrow}'`)
				}
			}
			const row = line.toString()
			editor.edit(editBuilder => {
				editBuilder.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(editor.document.lineCount-1, 1000)));
				editBuilder.insert(new vscode.Position(0, 0), row)
			});
		}

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
