import { useState } from 'react'
import React from 'react'
import './App.css'

const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function App() {
	const [charPosition, setCharPosition] = useState([0, 1])
	console.log('char at position', charPosition)
	const [size, setSize] = useState(window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth)

	const finalizeGrid = () => {
		const squareSize = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
		setSize(squareSize)
	}

	React.useEffect(() => {
		window.addEventListener('resize', finalizeGrid)
		return () => window.removeEventListener('resize', finalizeGrid)
	}, [])

	const move = (event) => {
		const key = event.key

		let row = charPosition[0]
		let column = charPosition[1]

		switch (key) {
			case 'ArrowLeft':
				if (column > 0) {
					setCharPosition([row, column - 1])
				}
				break
			case 'ArrowRight':
				if (column + 1 < maxColumns) {
					setCharPosition([row, column + 1])
				}
				break
			case 'ArrowDown':
				if (row + 1 < maxColumns) {
					setCharPosition([row + 1, column])
				}
				break
			case 'ArrowUp':
				if (row > 0) {
					setCharPosition([row - 1, column])
				}
				break
			default:
				console.log('invalid move')
		}
	}

	React.useEffect(() => {
		window.addEventListener('keydown', move);

		return () => window.removeEventListener('keydown', move)
	}, [charPosition, setCharPosition])

	const squareArea = size * size
	const n = 64*4*4
	const squareSize = Math.sqrt(squareArea / n)
	let maxColumns = Math.sqrt(n)

	const render = () => {
		const squares = []
		let row = 0
		let column = 0
		for (let i = 0; i < n; i++) {
			squares.push(
				<div
					key={i}
					style={{
						height: squareSize + 'px',
						width: squareSize + 'px',
						// background: getRandomColor(),
					}}
				>
					{/* {row}, {column} */}
					{(charPosition[0] == row && charPosition[1] == column) && <div
						style={{ 
							borderRadius: '100%',
							width: '100%',
							height: '100%',
							background: 'black'
						}}
					></div>}

				</div>
			)

			if (i % maxColumns === maxColumns - 1) {
				row++
			}

			column++
			if (column == maxColumns) {
				column = 0
			}
		}
		return squares
	}

	return (
		<>
			<div
				style={{
					height: size + 'px',
					width: size + 'px',
					margin: 'auto',
					background: 'white',
					minWidth: size + 'px',
					minHeight: size + 'px',
				}}
			>
				<div
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
					}}
				>
					{render()}
				</div>
			</div>
		</>
	)
}

export default App
