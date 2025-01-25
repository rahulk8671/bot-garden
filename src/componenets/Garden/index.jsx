import { useState } from 'react'
import React from 'react'
import grassBg from '../../assets/grass.jpg'

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const Garden = ({ characters = [], numberOfSquares, onCharFocus }) => {
    const [size, setSize] = useState(window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth)

    const finalizeGrid = () => {
        const squareSize = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
        setSize(squareSize)
    }

    React.useEffect(() => {
        window.addEventListener('resize', finalizeGrid)
        return () => window.removeEventListener('resize', finalizeGrid)
    }, [])

    const squareArea = size * size
    const n = numberOfSquares
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
                    {characters.map((char, index) => {
                        if (char.position[0] == row && char.position[1] == column) {
                            return (
                                <div
                                    onClick={() => onCharFocus(char.id)}
                                    key={index}
                                    style={{
                                        borderRadius: '100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'black'
                                    }}
                                ></div>
                            )
                        }
                        return null
                    })}
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
        <div
            style={{
                height: size + 'px',
                width: size + 'px',
                margin: 'auto',
                // background: 'white',
                minWidth: size + 'px',
                minHeight: size + 'px',
                backgroundImage: `url(${grassBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
    )
}

export default Garden