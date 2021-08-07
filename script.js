const cells = document.querySelectorAll('.cell')
const board = Array(cells.length ** .5).fill('').map(el => new Array(cells.length ** .5).fill(''))
const number = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]

function getEmptyCells(cells) {
	const emptyCells = []
	for (let i = 0; i < cells.length; i++)
		if (!cells[i].innerHTML)
			emptyCells.push(i)
	return emptyCells
}

const config = {
	'': {
		styles: {
			innerHTML: '',
			color: '',
			fontSize: '0',
			backgroundColor: '#cdc1b4'
		}
	},
	2: {
		styles: {
			fontSize: '3.25em',
			color: "#776e65",
			backgroundColor: '#eee4da'
		}
	},
	4: {
		styles: {
			fontSize: '3.25em',
			color: "#776e65",
			backgroundColor: '#eee1c9'
		}
	},
	8: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#f3b27a'
		}
	},
	16: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#f69664'
		}
	},
	32: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#f77c5f'
		}
	},
	64: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#f75f3b'
		}
	},
	128: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#edd073'
		}
	},
	256: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#edcc61'
		}
	},
	512: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#edc850'
		}
	},
	1024: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#edc53f'
		}
	},
	2048: {
		styles: {
			fontSize: '3em',
			color: "#f9f6f2",
			backgroundColor: '#edc22e'
		}
	}
}

function getRandomNumber(min, max) {
	return Math.floor(min + Math.random() * max)
}

function getRandomEmptyCells(emptyCells) {
	return emptyCells[getRandomNumber(0, emptyCells.length)]
}


function generateNumber() {
	const emptyCells = getEmptyCells(cells)
	const randomNum = getRandomEmptyCells(emptyCells)
	const randomIntegerNumber = number[getRandomNumber(0, 2)]

	cells[randomNum].innerHTML = randomIntegerNumber
	board[Math.floor(randomNum / board.length)][randomNum % board.length] = randomIntegerNumber

	Object.keys(config[randomIntegerNumber].styles).forEach(currentStyle => {
		cells[randomNum].style[currentStyle] = config[randomIntegerNumber].styles[currentStyle]
	})
}

function start() {
	for (let i = 0; i < 2; i++) {
		generateNumber()
	}
}
start()

function makeNewRowRightOrDown(tmp) {
	let newRow = []
	for (let j = tmp.length - 1; j >= 0; j--) {
		if (tmp[j] !== '' && tmp[j - 1] !== '' && tmp[j] === tmp[j - 1]) {
			tmp[j] *= 2
			tmp[j - 1] = ''
			newRow.unshift(tmp[j])
		} else if (tmp[j] !== '') {
			newRow.unshift(tmp[j])
		}
	}
	return Array(tmp.length - newRow.length).fill('').concat(newRow)
}

function makeNewRowLeftOrUp(tmp) {
	let newRow = []
	for (let j = 0; j <= tmp.length - 1; j++) {
		if (tmp[j] !== '' && tmp[j + 1] !== '' && tmp[j] === tmp[j + 1]) {
			tmp[j] *= 2
			tmp[j + 1] = ''
			newRow.push(tmp[j])
		} else if (tmp[j] !== '') {
			newRow.push(tmp[j])
		}
	}
	return newRow.concat(Array(tmp.length - newRow.length).fill(''))
}

function leftClick() {
	for (let i = 0; i < board.length; i++) {
		let tmp = Array(board.length).fill('')
		let k = 0
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] !== '') {
				tmp[k] = board[i][j]
				k++
			}
		}
		board[i] = makeNewRowLeftOrUp(tmp)
	}
}

function upClick() {
	for (let i = 0; i < board.length; i++) {
		let tmp = Array(board.length).fill('')
		let k = 0
		for (let j = 0; j < board.length; j++) {
			if (board[j][i] !== '') {
				tmp[k] = board[j][i]
				k++
			}
		}
		tmp = makeNewRowLeftOrUp(tmp)
		for (let j = 0; j < board.length; j++) {
			board[j][i] = tmp[j]
		}
	}
}

function rightClick() {
	for (let i = 0; i < board.length; i++) {
		let tmp = Array(board.length).fill('')
		let k = board.length - 1
		for (let j = board.length  - 1; j >= 0; j--) {
			if (board[i][j] !== '') {
				tmp[k] = board[i][j]
				k--
			}
		}
		board[i] = makeNewRowRightOrDown(tmp)
	}
}

function downClick() {
	for (let i = 0; i < board.length; i++) {
		let tmp = Array(board.length).fill('')
		let k = board.length - 1
		for (let j = board.length  - 1; j >= 0; j--) {
			if (board[j][i] !== '') {
				tmp[k] = board[j][i]
				k--
			}
		}
		tmp = makeNewRowRightOrDown(tmp)
		for (let j = 0; j < board.length; j++) {
			board[j][i] = tmp[j]
		}
	}
}

function refresh() {
	let boardNumber = board.flat()
	for (let i = 0; i < boardNumber.length; i++) {
		const curNum = boardNumber[i]
		cells[i].innerHTML = curNum
		Object.keys(config[curNum].styles).forEach(currentStyle => {
			cells[i].style[currentStyle] = config[curNum].styles[currentStyle]
		})
	}
}

document.addEventListener('keydown', e => {
	const key = e.key
	if (key === 'ArrowUp') {
		upClick()
		refresh()
		generateNumber()
	} else if (key === 'ArrowDown') {
		downClick()
		refresh()
		generateNumber()
	} else if (key === 'ArrowLeft') {
		leftClick()
		refresh()
		generateNumber()
	} else if (key === 'ArrowRight') {
		rightClick()
		refresh()
		generateNumber()
	}
})