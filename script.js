const cells = document.querySelectorAll('.cell')
const board = Array(cells.length ** .5).fill('').map(el => new Array(cells.length ** .5).fill(''))
const size = board.length
const number = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]

const getTouches = e => e.touches || e.originalEvent.touches

let xDown = null
let yDown = null

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
	board[Math.floor(randomNum / size)][randomNum % size] = randomIntegerNumber

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
		if (tmp[j] && tmp[j - 1] && tmp[j] === tmp[j - 1]) {
			tmp[j] *= 2
			tmp[j - 1] = ''
			newRow.unshift(tmp[j])
		} else if (tmp[j]) {
			newRow.unshift(tmp[j])
		}
	}
	newRow = Array(tmp.length - newRow.length).fill('').concat(newRow)
	return newRow
}

function makeNewRowLeftOrUp(tmp) {
	let newRow = []
	for (let j = 0; j <= tmp.length - 1; j++) {
		if (tmp[j] && tmp[j + 1] && tmp[j] === tmp[j + 1]) {
			tmp[j] *= 2
			tmp[j + 1] = ''
			newRow.push(tmp[j])
		} else if (tmp[j]) {
			newRow.push(tmp[j])
		}
	}
	newRow = newRow.concat(Array(tmp.length - newRow.length).fill(''))
	return newRow
}

function leftClick() {
	for (let i = 0; i < size; i++) {
		let tmp = Array(size).fill('')
		let k = 0
		for (let j = 0; j < size; j++) {
			if (board[i][j]) {
				tmp[k] = board[i][j]
				k++
			}
		}
		board[i] = makeNewRowLeftOrUp(tmp)
	}
}

function upClick() {
	for (let i = 0; i < size; i++) {
		let tmp = Array(size).fill('')
		let k = 0
		for (let j = 0; j < size; j++) {
			if (board[j][i]) {
				tmp[k] = board[j][i]
				k++
			}
		}
		tmp = makeNewRowLeftOrUp(tmp)
		for (let j = 0; j < size; j++) {
			board[j][i] = tmp[j]
		}
	}
}

function rightClick() {
	for (let i = 0; i < size; i++) {
		let tmp = Array(size).fill('')
		let k = size - 1
		for (let j = size  - 1; j >= 0; j--) {
			if (board[i][j]) {
				tmp[k] = board[i][j]
				k--
			}
		}
		board[i] = makeNewRowRightOrDown(tmp)
	}
}

function downClick() {
	for (let i = 0; i < size; i++) {
		let tmp = Array(size).fill('')
		let k = size - 1
		for (let j = size  - 1; j >= 0; j--) {
			if (board[j][i]) {
				tmp[k] = board[j][i]
				k--
			}
		}
		tmp = makeNewRowRightOrDown(tmp)
		for (let j = 0; j < size; j++) {
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

function isEnd() {
	for (let i = 0; i < size; i++)
		for (let j = 0; j < size; j++) {
			if (!board[i][j] ||
				j !== size - 1 && board[i][j] === board[i][j + 1] ||
				i !== size - 1 && board[i][j] === board[i + 1][j]
			)
				return false
		}
	return true
}

function reset() {
	for (let i = 0; i < size ** 2; i++) {
		cells[i].innerHTML = ''
		cells[i].style.backgroundColor = ''
	}
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			board[i][j] = ''
		}
	}
	start()
}

document.addEventListener('keydown', e => {
	if (isEnd()) {
		alert('game over')		
		reset()
		return
	}
	const key = e.key
	if (key === 'ArrowUp') 
		upClick()
	else if (key === 'ArrowDown')
		downClick()
	else if (key === 'ArrowLeft')
		leftClick()
	else if (key === 'ArrowRight')
		rightClick()
	if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
		refresh()
		generateNumber()
	}
})

document.addEventListener('touchstart', e => {
    const firstTouch = getTouches(e)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
}, false)

document.addEventListener('touchmove', e => {
	if (isEnd()) {
		alert('game over')		
		reset()
		return
	}

	if (!xDown || !yDown)
		return

	let xUp = e.touches[0].clientX
	let yUp = e.touches[0].clientY

	let xDiff = xDown - xUp;
	let yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff))
		if (xDiff > 0)
			leftClick() 
		else
			rightClick()
	else 
		if (yDiff > 0)
			upClick()
		else 
			downClick()

	refresh()
	generateNumber()

	xDown = null
	yDown = null
}, false)

