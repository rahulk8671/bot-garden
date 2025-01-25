import { useState } from 'react'
import React from 'react'
import './App.css'
import Garden from './componenets/Garden'
import useCharacters from './hooks/useCharacters'

function App() {
	const numberOfSquares = 64 * 4 // squares of 4
	const maxColumns = Math.sqrt(numberOfSquares)

	const { charPositions, setCurrentFocusedChar } = useCharacters({ maxColumns })

	return (
		<Garden numberOfSquares={numberOfSquares} characters={charPositions} onCharFocus={setCurrentFocusedChar} />
	)
}

export default App
