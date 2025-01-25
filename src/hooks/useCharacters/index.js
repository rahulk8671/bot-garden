import { useState } from 'react'
import React from 'react'

const chars = [
    {
        id: 'char1',
        position: [0,0],
    },
    {
        id: 'char2',
        position: [1,1],
    }
]

const useCharacters = ({ maxColumns }) => {
    const [currentFocusedChar, setCurrentFocusedChar] = useState(chars[0].id)
    const [charPositions, setCharPositions] = useState(chars)

    const move = (event) => {
        const key = event.key

        let charPosition = charPositions.find(item => item.id == currentFocusedChar).position

        const setCharPosition = (pos) => {
            setCharPositions((prev) => {
                return prev.map(item => {
                    if (item.id == currentFocusedChar) {
                        return {
                            ...item,
                            position: pos
                        }
                    }
                    return item
                })
            })
        }

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
    }, [charPositions, setCharPositions, currentFocusedChar])

    return {
        charPositions,
        setCurrentFocusedChar
    }

}

export default useCharacters