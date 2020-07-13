
const withId = document.getElementById.bind(document)
const resultPanel = withId('result')
const errorPanel = withId('error')

const editor = ace.edit("editor", {
	mode: "ace/mode/javascript",
	theme: 'ace/theme/dracula',
	showPrintMargin: false,
	fontSize: '15px'
})

const resultEditor = ace.edit(resultPanel, {
	mode: "ace/mode/javascript",
	theme: 'ace/theme/dracula',
	fontSize: '15px',
	wrap: true,
	readOnly: true,
	highlightActiveLine: false,
	highlightSelectedWord: false,
	showGutter: false,
	highlightGutterLine: false,
	showPrintMargin: false,
})

function minifyCode() {
	try {
		const code = editor.getValue()
		const minified = Terser.minify(code)

		if (minified.error) {
			resultPanel.style.display = "none"
			errorPanel.style.display = "block"
			// if (minified.error.startsWith('SyntaxError: '))
			// 	minified.error = minified.error.substr('SyntaxError: '.length);
			errorPanel.innerText = minified.error
			resultEditor.setValue('')
		}
		else {
			resultPanel.style.display = "block"
			errorPanel.style.display = "none"
			errorPanel.innerText = ''
			resultEditor.setValue(minified.code)
			resultEditor.gotoLine(2)
		}
	}
	catch (message) {
		resultEditor.setValue('')
	}
}

minifyCode()
editor.on('change', minifyCode)
